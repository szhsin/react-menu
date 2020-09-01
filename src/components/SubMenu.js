import React, { useRef, useContext, useEffect } from 'react';
import './styles/index.scss';
import {
    bem, menuClass, subMenuClass, menuItemClass,
    ActiveIndexContext, keyCodes, useMenuState
} from '../utils';
import { MenuList } from './MenuList'


export const SubMenu = React.memo(({ label, index, children, onMouseEnter }) => {

    const { isMounted, isOpen, openMenu, closeMenu, toggleMenu } = useMenuState();
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const timeoutId = useRef();

    const handleMouseEnter = e => {
        onMouseEnter(index, e);

        timeoutId.current = setTimeout(() => {
            openMenu();
        }, 300);
    }

    const handleMouseLeave = e => {
        clearTimeout(timeoutId.current);
    };

    const handleClick = e => {
        toggleMenu();
    }

    const handleKeyDown = e => {
        let handled = false;

        switch (e.keyCode) {
            case keyCodes.LEFT:
                if (isOpen) {
                    closeMenu();
                    itemRef.current.focus();
                    handled = true;
                }
                break;

            case keyCodes.SPACE:
            case keyCodes.RETURN:
            case keyCodes.RIGHT:
                if (!isOpen) {
                    openMenu();
                    handled = true;
                }
                break;
        }

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const isActive = useContext(ActiveIndexContext) === index;

    // console.log(`Submenu render: ${label}`)

    useEffect(() => {
        if (isActive) {
            itemRef.current.focus();
        } else {
            closeMenu();
        }
    }, [isActive, closeMenu]);

    return (
        <li className={bem(menuClass, subMenuClass, ['open', isOpen])}
            role="presentation" ref={containerRef}
            onKeyDown={handleKeyDown}>

            <div className={bem(menuClass, menuItemClass, ['active', isActive])}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={isOpen}
                tabIndex={isActive && !isOpen ? 0 : -1}
                ref={itemRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}>
                {label}
            </div>

            <MenuList
                isMounted={isMounted}
                isOpen={isOpen}
                containerRef={containerRef}
                anchorRef={itemRef}
                direction="inline-end">
                {children}
            </MenuList>
        </li>
    );
});
