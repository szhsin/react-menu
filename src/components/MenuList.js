import React, { useState, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
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

    useLayoutEffect(() => {
        if (isOpen) {
            menuRef.current.focus();
            const containerRect = containerRef.current.getBoundingClientRect();
            const anchorRect = anchorRef.current.getBoundingClientRect();

            let newPosition;
            switch (direction) {
                case 'inline-end':
                    newPosition = {
                        x: anchorRect.right - containerRect.left + 1,
                        y: anchorRect.top - containerRect.top
                    };
                    break;

                case 'block-end':
                default:
                    newPosition = {
                        x: anchorRect.left - containerRect.left,
                        y: anchorRect.bottom - containerRect.top
                    };
            }
            setPosition(newPosition);
            if (isKeyboardEvent) setHoverIndex(0);
        } else {
            setHoverIndex(initialHoverIndex);
        }
    }, [isOpen, isKeyboardEvent, containerRef, anchorRef, direction]);

    return (
        <React.Fragment>
            {isMounted &&
                <ul className={bem(menuClass, null, ['open', isOpen])}
                    role="menu" tabIndex="-1" ref={menuRef}
                    onKeyDown={handleKeyDown}
                    style={{
                        left: position.x,
                        top: position.y
                    }}>
                    <HoverIndexContext.Provider value={hoverIndex}>
                        {menuItems}
                    </HoverIndexContext.Provider>
                </ul>}
        </React.Fragment>
    );
}), 'MenuList');
