import React, { forwardRef, useRef, useCallback } from 'react';
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

    const handleClose = useCallback(e => {
        toggleMenu(false);
        if (e.key) buttonRef.current.focus();
    }, [toggleMenu]);

    const handleClick = e => {
        if (skipOpen.current) return;
        // Focus (hover) the first menu item when onClick event is trigger by keyboard
        openMenu(e.detail === 0
            ? FocusPositions.FIRST
            : FocusPositions.INITIAL);
    }

    const handleKeyDown = e => {
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
    }

    const button = safeCall(menuButton, { open: isOpen });
    if (!button) throw new Error('Menu requires a menuButton prop.');

    const buttonProps = {
        ref: useCombinedRef(button.ref, buttonRef),
        ...attachHandlerProps({
            onClick: handleClick,
            onKeyDown: handleKeyDown
        }, button.props)
    };
    if (getName(button.type) === 'MenuButton') {
        buttonProps.isOpen = isOpen;
    }
    const renderButton = React.cloneElement(button, buttonProps);

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
