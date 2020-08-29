import React, { useState, useCallback, useRef, useContext, useEffect } from 'react';
import './styles/index.scss';
import {
    bem, menuClass, subMenuClass, menuItemClass,
    ActiveIndexContext, KeyEventContext, keyCodes
} from '../utils';
import { MenuList } from './MenuList'

export const SubMenu = React.memo(({ label, index, children, onMouseEnter, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const timeoutId = useRef();

    const closeMenu = useCallback((restoreFocus) => {
        setIsOpen(false);
        onClose(restoreFocus);
    }, [onClose]);

    const handleMouseEnter = e => {
        onMouseEnter(index, e);

        timeoutId.current = setTimeout(() => {
            setIsOpen(true);
        }, 300);
    }

    const handleMouseLeave = e => {
        clearTimeout(timeoutId.current);
    };

    const isActive = useContext(ActiveIndexContext) === index;
    const keyEvent = useContext(KeyEventContext);

    useEffect(() => {
        if (isActive
            && (keyEvent.keyCode === keyCodes.SPACE
                || keyEvent.keyCode === keyCodes.RETURN
                || keyEvent.keyCode === keyCodes.RIGHT)) {
            setIsOpen(true);
        } else if (!isActive) {
            closeMenu(true);
        }
    }, [keyEvent, isActive, closeMenu]);

    return (
        <li className={bem(menuClass, subMenuClass, ['open', isOpen])}
            role="presentation" ref={containerRef}>

            <div className={bem(menuClass, menuItemClass, ['active', isActive])}
                role="menuitem" aria-haspopup="true" aria-expanded={isOpen}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {label}
            </div>

            <MenuList
                isOpen={isOpen}
                containerRef={containerRef}
                anchorRef={containerRef}
                direction="inline-end"
                onClose={closeMenu}>
                {children}
            </MenuList>
        </li>
    );
});
