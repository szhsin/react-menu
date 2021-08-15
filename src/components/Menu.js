import React, { forwardRef, useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { ControlledMenu } from './ControlledMenu';
import { useMenuChange, useMenuStateAndFocus, useCombinedRef } from '../hooks';
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


export const Menu = forwardRef(function Menu({
    'aria-label': ariaLabel,
    captureFocus: _,
    menuButton,
    onMenuChange,
    ...restProps
}, externalRef) {

    const { openMenu, toggleMenu, ...stateProps } = useMenuStateAndFocus(restProps);
    const isOpen = isMenuOpen(stateProps.state);
    const skipOpen = useRef(false);
    const buttonRef = useRef(null);

    const button = useMemo(() => safeCall(menuButton, { open: isOpen }), [menuButton, isOpen]);
    if (!button) throw new Error('Menu requires a menuButton prop.');

    const handleClose = useCallback(e => {
        toggleMenu(false);
        if (e.key) buttonRef.current.focus();
    }, [toggleMenu]);

    const handleClick = useCallback(e => {
        if (skipOpen.current) return;
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

    useMenuChange(onMenuChange, isOpen);

    const menuProps = {
        ...restProps,
        ...stateProps,
        'aria-label': ariaLabel ||
            (typeof button.props.children === 'string'
                ? button.props.children
                : 'Menu'),
        anchorRef: buttonRef,
        ref: externalRef,
        onClose: handleClose,
        skipOpen
    }

    return (
        <React.Fragment>
            {renderButton}
            <ControlledMenu {...menuProps} />
        </React.Fragment>
    );
});

Menu.propTypes = {
    ...menuPropTypesBase,
    menuButton: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
    ]).isRequired,
    onMenuChange: PropTypes.func
};

Menu.defaultProps = menuDefaultPropsBase;
