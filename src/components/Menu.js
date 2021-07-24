import React, { useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useMenuChange, useMenuState } from '../hooks';
import { useMenuList } from './useMenuList';
import {
    getName,
    attachHandlerProps,
    safeCall,
    menuPropTypesBase,
    menuDefaultPropsBase,
    Keys,
    FocusPositions
} from '../utils';


export const Menu = React.memo(function Menu({
    'aria-label': ariaLabel,
    id,
    animation,
    boundingBoxRef,
    boundingBoxPadding,
    captureFocus: _,
    debugging,
    reposition,
    viewScroll,
    keepMounted,
    menuButton,
    portal,
    submenuOpenDelay,
    submenuCloseDelay,
    theming,
    onItemClick,
    onClick,
    onChange,
    ...restProps }) {

    const {
        isMounted, isOpen, menuItemFocus,
        openMenu, closeMenu
    } = useMenuState(keepMounted);

    const skipClick = useRef(false);
    const buttonRef = useRef(null);

    const button = useMemo(() => safeCall(menuButton, { open: isOpen }), [menuButton, isOpen]);
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

    const menuList = useMenuList({
        ...restProps,
        ariaLabel: ariaLabel ||
            (typeof button.props.children === 'string'
                ? button.props.children
                : 'Menu'),
        anchorRef: buttonRef,
        isOpen,
        menuItemFocus,
    }, {
        id,
        animation,
        boundingBoxRef,
        boundingBoxPadding,
        debugging,
        reposition,
        submenuOpenDelay,
        submenuCloseDelay,
        viewScroll,
        portal,
        theming,
        isMounted,
        onItemClick,
        onClick,
        onClose: handleClose,
        skipClick
    });

    useMenuChange(onChange, isOpen);

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
