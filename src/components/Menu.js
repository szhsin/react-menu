import React, { useRef, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
    bem, menuContainerClass,
    SettingsContext, EventHandlersContext,
    KeyCodes, FocusPositions,
    useMenuState, useMenuList,
    menuPropTypesBase
} from '../utils';
import { MenuList } from './MenuList'


export const Menu = React.memo(function Menu({
    'aria-label': ariaLabel,
    className,
    styles,
    animation,
    align,
    direction,
    menuButton,
    children,
    onClick }) {

    // console.log(`Menu render`);
    const { isMounted, isOpen, menuItemFocus, openMenu, closeMenu, toggleMenu } = useMenuState();
    const buttonRef = useRef(null);

    const handleClose = useCallback(e => {
        closeMenu();
        if (e.keyCode) buttonRef.current.focus();
    }, [closeMenu]);

    const {
        containerRef,
        settings,
        eventHandlers,
        ...otherHandlers }
        = useMenuList(animation, onClick, handleClose);

    const handleClick = useCallback(e => {
        // Focus (hover) the first menu item when onClick event is trigger by keyboard
        toggleMenu(e.detail === 0
            ? FocusPositions.FIRST
            : FocusPositions.INITIAL);
    }, [toggleMenu]);

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

    const button = typeof menuButton === 'function'
        ? menuButton({ open: isOpen })
        : menuButton;

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

    return (
        <div className={bem(menuContainerClass)()}
            role="presentation" ref={containerRef} {...otherHandlers}>
            {renderButton}

            <SettingsContext.Provider value={settings}>
                <EventHandlersContext.Provider value={eventHandlers}>
                    <MenuList
                        ariaLabel={
                            ariaLabel ||
                            (typeof button.props.children === 'string'
                                ? button.props.children
                                : 'Menu')}
                        className={className}
                        styles={styles}
                        anchorRef={buttonRef}
                        containerRef={containerRef}
                        align={align}
                        direction={direction}
                        isOpen={isOpen}
                        isMounted={isMounted}
                        menuItemFocus={menuItemFocus}>
                        {children}
                    </MenuList>
                </EventHandlersContext.Provider>
            </SettingsContext.Provider>
        </div>
    );
});

Menu.propTypes = {
    ...menuPropTypesBase,
    menuButton: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func
    ]).isRequired
};

Menu.defaultProps = {
    animation: true
};
