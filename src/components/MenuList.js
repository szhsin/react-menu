import React, { useState, useLayoutEffect, useRef, useMemo, useCallback } from 'react';
import './styles/index.scss';
import { defineName, bem, menuClass, ActiveIndexContext, keyCodes } from '../utils';


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
    const [activeIndex, setActiveIndex] = useState(-1);
    const menuRef = useRef(null);
    const menuItemsCount = useRef(0);

    const handleMouseEnter = useCallback((index) => {
        setActiveIndex(index);
    }, []);

    const menuItems = useMemo(() => {
        if (!isMounted) return null;
        // console.log(`MenuList re-create children`);

        let index = 0;
        const permittedChildren = ['MenuDivider', 'MenuItem', 'MenuRadioGroup', 'SubMenu'];
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

            if (child.type.__name__ === 'MenuRadioGroup') {
                const permittedChildren = ['MenuDivider', 'MenuItem'];
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
                if (child.type.__name__ === 'MenuDivider') {
                    return child;
                }

                if (child.props.type === 'radio') {
                    throw new Error('Radio menu items should be wrapped in a MenuRadioGroup component.');
                }

                return child.props.disabled ? child : React.cloneElement(child,
                    { index: index++, onMouseEnter: handleMouseEnter });
            }
        });
        menuItemsCount.current = index;
        return items;
    }, [isMounted, children, handleMouseEnter]);

    const handleKeyDown = e => {
        let handled = false;

        switch (e.keyCode) {
            case keyCodes.UP:
                setActiveIndex(i => {
                    i--;
                    if (i < 0) i = menuItemsCount.current - 1;
                    return i;
                });
                handled = true;
                break;

            case keyCodes.DOWN:
                setActiveIndex(i => {
                    i++;
                    if (i >= menuItemsCount.current) i = 0;
                    return i;
                });
                handled = true;
                break;

            // prevent browser from scrolling the page when pressing SPACE or RETURN
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
                        x: anchorRect.right - containerRect.left,
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
            if (isKeyboardEvent) setActiveIndex(0);
        } else {
            setActiveIndex(-1);
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
                    <ActiveIndexContext.Provider value={activeIndex}>
                        {menuItems}
                    </ActiveIndexContext.Provider>
                </ul>}
        </React.Fragment>
    );
}), 'MenuList');
