import React, { useState, useLayoutEffect, useRef, useMemo, useCallback, useEffect } from 'react';
import {
    defineName, bem, menuClass,
    HoverIndexContext, initialHoverIndex, keyCodes
} from '../utils';


export const MenuList = defineName(React.memo(({
    isOpen,
    isMounted,
    isKeyboardEvent,
    containerRef,
    anchorRef,
    anchorPoint,
    children,
    direction }) => {

    // console.log(`MenuList render`);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hoverIndex, setHoverIndex] = useState(initialHoverIndex);
    const menuRef = useRef(null);
    const menuItemsCount = useRef(0);

    const handleMouseEnter = useCallback((index) => {
        setHoverIndex(index);
    }, []);

    const menuItems = useMemo(() => {
        if (!isMounted) return null;
        // console.log(`MenuList re-create children`);

        let index = 0;
        const permittedChildren = ['MenuDivider', 'MenuHeader', 'MenuItem',
            'MenuRadioGroup', 'SubMenu'];
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
                                index: index++,
                                onMouseEnter: handleMouseEnter
                            })
                    });

                return React.cloneElement(child, { children: radioItems });
            } else {
                return child.props.disabled ? child : React.cloneElement(child,
                    { index: index++, onMouseEnter: handleMouseEnter });
            }
        });

        // Store the count of menu items in a ref to avoid updating state during render
        menuItemsCount.current = index;
        return items;
    }, [isMounted, children, handleMouseEnter]);

    const handleKeyDown = e => {
        let handled = false;

        switch (e.keyCode) {
            case keyCodes.UP:
                setHoverIndex(i => {
                    i--;
                    if (i < 0) i = menuItemsCount.current - 1;
                    return i;
                });
                handled = true;
                break;

            case keyCodes.DOWN:
                setHoverIndex(i => {
                    i++;
                    if (i >= menuItemsCount.current) i = 0;
                    return i;
                });
                handled = true;
                break;

            // prevent browser from scrolling the page when SPACE or RETURN is pressed
            case keyCodes.SPACE:
            case keyCodes.RETURN:
                if (e.currentTarget.contains(e.target)) e.preventDefault();
                break;
        }

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const positionHelpers = useCallback(() => {
        const menuRect = menuRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const anchorRect = anchorRef && anchorRef.current.getBoundingClientRect();

        const viewportWidth = document.documentElement.clientWidth;
        const viewportHeight = document.documentElement.clientHeight;

        const getLeftOverflow = x => containerRect.left + x;
        const getRightOverflow = x => containerRect.left + x + menuRect.width - viewportWidth;
        const getTopOverflow = y => containerRect.top + y;
        const getBottomOverflow = y => containerRect.top + y + menuRect.height - viewportHeight;

        const scrollIntoView = y => {
            const bottomOverflow = getBottomOverflow(y);
            if (bottomOverflow > 0) {
                window.scrollBy({ left: 0, top: bottomOverflow, behavior: 'smooth' });
            }
        }

        const confineHorizontally = x => {
            // First check whether menu overflows to the right side,
            // then check the left side,
            // and adjust x to have the menu contained within the viewport.
            const rightOverflow = getRightOverflow(x);
            if (rightOverflow > 0) {
                x -= rightOverflow;
            } else {
                const leftOverflow = getLeftOverflow(x);
                if (leftOverflow < 0) {
                    x -= leftOverflow;
                }
            }

            return x;
        }

        return {
            menuRect,
            containerRect,
            anchorRect,
            viewportWidth,
            viewportHeight,
            getLeftOverflow,
            getRightOverflow,
            getTopOverflow,
            getBottomOverflow,
            scrollIntoView,
            confineHorizontally
        };
    }, [containerRef, anchorRef]);

    // handle menu positioning
    useLayoutEffect(() => {
        if (!isOpen || anchorPoint) return;

        const {
            menuRect,
            containerRect,
            anchorRect,
            getLeftOverflow,
            getRightOverflow,
            getTopOverflow,
            scrollIntoView,
            confineHorizontally
        } = positionHelpers();

        const placeLeftX = anchorRect.left - containerRect.left - menuRect.width - 1;
        const placeRightX = anchorRect.right - containerRect.left + 1;
        const placeLeftorRightY = anchorRect.top - containerRect.top;

        const placeTopY = anchorRect.top - containerRect.top - menuRect.height - 1;
        const placeBottomY = anchorRect.bottom - containerRect.top + 1;
        const placeToporBottomX = anchorRect.left - containerRect.left;

        let newPosition, x, y;
        switch (direction) {
            case 'left': {
                x = placeLeftX;
                y = placeLeftorRightY;

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
                            adjustedX -= rightOverflow;
                            x = adjustedX;
                        } else {
                            x -= leftOverflow;
                        }
                    } else {
                        x = adjustedX;
                    }
                }

                newPosition = { x, y };
                scrollIntoView(y);
            }
                break;

            case 'right': {
                x = placeRightX;
                y = placeLeftorRightY;

                const rightOverflow = getRightOverflow(x);
                if (rightOverflow > 0) {
                    // if menu overflows to the right side, 
                    // try to reposition it to the left of the anchor.
                    let adjustedX = placeLeftX;

                    // if menu overflows to the left side after repositioning,
                    // choose a side which has less overflow,
                    // and adjust x to have the menu contained within the viewport.
                    const leftOverflow = getLeftOverflow(adjustedX);
                    if (leftOverflow < 0) {
                        if (-leftOverflow < rightOverflow) {
                            adjustedX -= leftOverflow;
                            x = adjustedX;
                        } else {
                            x -= rightOverflow;
                        }
                    } else {
                        x = adjustedX;
                    }
                }

                newPosition = { x, y };
                scrollIntoView(y);
            }
                break;

            case 'top': {
                x = placeToporBottomX;
                y = placeTopY;

                x = confineHorizontally(x);
                const topOverflow = getTopOverflow(y);
                if (topOverflow < 0) {
                    y -= topOverflow;
                }

                newPosition = { x, y };
            }
                break;

            case 'bottom':
            default: {
                x = placeToporBottomX;
                y = placeBottomY;

                x = confineHorizontally(x);
                newPosition = { x, y };
                scrollIntoView(y);
            }
                break;
        }

        setPosition(newPosition);
    }, [isOpen, anchorPoint, positionHelpers, direction]);

    // handle context menu positioning
    useLayoutEffect(() => {
        if (!isOpen || !anchorPoint) return;

        const {
            menuRect,
            containerRect,
            getLeftOverflow,
            getRightOverflow,
            getTopOverflow,
            getBottomOverflow
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
                x -= rightOverflow;
            } else {
                x = adjustedX;
            }
        }

        // Similar logic as the left and right side above.
        const bottomOverflow = getBottomOverflow(y);
        if (bottomOverflow > 0) {
            const adjustedY = y - menuRect.height;
            const topOverflow = getTopOverflow(adjustedY);
            if (topOverflow < 0) {
                y -= bottomOverflow;
            } else {
                y = adjustedY;
            }
        }

        setPosition({ x, y });
    }, [isOpen, anchorPoint, positionHelpers]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                menuRef.current.focus()
                if (isKeyboardEvent) setHoverIndex(0);
            }, 10);
        } else {
            setHoverIndex(initialHoverIndex);
        }
    }, [isOpen, isKeyboardEvent]);

    return (
        <React.Fragment>
            {isMounted &&
                <ul className={bem(menuClass, null, ['open', isOpen])}
                    role="menu" tabIndex="-1" ref={menuRef}
                    onKeyDown={handleKeyDown}
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y}px`
                    }}>
                    <HoverIndexContext.Provider value={hoverIndex}>
                        {menuItems}
                    </HoverIndexContext.Provider>
                </ul>}
        </React.Fragment>
    );
}), 'MenuList');
