import React, { useState, useLayoutEffect, useRef, useMemo } from 'react';
import './styles/index.scss';
import { bem, menuClass, ActiveContext } from '../utils';


export const MenuList = React.memo(({ isOpen, containerRef, anchorRef, children,
    direction, onBlur, onMouseLeave }) => {

    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [active, setActive] = useState(0);
    const menuRef = useRef(null);

    const handleMouseEnter = (index) => {
        setActive(index);
    }

    const menuItems = useMemo(() => {
        console.log(`MenuList re-create children ${isOpen}`);
        return isOpen && React.Children.map(children, (child, index) =>
            React.cloneElement(child, { index, onMouseEnter: handleMouseEnter })
        )
    }, [children, isOpen]);

    function handleKeyDown(e) {
        const childrenCount = React.Children.count(children);
        switch (e.key) {
            case 'ArrowUp':
                setActive(a => Math.max(0, a - 1));
                break;
            case 'ArrowDown':
                setActive(a => Math.min(childrenCount - 1, a + 1));
                break;
        }

        e.preventDefault();
        e.stopPropagation();
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
        }
    }, [isOpen, containerRef, anchorRef, direction]);

    return (
        <React.Fragment>
            {isOpen && <ul className={bem(menuClass)} role="menu" tabIndex="-1" ref={menuRef}
                onBlur={onBlur}
                onMouseLeave={onMouseLeave}
                onKeyDown={handleKeyDown}
                style={{
                    left: position.x,
                    top: position.y
                }}>
                <ActiveContext.Provider value={active}>
                    {menuItems}
                </ActiveContext.Provider>
            </ul>}
        </React.Fragment>
    );
});
