import React, { useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    defineName,
    safeCall,
    bem,
    flatStyles,
    stylePropTypes,
    sharedMenuPropTypes,
    offsetDefaultProps,
    menuClass,
    subMenuClass,
    menuItemClass,
    MenuListContext,
    SettingsContext,
    Keys,
    HoverIndexActionTypes,
    FocusPositions,
    useActiveState,
    useMenuChange,
    useMenuState
} from '../utils';
import { MenuList } from './MenuList';


export const SubMenu = defineName(React.memo(function SubMenu({
    'aria-label': ariaLabel,
    className,
    styles,
    arrowClassName,
    arrowStyles,
    itemClassName,
    itemStyles,
    arrow,
    disabled,
    keepMounted,
    label,
    index,
    offsetX,
    offsetY,
    children,
    onChange }) {

    const { isMounted, isOpen, menuItemFocus, openMenu, closeMenu } = useMenuState(keepMounted);
    const { isActive, onKeyUp, onBlur, ...activeStateHandlers } = useActiveState(Keys.RIGHT);
    const { isParentOpen, hoverIndex, hoverIndexDispatch } = useContext(MenuListContext);
    const { debugging } = useContext(SettingsContext);
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const timeoutId = useRef();
    const isHovering = hoverIndex === index;
    const isDisabled = disabled ? true : undefined;

    useMenuChange(onChange, isOpen);

    const handleMouseEnter = e => {
        if (isDisabled) return;
        hoverIndexDispatch({ type: HoverIndexActionTypes.SET, index });
        timeoutId.current = setTimeout(() => {
            timeoutId.current = null;
            openMenu();
        }, 300);
    }

    const handleMouseLeave = e => {
        if (isDisabled) return;
        clearTimeout(timeoutId.current);
        if (!isOpen) {
            hoverIndexDispatch({ type: HoverIndexActionTypes.UNSET, index });
        }
    }

    const handleClick = e => {
        if (isDisabled) return;
        openMenu();
    }

    const handleKeyDown = e => {
        let handled = false;

        switch (e.key) {
            // LEFT key is bubbled up from submenu items
            case Keys.LEFT:
                if (isOpen) {
                    closeMenu();
                    itemRef.current.focus();
                    handled = true;
                }
                break;

            // prevent browser from scrolling page to the right
            case Keys.RIGHT:
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
        switch (e.key) {
            case Keys.SPACE:
            case Keys.ENTER:
            case Keys.RIGHT:
                openMenu(FocusPositions.FIRST);
                break;
        }
    }

    const handleBlur = e => {
        onBlur(e);

        // In debugging mode, neither close menu nor reset hoverIndex.
        if (debugging) return;

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

    const modifiers = Object.freeze({
        open: isOpen,
        hover: isHovering,
        active: isActive && !isDisabled,
        disabled: isDisabled
    });

    return (
        <li className={bem(menuClass, subMenuClass)()}
            role="presentation" ref={containerRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}>

            <div className={bem(menuClass, menuItemClass, modifiers)(itemClassName)}
                style={flatStyles(itemStyles, modifiers)}
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
                {safeCall(label, modifiers)}
            </div>

            <MenuList
                ariaLabel={ariaLabel || (typeof label === 'string' ? label : 'Submenu')}
                className={className}
                styles={styles}
                arrowClassName={arrowClassName}
                arrowStyles={arrowStyles}
                anchorRef={itemRef}
                containerRef={containerRef}
                arrow={arrow}
                direction={'right'}
                isOpen={isOpen}
                isMounted={isMounted}
                isDisabled={isDisabled}
                menuItemFocus={menuItemFocus}
                offsetX={offsetX}
                offsetY={offsetY}>
                {children}
            </MenuList>
        </li>
    );
}), 'SubMenu');

SubMenu.propTypes = {
    ...sharedMenuPropTypes,
    ...stylePropTypes('item'),
    disabled: PropTypes.bool,
    keepMounted: PropTypes.bool,
    label: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]).isRequired,
    onChange: PropTypes.func
};

SubMenu.defaultProps = {
    ...offsetDefaultProps,
    keepMounted: true
};
