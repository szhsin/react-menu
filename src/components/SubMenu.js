import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';
import './styles/index.scss';
import {
    bem, menuClass, subMenuClass, menuItemClass,
    ActiveIndexContext, keyCodes
} from '../utils';
import { MenuList } from './MenuList'


export const SubMenu = React.memo(({ label, index, children, onMouseEnter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const timeoutId = useRef();

    const closeMenu = useCallback((restoreFocus) => {
        setIsOpen(false);
        if (restoreFocus) itemRef.current.focus();
    }, []);

    const handleMouseEnter = e => {
        onMouseEnter(index, e);

        timeoutId.current = setTimeout(() => {
            setIsOpen(true);
        }, 300);
    }

    const handleMouseLeave = e => {
        clearTimeout(timeoutId.current);
    };

    const handleClick = e => {
        setIsOpen(o => !o);
        e.stopPropagation();
    }

    const handleKeyDown = e => {
        let handled = false;

        switch (e.keyCode) {
            case keyCodes.LEFT:
                if (isOpen) {
                    closeMenu(true);
                    handled = true;
                }
                break;

            case keyCodes.SPACE:
            case keyCodes.RETURN:
            case keyCodes.RIGHT:
                if (!isOpen) {
                    setIsOpen(true);
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

    useEffect(() => {
        if (isActive) {
            itemRef.current.focus();
        } else {
            closeMenu(false);
        }
    }, [isActive, closeMenu]);

    // console.log(`render Submenu: ${label}`)

    return (
        <li className={bem(menuClass, subMenuClass, ['open', isOpen])}
            role="presentation" ref={containerRef}
            onKeyDown={handleKeyDown}>

            <div className={bem(menuClass, menuItemClass, ['active', isActive])}
                role="menuitem" aria-haspopup="true" aria-expanded={isOpen}
                tabIndex={isActive && !isOpen ? 0 : -1}
                ref={itemRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}>
                {label}
            </div>

            <MenuList
                isOpen={isOpen}
                containerRef={containerRef}
                anchorRef={itemRef}
                direction="inline-end">
                {children}
            </MenuList>
        </li>
    );
});
