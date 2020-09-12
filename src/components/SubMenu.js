import React, { useState, useRef, useContext, useEffect } from 'react';
import {
    defineName, bem, flatStyles,
    menuClass, subMenuClass, menuItemClass,
    MenuListContext, KeyCodes,
    HoverIndexActionTypes, FocusPositions,
    useMenuState, useActiveState
} from '../utils';
import { MenuList } from './MenuList';


export const SubMenu = defineName(React.memo(({
    'aria-label': ariaLabel,
    className,
    menuClassName,
    styles,
    menuStyles,
    label,
    disabled,
    index,
    children }) => {

    // console.log(`Submenu render: ${label}`)
    const { isMounted, isOpen, menuItemFocus, openMenu, closeMenu } = useMenuState();
    const { isActive, onKeyUp, onBlur, ...activeStateHandlers } = useActiveState(KeyCodes.RIGHT);
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const timeoutId = useRef();
    const { isParentOpen, hoverIndex, hoverIndexDispatch } = useContext(MenuListContext);
    const isHovering = hoverIndex === index;
    const isDisabled = disabled ? true : undefined;

    const handleMouseEnter = e => {
        if (isDisabled) return;
        hoverIndexDispatch({ type: HoverIndexActionTypes.SET, index });
        timeoutId.current = setTimeout(() => {
            timeoutId.current = null;
            openMenu();
        }, 300);
    }

    const handleMouseLeave = e => {
        clearTimeout(timeoutId.current);
    }

    const handleClick = e => {
        if (isDisabled) return;
        openMenu();
    }

    const handleKeyDown = e => {
        let handled = false;

        switch (e.keyCode) {
            // LEFT key is bubbled up from submenu items
            case KeyCodes.LEFT:
                if (isOpen) {
                    closeMenu();
                    itemRef.current.focus();
                    handled = true;
                }
                break;

            // prevent browser from scrolling page to the right
            case KeyCodes.RIGHT:
                if (!isOpen) handled = true;
                break;
        }

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const handleKeyUp = e => {
        // Check 'isActive' to skip KeyUp when corresponding KeyDown was initiated in another menu item
        if (!isActive) return;

        onKeyUp(e);
        switch (e.keyCode) {
            case KeyCodes.SPACE:
            case KeyCodes.RETURN:
            case KeyCodes.RIGHT:
                openMenu(FocusPositions.FIRST);
                break;
        }
    }

    const handleBlur = e => {
        onBlur(e);
        // Check if something which is not in the subtree get focus.
        // It handles situation such as clicking on a sibling disabled menu item
        if (!e.currentTarget.contains(e.relatedTarget)) {
            closeMenu();
            hoverIndexDispatch({ type: HoverIndexActionTypes.UNSET, index });
        } else if (itemRef.current === e.relatedTarget) {
            // This handles clicking on submenu item when it's open
            // First close the submenu and then let subsequent onClick event to re-open it
            // for maintaining the correct focus
            closeMenu();
        }
    }

    useEffect(() => {
        // Don't set focus when parent menu is closed, otherwise focus will be lost
        // and onBlur event will be fired with relatedTarget setting as null.
        if (isHovering && isParentOpen) {
            itemRef.current.focus();
        } else {
            closeMenu();
        }
    }, [isHovering, isParentOpen, closeMenu]);

    const modifiers = {
        open: isOpen,
        hover: isHovering,
        active: isActive && !isDisabled,
        disabled: isDisabled
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
                aria-disabled={isDisabled}
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
                ariaLabel={ariaLabel || (typeof label === 'string' ? label : 'Submenu')}
                className={menuClassName}
                styles={menuStyles}
                isMounted={isMounted}
                isOpen={isOpen}
                isDisabled={isDisabled}
                menuItemFocus={menuItemFocus}
                containerRef={containerRef}
                anchorRef={itemRef}
                direction={'right'}>
                {children}
            </MenuList>
        </li>
    );
}), 'SubMenu');
