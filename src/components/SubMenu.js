import React, { useState, useCallback, useRef, useContext, useLayoutEffect } from 'react';
import './styles/index.scss';
import { bem, menuClass, subMenuClass, menuItemClass, ActiveIndexContext } from '../utils';
import { MenuList } from './MenuList'

export const SubMenu = React.memo(({ label, index, children, onMouseEnter }) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);
    const timeoutId = useRef();

    const closeMenu = () => {
        setIsOpen(false);
        containerRef.current.focus();
    }

    const handleMouseEnter = e => {
        onMouseEnter(index, e);
        
        timeoutId.current = setTimeout(() => {
            setIsOpen(true);
        }, 300);
    }

    const handleMouseLeave = useCallback(e => {
        clearTimeout(timeoutId.current);
    }, []);

    const handleKeyDown = e => {
        let handled = false;

        switch (e.key) {
            case 'ArrowLeft':
                if (isOpen) {
                    closeMenu();
                    handled = true;
                }
                break;
            case 'ArrowRight':
                if (isActive) {
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

    useLayoutEffect(() => {
        if (isActive) {
            containerRef.current.focus();
        } else {
            closeMenu();
        }
    }, [isActive]);

    return (
        <li className={bem(menuClass, subMenuClass, ['open', isOpen])}
            role="presentation" ref={containerRef}
            onKeyDown={handleKeyDown}
            tabIndex="-1">
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
                direction="inline-end">
                {children}
            </MenuList>
        </li>
    );
});
