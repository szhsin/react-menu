import React, {
    useState,
    useReducer,
    useEffect,
    useLayoutEffect,
    useRef,
    useMemo,
    useCallback,
    useContext
} from 'react';
import {
    defineName,
    safeCall,
    bem,
    flatStyles,
    menuClass,
    SettingsContext,
    MenuListContext,
    initialHoverIndex,
    Keys,
    FocusPositions,
    HoverIndexActionTypes
} from '../utils';


export const MenuList = defineName(React.memo(function MenuList({
    ariaLabel,
    className,
    styles,
    anchorPoint,
    anchorRef,
    containerRef,
    align,
    direction,
    isOpen,
    isMounted,
    isDisabled,
    menuItemFocus,
    offsetX,
    offsetY,
    children,
    onKeyDown,
    onAnimationEnd,
    ...restProps }) {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isClosing, setClosing] = useState(false);
    const [expandedDirection, setExpandedDirection] = useState(direction);
    const { animation } = useContext(SettingsContext);
    const menuRef = useRef(null);
    const menuItemsCount = useRef(0);
    const prevOpen = useRef(isOpen);
    const [hoverIndex, hoverIndexDispatch] = useReducer(hoverIndexReducer, initialHoverIndex);

    function hoverIndexReducer(state, { type, index }) {
        switch (type) {
            case HoverIndexActionTypes.RESET:
                return initialHoverIndex;

            case HoverIndexActionTypes.SET:
                return index;

            case HoverIndexActionTypes.UNSET:
                return state === index ? initialHoverIndex : state;

            case HoverIndexActionTypes.DECREASE: {
                let i = state;
                i--;
                if (i < 0) i = menuItemsCount.current - 1;
                return i;
            }

            case HoverIndexActionTypes.INCREASE: {
                let i = state;
                i++;
                if (i >= menuItemsCount.current) i = 0;
                return i;
            }

            case HoverIndexActionTypes.FIRST:
                return menuItemsCount.current > 0 ? 0 : initialHoverIndex;

            case HoverIndexActionTypes.LAST:
                return menuItemsCount.current > 0
                    ? menuItemsCount.current - 1 : initialHoverIndex;

            default:
                throw new Error('hoverIndexReducer: unknown action type');
        }
    }

    const menuItems = useMemo(() => {
        if (!isMounted) return null;

        let index = 0;
        const permittedChildren = ['MenuDivider', 'MenuHeader', 'MenuItem',
            'FocusableItem', 'MenuRadioGroup', 'SubMenu'];
        const validateChildren = (parent, child, permitted) => {
            if (!permitted.includes(child.type && child.type.__name__)) {
                console.warn(`${child.type || child} is ignored.\n`,
                    `The permitted children inside a ${parent} are ${permitted.join(', ')}.`);
                return false;
            }

            return true;
        }

        const items = React.Children.map(children, (child) => {
            if (!validateChildren('Menu or SubMenu', child, permittedChildren)) return null;

            if (child.type.__name__ === 'MenuDivider'
                || child.type.__name__ === 'MenuHeader') {
                return child;
            } else if (child.type.__name__ === 'MenuRadioGroup') {
                const permittedChildren = ['MenuItem'];
                const props = { type: 'radio' };

                const radioItems = React.Children.map(child.props.children,
                    (radioChild) => {
                        if (!validateChildren('MenuRadioGroup', radioChild, permittedChildren)) return null;

                        return radioChild.props.disabled
                            ? React.cloneElement(radioChild, props)
                            : React.cloneElement(radioChild, {
                                ...props,
                                index: index++
                            })
                    });

                return React.cloneElement(child, { children: radioItems });
            } else {
                return child.props.disabled
                    ? child
                    : React.cloneElement(child, { index: index++ });
            }
        });

        // Store the count of menu items in a ref rather than a local state
        // to avoid updating state during render
        menuItemsCount.current = index;
        return items;
    }, [isMounted, children]);

    const handleKeyDown = e => {
        let handled = false;

        switch (e.key) {
            case Keys.HOME:
                hoverIndexDispatch({ type: HoverIndexActionTypes.FIRST });
                handled = true;
                break;

            case Keys.END:
                hoverIndexDispatch({ type: HoverIndexActionTypes.LAST });
                handled = true;
                break;

            case Keys.UP:
                hoverIndexDispatch({ type: HoverIndexActionTypes.DECREASE });
                handled = true;
                break;

            case Keys.DOWN:
                hoverIndexDispatch({ type: HoverIndexActionTypes.INCREASE });
                handled = true;
                break;

            // prevent browser from scrolling the page when SPACE is pressed
            case Keys.SPACE:
                // Don't preventDefault on children of FocusableItem 
                if (e.target && e.target.className.includes(menuClass)) {
                    e.preventDefault();
                }
                break;
        }

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }

        // Invoke client code defined event handle when it's used as ControlledMenu
        safeCall(onKeyDown, e);
    }

    const handleAnimationEnd = e => {
        // Check before changing state to avoid triggering unnecessary re-render
        if (isClosing) setClosing(false);

        // Invoke client code defined event handle when it's used as ControlledMenu
        safeCall(onAnimationEnd, e);
    }

    const positionHelpers = useCallback(() => {
        const menuRect = menuRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;

        const getLeftOverflow = x => containerRect.left + x;
        const getRightOverflow = x => containerRect.left + x + menuRect.width - viewportWidth;
        const getTopOverflow = y => containerRect.top + y;
        const getBottomOverflow = y => containerRect.top + y + menuRect.height - viewportHeight;

        // Don't let menu overflow to the left because it may go off screen
        // and cannot be scroll into view.
        const safeMoveLeft = (x, rightOverflow) => {
            let adjustedX = x - rightOverflow;
            const leftOverflow = getLeftOverflow(adjustedX);
            if (leftOverflow < 0) adjustedX -= leftOverflow;
            return adjustedX;
        }

        // Don't let menu overflow to the top because it may go off screen
        // and cannot be scroll into view.
        const safeMoveUp = (y, bottomOverflow) => {
            let adjustedY = y - bottomOverflow;
            const topOverflow = getTopOverflow(adjustedY);
            if (topOverflow < 0) adjustedY -= topOverflow;
            return adjustedY;
        }

        const confineHorizontally = x => {
            // If menu overflows to the right side, adjust x to have the menu contained within the viewport
            // and there is no need to check the left side;
            // if it doesn't overflow right, then check the left side,
            // and adjust x to have the menu contained within the viewport.
            const rightOverflow = getRightOverflow(x);
            if (rightOverflow > 0) {
                x = safeMoveLeft(x, rightOverflow);
            } else {
                const leftOverflow = getLeftOverflow(x);
                if (leftOverflow < 0) {
                    x -= leftOverflow;
                }
            }

            return x;
        }

        const confineVertically = y => {
            // Similar logic to confineHorizontally above
            const bottomOverflow = getBottomOverflow(y);
            if (bottomOverflow > 0) {
                y = safeMoveUp(y, bottomOverflow);
            } else {
                const topOverflow = getTopOverflow(y);
                if (topOverflow < 0) {
                    y -= topOverflow;
                }
            }

            return y;
        }

        return {
            menuRect,
            containerRect,
            viewportWidth,
            viewportHeight,
            getLeftOverflow,
            getRightOverflow,
            getTopOverflow,
            getBottomOverflow,
            safeMoveLeft,
            safeMoveUp,
            confineHorizontally,
            confineVertically
        };
    }, [containerRef]);

    // handle menu positioning
    useLayoutEffect(() => {
        if (!isOpen || anchorPoint || !anchorRef) return;

        const {
            menuRect,
            containerRect,
            getLeftOverflow,
            getRightOverflow,
            getTopOverflow,
            getBottomOverflow,
            safeMoveLeft,
            safeMoveUp,
            confineHorizontally,
            confineVertically
        } = positionHelpers();

        const anchorRect = anchorRef.current.getBoundingClientRect();
        const placeLeftX = anchorRect.left - containerRect.left - menuRect.width - offsetX;
        const placeRightX = anchorRect.right - containerRect.left + offsetX;
        const placeLeftorRightY = anchorRect.top - containerRect.top + offsetY;

        const placeTopY = anchorRect.top - containerRect.top - menuRect.height - offsetY;
        const placeBottomY = anchorRect.bottom - containerRect.top + offsetY;
        let placeToporBottomX;
        if (align === 'end') {
            placeToporBottomX = anchorRect.right - containerRect.left - menuRect.width;
        } else if (align === 'center') {
            placeToporBottomX = anchorRect.left - containerRect.left
                - (menuRect.width - anchorRect.width) / 2;
        } else {
            placeToporBottomX = anchorRect.left - containerRect.left;
        }
        placeToporBottomX += offsetX;

        let newPosition, x, y;
        let computedDirection = direction;
        switch (direction) {
            case 'left': {
                x = placeLeftX;
                y = placeLeftorRightY;
                y = confineVertically(y);

                const leftOverflow = getLeftOverflow(x);
                if (leftOverflow < 0) {
                    // if menu overflows to the left side, 
                    // try to reposition it to the right of the anchor.
                    let adjustedX = placeRightX;

                    // if menu overflows to the right side after repositioning,
                    // choose a side which has less overflow,
                    // and adjust x to have the menu contained within the viewport.
                    const rightOverflow = getRightOverflow(adjustedX);
                    if (rightOverflow > 0) {
                        if (-leftOverflow > rightOverflow) {
                            x = safeMoveLeft(adjustedX, rightOverflow);
                            computedDirection = 'right';
                        } else {
                            x -= leftOverflow;
                        }
                    } else {
                        x = adjustedX;
                        computedDirection = 'right';
                    }
                }

                newPosition = { x, y };
            }
                break;

            case 'right': {
                x = placeRightX;
                y = placeLeftorRightY;
                y = confineVertically(y);

                // Opposite logic to the 'left' direction above
                const rightOverflow = getRightOverflow(x);
                if (rightOverflow > 0) {
                    let adjustedX = placeLeftX;

                    const leftOverflow = getLeftOverflow(adjustedX);
                    if (leftOverflow < 0) {
                        if (-leftOverflow < rightOverflow) {
                            adjustedX -= leftOverflow;
                            x = adjustedX;
                            computedDirection = 'left';
                        } else {
                            x = safeMoveLeft(x, rightOverflow);
                        }
                    } else {
                        x = adjustedX;
                        computedDirection = 'left';
                    }
                }

                newPosition = { x, y };
            }
                break;

            case 'top': {
                x = placeToporBottomX;
                y = placeTopY;
                x = confineHorizontally(x);

                const topOverflow = getTopOverflow(y);
                if (topOverflow < 0) {
                    // if menu overflows to the top, 
                    // try to reposition it to the bottom of the anchor.
                    let adjustedY = placeBottomY;

                    // if menu overflows to the bottom after repositioning,
                    // choose a side which has less overflow,
                    // and adjust y to have the menu contained within the viewport.
                    const bottomOverflow = getBottomOverflow(adjustedY);
                    if (bottomOverflow > 0) {
                        if (-topOverflow > bottomOverflow) {
                            y = safeMoveUp(adjustedY, bottomOverflow);
                            computedDirection = 'bottom';
                        } else {
                            y -= topOverflow;
                        }
                    } else {
                        y = adjustedY;
                        computedDirection = 'bottom';
                    }
                }

                newPosition = { x, y };
            }
                break;

            case 'bottom':
            default: {
                computedDirection = 'bottom';
                x = placeToporBottomX;
                y = placeBottomY;
                x = confineHorizontally(x);

                // Opposite logic to the 'top' direction above
                const bottomOverflow = getBottomOverflow(y);
                if (bottomOverflow > 0) {
                    let adjustedY = placeTopY;

                    const topOverflow = getTopOverflow(adjustedY);
                    if (topOverflow < 0) {
                        if (-topOverflow < bottomOverflow) {
                            adjustedY -= topOverflow;
                            y = adjustedY;
                            computedDirection = 'top';
                        } else {
                            y = safeMoveUp(y, bottomOverflow);
                        }
                    } else {
                        y = adjustedY;
                        computedDirection = 'top';
                    }
                }

                newPosition = { x, y };
            }
                break;
        }

        setPosition(newPosition);
        setExpandedDirection(computedDirection);
    }, [isOpen, anchorPoint, anchorRef, positionHelpers, align, direction]);

    // handle context menu positioning
    useLayoutEffect(() => {
        if (!isOpen || !anchorPoint) return;

        const {
            menuRect,
            containerRect,
            getLeftOverflow,
            getRightOverflow,
            getTopOverflow,
            getBottomOverflow,
            safeMoveLeft,
            safeMoveUp
        } = positionHelpers();

        let x, y;

        // position the menu with cursor pointing to its top-left corner
        x = anchorPoint.x - containerRect.left;
        y = anchorPoint.y - containerRect.top;

        // If menu overflows to the right of viewport,
        // try to reposition it on the left side of cursor.
        // If menu overflows to the left of viewport after repositioning,
        // still position menu on the right side of cursor 
        // and adjust x to have it contained within the viewport.
        const rightOverflow = getRightOverflow(x);
        if (rightOverflow > 0) {
            const adjustedX = x - menuRect.width;
            const leftOverflow = getLeftOverflow(adjustedX);
            if (leftOverflow < 0) {
                x = safeMoveLeft(x, rightOverflow);
            } else {
                x = adjustedX;
            }
        }

        let computedDirection = 'bottom';
        // Similar logic to the left and right side above.
        const bottomOverflow = getBottomOverflow(y);
        if (bottomOverflow > 0) {
            computedDirection = 'top';

            const adjustedY = y - menuRect.height;
            const topOverflow = getTopOverflow(adjustedY);
            if (topOverflow < 0) {
                y = safeMoveUp(y, bottomOverflow);
            } else {
                y = adjustedY;
            }
        }

        setPosition({ x, y });
        setExpandedDirection(computedDirection);
    }, [isOpen, anchorPoint, positionHelpers]);

    useLayoutEffect(() => {
        if (animation && isMounted) {
            if (isOpen) {
                setClosing(false)
            } else if (isOpen !== prevOpen.current) { // Skip the first effect run in which isOpen is false
                setClosing(true);
            }
        }

        prevOpen.current = isOpen;
    }, [animation, isMounted, isOpen]);

    const focusPosition = useRef(null);
    useEffect(() => {
        focusPosition.current = menuItemFocus.position;
    }, [menuItemFocus]);

    const isResetIndex = hoverIndex === initialHoverIndex;
    useEffect(() => {
        if (!isOpen) hoverIndexDispatch({ type: HoverIndexActionTypes.RESET });

        // Use a timeout here because if set focus immediately, page might scroll unexpectedly.
        const id = setTimeout(() => {
            // We are seeing the old isOpen and isResetIndex value when closure was created
            // However it should not be a issue since the timeout is cleared whenever states change
            // Don't set focus when menu is closed, otherwise focus will be lost
            // and onBlur event will be fired with relatedTarget setting as null.
            // If focus has already been set to a children element, don't set focus on the menu;
            // this happens in some edge cases because of the timeout delay.

            if (isOpen && isResetIndex) {
                menuRef.current.focus();

                if (focusPosition.current === FocusPositions.FIRST) {
                    hoverIndexDispatch({ type: HoverIndexActionTypes.FIRST });
                } else if (focusPosition.current === FocusPositions.LAST) {
                    hoverIndexDispatch({ type: HoverIndexActionTypes.LAST });
                }
            }
            focusPosition.current = null;
        }, 100);

        return () => clearTimeout(id);
    }, [isOpen, isResetIndex, menuItemFocus]);

    const context = useMemo(() => ({
        isParentOpen: isOpen,
        hoverIndex,
        hoverIndexDispatch
    }), [isOpen, hoverIndex]);

    const modifiers = {
        open: isOpen,
        closing: isClosing,
        animation,
        dir: animation && expandedDirection
    };

    const userModifiers = Object.freeze({ ...modifiers, dir: expandedDirection });

    return (
        <React.Fragment>
            {isMounted &&
                <ul {...restProps} // Only for passing through client code defined event handlers from ControlledMenu
                    className={bem(menuClass, null, modifiers)(className, userModifiers)}
                    role="menu"
                    tabIndex="-1"
                    aria-disabled={isDisabled}
                    aria-label={ariaLabel}
                    ref={menuRef}
                    onKeyDown={handleKeyDown}
                    onAnimationEnd={handleAnimationEnd}
                    style={{
                        ...flatStyles(styles, userModifiers),
                        left: `${position.x}px`,
                        top: `${position.y}px`
                    }}>
                    <MenuListContext.Provider value={context}>
                        {menuItems}
                    </MenuListContext.Provider>
                </ul>}
        </React.Fragment>
    );
}), 'MenuList');
