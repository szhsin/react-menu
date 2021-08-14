import React, { memo, forwardRef, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useMenuChange, useMenuStateAndFocus, useCombinedRef } from '../hooks';
import { useMenuList } from './useMenuList';
import {
    getName,
    attachHandlerProps,
    safeCall,
    isMenuOpen,
    menuPropTypesBase,
    menuDefaultPropsBase,
    Keys,
    FocusPositions
} from '../utils';


export const Menu = memo(forwardRef(function Menu({
    'aria-label': ariaLabel,
    containerProps,
    boundingBoxRef,
    boundingBoxPadding,
    captureFocus: _,
    reposition,
    viewScroll,
    menuButton,
    portal,
    submenuOpenDelay,
    submenuCloseDelay,
    theming,
    initialMounted,
    unmountOnClose,
    transition,
    transitionTimeout,
    onItemClick,
    onChange,
    ...restProps
}, externalRef) {

    const {
        openMenu,
        toggleMenu,
        ...stateProps
    } = useMenuStateAndFocus({ initialMounted, unmountOnClose, transition, transitionTimeout });
    const isOpen = isMenuOpen(stateProps.state);
    const skipClick = useRef(false);
    const buttonRef = useRef(null);

    const button = useMemo(() => safeCall(menuButton, { open: isOpen }), [menuButton, isOpen]);
    if (!button) throw new Error('Menu requires a menuButton prop.');

    const handleClose = useCallback(e => {
        toggleMenu(false);
        if (e.key) buttonRef.current.focus();
    }, [toggleMenu]);

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

    const combinedBtnRef = useCombinedRef(button.ref, buttonRef);
    const renderButton = useMemo(() => {
        const buttonProps = {
            ref: combinedBtnRef,
            ...attachHandlerProps({
                onClick: handleClick,
                onKeyDown: handleKeyDown
            }, button.props)
        };
        if (getName(button.type) === 'MenuButton') {
            buttonProps.isOpen = isOpen;
        }
        return React.cloneElement(button, buttonProps);
    }, [button, combinedBtnRef, isOpen, handleClick, handleKeyDown]);

    const menuList = useMenuList({
        ...restProps,
        ...stateProps,
        ariaLabel: ariaLabel ||
            (typeof button.props.children === 'string'
                ? button.props.children
                : 'Menu'),
        anchorRef: buttonRef,
        externalRef
    }, {
        containerProps,
        initialMounted,
        unmountOnClose,
        transition,
        transitionTimeout,
        boundingBoxRef,
        boundingBoxPadding,
        reposition,
        submenuOpenDelay,
        submenuCloseDelay,
        viewScroll,
        portal,
        theming,
        onItemClick,
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
}));

Menu.propTypes = {
    ...menuPropTypesBase,
    menuButton: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
    ]).isRequired,
    onChange: PropTypes.func
};

Menu.defaultProps = menuDefaultPropsBase;
