import React, { useRef, useCallback, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    safeCall,
    menuPropTypesBase,
    KeyCodes,
    FocusPositions,
    useMenuState
} from '../utils';
import { useMenuList } from './useMenuList';


export const Menu = React.memo(function Menu({
    'aria-label': ariaLabel,
    id,
    className,
    styles,
    animation,
    debugging,
    keepMounted,
    align,
    direction,
    menuButton,
    children,
    onClick,
    onChange }) {

    const {
        isMounted, isOpen, menuItemFocus,
        openMenu, closeMenu
    } = useMenuState(keepMounted);

    const skipClick = useRef(false);
    const buttonRef = useRef(null);

    const button = safeCall(menuButton, { open: isOpen });
    if (!button) return 'Error: menuButton prop is required.';

    const handleClose = useCallback(e => {
        closeMenu();
        if (e.keyCode) buttonRef.current.focus();
    }, [closeMenu]);

    const handleClick = useCallback(e => {
        if (skipClick.current) return;
        // Focus (hover) the first menu item when onClick event is trigger by keyboard
        openMenu(e.detail === 0
            ? FocusPositions.FIRST
            : FocusPositions.INITIAL);
    }, [openMenu]);

    const handleKeyDown = useCallback(e => {
        let handled = false;

        switch (e.keyCode) {
            case KeyCodes.UP:
                openMenu(FocusPositions.LAST);
                handled = true;
                break;

            case KeyCodes.DOWN:
                openMenu(FocusPositions.FIRST);
                handled = true;
                break;
        }

        if (handled) e.preventDefault();
    }, [openMenu]);

    const renderButton = useMemo(() => {
        if (!button) return null;

        const buttonProps = {
            ref: buttonRef,
            onClick: handleClick,
            onKeyDown: handleKeyDown
        };
        if (button.type.__name__ === 'MenuButton') {
            buttonProps.isOpen = isOpen;
        }
        return React.cloneElement(button, buttonProps);
    }, [button, isOpen, handleClick, handleKeyDown]);

    const menuList = useMenuList(
        {
            ariaLabel: ariaLabel ||
                (typeof button.props.children === 'string'
                    ? button.props.children
                    : 'Menu'),
            className,
            styles,
            anchorRef: buttonRef,
            align,
            direction,
            isOpen,
            isMounted,
            menuItemFocus
        },
        id,
        animation,
        debugging,
        children,
        onClick,
        handleClose,
        skipClick);

    useEffect(() => {
        safeCall(onChange, { open: isOpen });
    }, [onChange, isOpen]);

    return (
        <React.Fragment>
            {renderButton}
            {menuList}
        </React.Fragment>
    );
});

Menu.propTypes = {
    ...menuPropTypesBase,
    keepMounted: PropTypes.bool,
    menuButton: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
    ]).isRequired,
    onChange: PropTypes.func
};

Menu.defaultProps = {
    animation: true,
    keepMounted: true
};
