import React, { useCallback, useRef, useMemo, useState } from 'react';
import {
    bem, menuContainerClass,
    SettingsContext, EventHandlersContext,
    KeyCodes, FocusPositions,
    useMenuState, useMenuList,
} from '../utils';
import { MenuList } from './MenuList'


export const Menu = React.memo(({
    'aria-label': ariaLabel,
    className,
    styles,
    menuButton,
    align,
    direction,
    animation,
    children,
    onClick }) => {

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
                        isMounted={isMounted}
                        isOpen={isOpen}
                        menuItemFocus={menuItemFocus}
                        containerRef={containerRef}
                        anchorRef={buttonRef}
                        align={align}
                        direction={direction}>
                        {children}
                    </MenuList>
                </EventHandlersContext.Provider>
            </SettingsContext.Provider>
        </div>
    );
});
