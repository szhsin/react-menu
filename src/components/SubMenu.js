import React, { useState, useRef, useContext, useEffect } from 'react';
import {
    defineName, bem, menuClass, subMenuClass, menuItemClass,
    HoverIndexContext, keyCodes, useMenuState, useActiveState
} from '../utils';
import { MenuList } from './MenuList';


export const SubMenu = defineName(React.memo(({ label, disabled, index, children, onMouseEnter }) => {

    // console.log(`Submenu render: ${label}`)
    const { isMounted, isOpen, openMenu, closeMenu, toggleMenu } = useMenuState();
    const { active, onKeyUp, ...activeStateHandlers } = useActiveState(keyCodes.RIGHT);
    const [isKeyboardEvent, setIsKeyboardEvent] = useState(false);
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const timeoutId = useRef();
    const isHovering = useContext(HoverIndexContext) === index;

    const handleMouseEnter = e => {
        if (disabled) return;
        onMouseEnter(index, e);
        timeoutId.current = setTimeout(() => {
            setIsKeyboardEvent(false);
            openMenu();
        }, 300);
    }

    const handleMouseLeave = e => {
        clearTimeout(timeoutId.current);
    }

    const handleClick = e => {
        if (disabled) return;
        setIsKeyboardEvent(false);
        toggleMenu();
    }

    const handleKeyDown = e => {
        let handled = false;

        switch (e.keyCode) {
            // LEFT key is bubbled up from submenu items
            case keyCodes.LEFT:
                if (isOpen) {
                    closeMenu();
                    itemRef.current.focus();
                    handled = true;
                }
                break;

            // prevent browser from scrolling page to the right
            case keyCodes.RIGHT:
                if (!isOpen) handled = true;
                break;
        }

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const handleKeyUp = e => {
        // Check 'active' to skip KeyUp when corresponding KeyDown was initiated in another menu item
        if (!active) return;

        onKeyUp(e);
        switch (e.keyCode) {
            case keyCodes.SPACE:
            case keyCodes.RETURN:
            case keyCodes.RIGHT:
                setIsKeyboardEvent(true);
                openMenu();
                break;
        }
    }

    useEffect(() => {
        if (isHovering) {
            itemRef.current.focus();
        } else {
            closeMenu();
        }
    }, [isHovering, closeMenu]);

    return (
        <li className={bem(menuClass, subMenuClass, ['open', isOpen])}
            role="presentation" ref={containerRef}
            onKeyDown={handleKeyDown}>

            <div className={bem(menuClass, menuItemClass,
                ['hover', isHovering],
                ['active', active && !disabled],
                ['disabled', disabled])}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={isOpen}
                tabIndex={isHovering && !isOpen ? 0 : -1}
                ref={itemRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                onKeyUp={handleKeyUp}
                {...activeStateHandlers}>
                {label}
            </div>

            <MenuList
                isMounted={isMounted}
                isOpen={isOpen}
                isKeyboardEvent={isKeyboardEvent}
                containerRef={containerRef}
                anchorRef={itemRef}
                direction="right">
                {children}
            </MenuList>
        </li>
    );
}), 'SubMenu');
