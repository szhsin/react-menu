import React, { useRef, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
    defineName,
    safeCall,
    bem,
    flatStyles,
    stylePropTypes,
    sharedMenuPropTypes,
    sharedMenuDefaultProp,
    menuClass,
    subMenuClass,
    menuItemClass,
    MenuListItemContext,
    ItemSettingsContext,
    Keys,
    HoverIndexActionTypes,
    SubmenuActionTypes,
    FocusPositions,
    useActiveState,
    useMenuChange,
    useMenuState
} from '../utils';
import { MenuList } from './MenuList';


export const SubMenu = defineName(React.memo(function SubMenu({
    'aria-label': ariaLabel,
    itemClassName,
    itemStyles,
    disabled,
    keepMounted,
    label,
    index,
    onChange,
    captureFocus: _1,
    repositionFlag: _2,
    ...restProps }) {

    const { isMounted, isOpen, menuItemFocus, openMenu, closeMenu } = useMenuState(keepMounted);
    const { isParentOpen, hoverIndex, isSubmenuOpen, dispatch } = useContext(MenuListItemContext);
    const { debugging, submenuOpenDelay, submenuCloseDelay } = useContext(ItemSettingsContext);
    const isHovering = hoverIndex === index;
    const isDisabled = Boolean(disabled);
    const {
        isActive, onKeyUp,
        ...activeStateHandlers
    } = useActiveState(isHovering, isDisabled, Keys.RIGHT);
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const timeoutId = useRef();

    const handleClose = useCallback(() => {
        closeMenu();
        itemRef.current.focus();
    }, [closeMenu]);

    const delayOpen = delay => {
        dispatch({ type: HoverIndexActionTypes.SET, index });
        timeoutId.current = setTimeout(openMenu, Math.max(delay, 0));
    }

    const handleMouseEnter = () => {
        if (isDisabled || isOpen) return;

        if (isSubmenuOpen) {
            timeoutId.current = setTimeout(
                () => delayOpen(submenuOpenDelay - submenuCloseDelay),
                submenuCloseDelay
            );
        } else {
            delayOpen(submenuOpenDelay);
        }
    }

    const handleMouseLeave = () => {
        clearTimeout(timeoutId.current);
        if (!isOpen) {
            dispatch({ type: HoverIndexActionTypes.UNSET, index });
        }
    }

    const handleClick = () => {
        if (isDisabled) return;
        clearTimeout(timeoutId.current);
        openMenu();
    }

    const handleKeyDown = e => {
        let handled = false;

        switch (e.key) {
            // LEFT key is bubbled up from submenu items
            case Keys.LEFT:
                if (isOpen) {
                    handleClose();
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
        // In debugging mode, neither close menu nor reset hoverIndex.
        if (debugging) return;

        const relatedTarget = e.relatedTarget || document.activeElement;
        // Check if something which is not in the subtree get focus.
        // It handles situation such as clicking on a sibling disabled menu item
        if (!e.currentTarget.contains(relatedTarget)) {
            closeMenu();
            dispatch({ type: HoverIndexActionTypes.UNSET, index });
        }
    }

    useEffect(() => () => clearTimeout(timeoutId.current), []);
    useEffect(() => {
        // Don't set focus when parent menu is closed, otherwise focus will be lost
        // and onBlur event will be fired with relatedTarget setting as null.
        if (isHovering && isParentOpen) {
            itemRef.current.focus();
        } else {
            closeMenu();
        }
    }, [isHovering, isParentOpen, closeMenu]);

    useEffect(() => {
        dispatch({ type: isOpen ? SubmenuActionTypes.OPEN : SubmenuActionTypes.CLOSE });
    }, [dispatch, isOpen]);
    useMenuChange(onChange, isOpen);

    const modifiers = Object.freeze({
        open: isOpen,
        hover: isHovering,
        active: isActive,
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
                aria-disabled={isDisabled || undefined}
                tabIndex={isHovering && !isOpen ? 0 : -1}
                ref={itemRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseDown={() => !isHovering && dispatch({ type: HoverIndexActionTypes.SET, index })}
                onClick={handleClick}
                onKeyUp={handleKeyUp}
                {...activeStateHandlers}>
                {safeCall(label, modifiers)}
            </div>

            {isMounted && <MenuList
                {...restProps}
                ariaLabel={ariaLabel || (typeof label === 'string' ? label : 'Submenu')}
                anchorRef={itemRef}
                containerRef={containerRef}
                isOpen={isOpen}
                isDisabled={isDisabled}
                menuItemFocus={menuItemFocus} />}
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
    ...sharedMenuDefaultProp,
    direction: 'right',
    keepMounted: true
};
