import React, { useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    getName,
    attachHandlerProps,
    safeCall,
    menuPropTypesBase,
    menuDefaultPropsBase,
    Keys,
    FocusPositions,
    useMenuChange,
    useMenuState
} from '../utils';
import { useMenuList } from './useMenuList';


export const Menu = React.memo(function Menu({
    'aria-label': ariaLabel,
    id,
    animation,
    captureFocus: _,
    debugging,
    viewScroll,
    keepMounted,
    menuButton,
    portal,
    onClick,
    onChange,
    ...restProps }) {

    const {
        isMounted, isOpen, menuItemFocus,
        openMenu, closeMenu
    } = useMenuState(keepMounted);
    useMenuChange(onChange, isOpen);

    const skipClick = useRef(false);
    const buttonRef = useRef(null);

    const button = safeCall(menuButton, { open: isOpen });
    if (!button) throw new Error('Menu requires a menuButton prop.');

    const handleClose = useCallback(e => {
        closeMenu();
        if (e.key) buttonRef.current.focus();
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

        switch (e.key) {
            case Keys.UP:
                openMenu(FocusPositions.LAST);
                handled = true;
                break;

            case Keys.DOWN:
                openMenu(FocusPositions.FIRST);
                handled = true;
                break;
        }

        if (handled) e.preventDefault();
    }, [openMenu]);

    const renderButton = useMemo(() => {
        const buttonProps = {
            ref: buttonRef,
            ...attachHandlerProps({
                onClick: handleClick,
                onKeyDown: handleKeyDown
            }, button.props)
        };
        if (getName(button.type) === 'MenuButton') {
            buttonProps.isOpen = isOpen;
        }
        return React.cloneElement(button, buttonProps);
    }, [button, isOpen, handleClick, handleKeyDown]);

    const menuList = useMenuList(
        {
            ...restProps,
            ariaLabel: ariaLabel ||
                (typeof button.props.children === 'string'
                    ? button.props.children
                    : 'Menu'),
            anchorRef: buttonRef,
            isOpen,
            isMounted,
            menuItemFocus,
        },
        id,
        animation,
        debugging,
        viewScroll,
        portal,
        onClick,
        handleClose,
        skipClick);

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
    ...menuDefaultPropsBase,
    keepMounted: true
};
