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
    menuArrowClass,
    SettingsContext,
    MenuListContext,
    initialHoverIndex,
    CloseReason,
    Keys,
    FocusPositions,
    HoverIndexActionTypes
} from '../utils';


export const MenuList = defineName(React.memo(function MenuList({
    ariaLabel,
    className,
    styles,
    arrowClassName,
    arrowStyles,
    anchorPoint,
    anchorRef,
    containerRef,
    arrow,
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
    onClose,
    ...restProps }) {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [arrowPosition, setArrowPosition] = useState({});
    const [isClosing, setClosing] = useState(false);
    const [expandedDirection, setExpandedDirection] = useState(direction);
    const { animation } = useContext(SettingsContext);
    const menuRef = useRef(null);
    const arrowRef = useRef(null);
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

        // For left and top, overflows are negative value.
        // For right and bottom, overflows are positive value.
        const getLeftOverflow = x => containerRect.left + x;
        const getRightOverflow = x => containerRect.left + x + menuRect.width - viewportWidth;
        const getTopOverflow = y => containerRect.top + y;
        const getBottomOverflow = y => containerRect.top + y + menuRect.height - viewportHeight;

        const confineHorizontally = x => {
            // If menu overflows to the left side, adjust x to have the menu contained within the viewport
            // and there is no need to check the right side;
            // if it doesn't overflow to the left, then check the right side
            let leftOverflow = getLeftOverflow(x);
            if (leftOverflow < 0) {
                x -= leftOverflow;
            } else {
                const rightOverflow = getRightOverflow(x);
                if (rightOverflow > 0) {
                    x -= rightOverflow;
                    // Check again to make sure menu doesn't overflow to the left 
                    // because it may go off screen and cannot be scroll into view.
                    leftOverflow = getLeftOverflow(x);
                    if (leftOverflow < 0) x -= leftOverflow;
                }
            }

            return x;
        }

        const confineVertically = y => {
            // Similar logic to confineHorizontally above
            let topOverflow = getTopOverflow(y);
            if (topOverflow < 0) {
                y -= topOverflow;
            } else {
                const bottomOverflow = getBottomOverflow(y);
                if (bottomOverflow > 0) {
                    y -= bottomOverflow;
                    // Check again to make sure menu doesn't overflow to the bottom
                    // because it may go off screen and cannot be scroll into view.
                    topOverflow = getTopOverflow(y);
                    if (topOverflow < 0) y -= topOverflow;
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
            confineHorizontally,
            confineVertically
        };
    }, [containerRef]);

    const placeArrowX = useCallback((menuX, {
        anchorRect,
        containerRect,
        menuRect
    }) => {
        if (!arrow) return;
        let x = anchorRect.left - containerRect.left - menuX + anchorRect.width / 2;
        const offset = arrowRef.current.offsetWidth * 1.25;
        x = Math.max(offset, x);
        x = Math.min(x, menuRect.width - offset);
        setArrowPosition({ x });
    }, [arrow]);

    const placeArrowY = useCallback((menuY, {
        anchorRect,
        containerRect,
        menuRect
    }) => {
        if (!arrow) return;
        let y = anchorRect.top - containerRect.top - menuY + anchorRect.height / 2;
        const offset = arrowRef.current.offsetHeight * 1.25;
        y = Math.max(offset, y);
        y = Math.min(y, menuRect.height - offset);
        setArrowPosition({ y });
    }, [arrow]);

    const placeLeftorRight = useCallback((direction, rects, {
        placeLeftorRightY,
        placeLeftX,
        placeRightX
    }, {
        getLeftOverflow,
        getRightOverflow,
        confineHorizontally,
        confineVertically
    }) => {
        let computedDirection = direction;
        let y = confineVertically(placeLeftorRightY);
        let x, leftOverflow, rightOverflow;

        if (computedDirection === 'left') {
            x = placeLeftX;

            // if menu overflows to the left, 
            // try to reposition it to the right of the anchor.
            leftOverflow = getLeftOverflow(x);
            if (leftOverflow < 0) {
                // if menu overflows to the right after repositioning,
                // choose a side which has less overflow
                rightOverflow = getRightOverflow(placeRightX);
                if (rightOverflow <= 0 || -leftOverflow > rightOverflow) {
                    x = placeRightX;
                    computedDirection = 'right';
                }
            }
        } else {
            // Opposite logic to the 'left' direction above
            x = placeRightX;
            rightOverflow = getRightOverflow(x);
            if (rightOverflow > 0) {
                leftOverflow = getLeftOverflow(placeLeftX);
                if (leftOverflow >= 0 || -leftOverflow < rightOverflow) {
                    x = placeLeftX;
                    computedDirection = 'left';
                }
            }
        }

        x = confineHorizontally(x);
        setPosition({ x, y });
        setExpandedDirection(computedDirection);
        placeArrowY(y, rects);
    }, [placeArrowY]);

    const placeToporBottom = useCallback((direction, rects, {
        placeToporBottomX,
        placeTopY,
        placeBottomY
    }, {
        getTopOverflow,
        getBottomOverflow,
        confineHorizontally,
        confineVertically
    }) => {
        // make sure invalid direction is treated as 'bottom'
        let computedDirection = direction === 'top' ? 'top' : 'bottom';
        let x = confineHorizontally(placeToporBottomX);
        let y, topOverflow, bottomOverflow;

        if (computedDirection === 'top') {
            y = placeTopY;

            // if menu overflows to the top, 
            // try to reposition it to the bottom of the anchor.
            topOverflow = getTopOverflow(y);
            if (topOverflow < 0) {
                // if menu overflows to the bottom after repositioning,
                // choose a side which has less overflow
                bottomOverflow = getBottomOverflow(placeBottomY);
                if (bottomOverflow <= 0 || -topOverflow > bottomOverflow) {
                    y = placeBottomY;
                    computedDirection = 'bottom';
                }
            }
        } else {
            // Opposite logic to the 'top' direction above
            y = placeBottomY;
            bottomOverflow = getBottomOverflow(y);
            if (bottomOverflow > 0) {
                topOverflow = getTopOverflow(placeTopY);
                if (topOverflow >= 0 || -topOverflow < bottomOverflow) {
                    y = placeTopY;
                    computedDirection = 'top';
                }
            }
        }

        y = confineVertically(y);
        setPosition({ x, y });
        setExpandedDirection(computedDirection);
        placeArrowX(x, rects);
    }, [placeArrowX]);

    // handle menu positioning
    const positionMenu = useCallback((anchorRef) => {
        const {
            menuRect,
            containerRect,
            ...helpers
        } = positionHelpers();

        let horizontalOffset = offsetX;
        let verticalOffset = offsetY;
        if (arrow) {
            if (direction === 'left' || direction === 'right') {
                horizontalOffset += arrowRef.current.offsetWidth;
            } else {
                verticalOffset += arrowRef.current.offsetHeight;
            }
        }

        const anchorRect = anchorRef.current.getBoundingClientRect();
        const placeLeftX = anchorRect.left - containerRect.left - menuRect.width - horizontalOffset;
        const placeRightX = anchorRect.right - containerRect.left + horizontalOffset;
        const placeTopY = anchorRect.top - containerRect.top - menuRect.height - verticalOffset;
        const placeBottomY = anchorRect.bottom - containerRect.top + verticalOffset;

        let placeToporBottomX, placeLeftorRightY;
        if (align === 'end') {
            placeToporBottomX = anchorRect.right - containerRect.left - menuRect.width;
            placeLeftorRightY = anchorRect.bottom - containerRect.top - menuRect.height;
        } else if (align === 'center') {
            placeToporBottomX = anchorRect.left - containerRect.left
                - (menuRect.width - anchorRect.width) / 2;
            placeLeftorRightY = anchorRect.top - containerRect.top
                - (menuRect.height - anchorRect.height) / 2;
        } else {
            placeToporBottomX = anchorRect.left - containerRect.left;
            placeLeftorRightY = anchorRect.top - containerRect.top;
        }
        placeToporBottomX += horizontalOffset;
        placeLeftorRightY += verticalOffset;

        const rects = { anchorRect, containerRect, menuRect };
        const placements = {
            placeLeftX,
            placeRightX,
            placeLeftorRightY,
            placeTopY,
            placeBottomY,
            placeToporBottomX
        };

        switch (direction) {
            case 'left':
            case 'right':
                placeLeftorRight(direction, rects, placements, helpers);
                break;

            case 'top':
            case 'bottom':
            default:
                placeToporBottom(direction, rects, placements, helpers);
                break;
        }
    }, [
        arrow, align, direction, offsetX, offsetY,
        positionHelpers, placeLeftorRight, placeToporBottom
    ]);

    // handle context menu positioning
    const positionContextMenu = useCallback((anchorPoint) => {
        const {
            menuRect,
            containerRect,
            getLeftOverflow,
            getRightOverflow,
            getTopOverflow,
            getBottomOverflow,
            confineHorizontally,
            confineVertically,
        } = positionHelpers();

        let x, y;

        // position the menu with cursor pointing to its top-left corner
        x = anchorPoint.x - containerRect.left;
        y = anchorPoint.y - containerRect.top;

        // If menu overflows to the right of viewport,
        // try to reposition it on the left side of cursor.
        // If menu overflows to the left of viewport after repositioning,
        // choose a side which has less overflow
        // and adjust x to have it contained within the viewport.
        const rightOverflow = getRightOverflow(x);
        if (rightOverflow > 0) {
            const adjustedX = x - menuRect.width;
            const leftOverflow = getLeftOverflow(adjustedX);
            if (leftOverflow >= 0 || -leftOverflow < rightOverflow) {
                x = adjustedX;
            }
            x = confineHorizontally(x);
        }

        // Similar logic to the left and right side above.
        let computedDirection = 'bottom';
        const bottomOverflow = getBottomOverflow(y);
        if (bottomOverflow > 0) {
            const adjustedY = y - menuRect.height;
            const topOverflow = getTopOverflow(adjustedY);
            if (topOverflow >= 0 || -topOverflow < bottomOverflow) {
                y = adjustedY;
                computedDirection = 'top';
            }
            y = confineVertically(y);
        }

        setPosition({ x, y });
        setExpandedDirection(computedDirection);
    }, [positionHelpers]);

    const handlePosition = useCallback(() => {
        if (anchorPoint) {
            positionContextMenu(anchorPoint);
        } else if (anchorRef) {
            positionMenu(anchorRef);
        }
    }, [anchorPoint, anchorRef, positionMenu, positionContextMenu]);

    useLayoutEffect(() => {
        if (isOpen) handlePosition();
    }, [isOpen, handlePosition]);

    useEffect(() => {
        if (!isOpen || !onClose) return;

        const handleResize = () => onClose({ reason: CloseReason.RESIZE });
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen, onClose]);

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

    // Modifier object are shared between this project and client code,
    // freeze them to prevent client code from accidentally altering them.
    const userModifiers = Object.freeze({ ...modifiers, dir: expandedDirection });
    const arrowModifiers = Object.freeze({ dir: expandedDirection });

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

                    {arrow &&
                        <div className={bem(menuClass, menuArrowClass,
                            arrowModifiers)(arrowClassName)}
                            style={{
                                ...flatStyles(arrowStyles, arrowModifiers),
                                left: arrowPosition.x && `${arrowPosition.x}px`,
                                top: arrowPosition.y && `${arrowPosition.y}px`,
                            }}
                            ref={arrowRef}
                            role="presentation" />
                    }

                    <MenuListContext.Provider value={context}>
                        {menuItems}
                    </MenuListContext.Provider>
                </ul>}
        </React.Fragment>
    );
}), 'MenuList');
