import React, { useState, useRef, useContext, useEffect } from 'react';
import {
    defineName, bem, flatStyles,
    menuClass, subMenuClass, menuItemClass,
    MenuListContext, keyCodes, hoverIndexActionType,
    useMenuState, useActiveState
} from '../utils';
import { MenuList } from './MenuList';


export const SubMenu = defineName(React.memo(({
    className,
    menuClassName,
    styles,
    menuStyles,
    label,
    disabled,
    index,
    children }) => {

    // console.log(`Submenu render: ${label}`)
    const { isMounted, isOpen, openMenu, closeMenu } = useMenuState();
    const { active, onKeyUp, onBlur, ...activeStateHandlers } = useActiveState(keyCodes.RIGHT);
    const [isKeyboardEvent, setIsKeyboardEvent] = useState(false);
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const timeoutId = useRef();
    const { isParentOpen, hoverIndex, hoverIndexDispatch } = useContext(MenuListContext);
    const isHovering = hoverIndex === index;

    const handleMouseEnter = e => {
        if (disabled) return;
        hoverIndexDispatch({ type: hoverIndexActionType.SET, index });
        timeoutId.current = setTimeout(() => {
            timeoutId.current = null;
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
        openMenu();
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

    const handleBlur = e => {
        onBlur(e);
        // Check if something which is not in the subtree get focus.
        // It handles situation such as clicking on a sibling disabled menu item
        if (!e.currentTarget.contains(e.relatedTarget)) {
            closeMenu();
            hoverIndexDispatch({ type: hoverIndexActionType.UNSET, index });
        } else if (itemRef.current === e.relatedTarget) {
            // This handles clicking on submenu item when it's open
            // First close the submenu and then let subsequent onClick event to re-open it
            // for maintaining the correct focus
            closeMenu();
        }
    }

    useEffect(() => {
        if (isHovering && isParentOpen) {
            itemRef.current.focus();
        } else {
            closeMenu();
        }
    }, [isHovering, isParentOpen, closeMenu]);

    const modifiers = {
        open: isOpen,
        hover: isHovering,
        active: active && !disabled,
        disabled
    };

    return (
        <li className={bem(menuClass, subMenuClass)()}
            role="presentation" ref={containerRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}>

            <div className={bem(menuClass, menuItemClass, modifiers)(className)}
                style={flatStyles(styles, modifiers)}
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
                className={menuClassName}
                styles={menuStyles}
                isMounted={isMounted}
                isOpen={isOpen}
                isKeyboardEvent={isKeyboardEvent}
                containerRef={containerRef}
                anchorRef={itemRef}
                direction={'right'}>
                {children}
            </MenuList>
        </li>
    );
}), 'SubMenu');
