import React, { useCallback, useRef, useMemo, useState } from 'react';
import {
    bem, menuContainerClass,
    SettingsContext, EventHandlersContext,
    KeyCodes, FocusingMenuItemPositions,
    useMenuState, useMenuList,
} from '../utils';
import { MenuList } from './MenuList'


export const Menu = React.memo(({
    className,
    styles,
    menuButton,
    align,
    direction,
    animation,
    children,
    onClick }) => {

    // console.log(`Menu render`);
    const { isMounted, isOpen, openMenu, closeMenu, toggleMenu } = useMenuState();
    const [focusingMenuItemPosition, setFocusingMenuItemPosition]
        = useState(FocusingMenuItemPositions.INITIAL);
    const buttonRef = useRef(null);

    const handleClose = useCallback(isKeyboardEvent => {
        closeMenu();
        if (isKeyboardEvent) buttonRef.current.focus();
    }, [closeMenu]);

    const {
        containerRef,
        settings,
        eventHandlers,
        ...otherHandlers }
        = useMenuList(animation, onClick, handleClose);

    let button;
    if (typeof menuButton === 'function') {
        button = menuButton({ isOpen })
    } else {
        button = menuButton;
    }

    const handleClick = useCallback(e => {
        // Focus (hover) the first menu item when onClick event is trigger by keyboard
        setFocusingMenuItemPosition(e.detail === 0
            ? FocusingMenuItemPositions.FIRST : FocusingMenuItemPositions.INITIAL);
        toggleMenu();
    }, [toggleMenu]);

    const handleKeyDown = useCallback(e => {
        let handled = false;

        switch (e.keyCode) {
            case KeyCodes.UP:
                setFocusingMenuItemPosition(FocusingMenuItemPositions.LAST);
                openMenu();
                handled = true;
                break;

            case KeyCodes.DOWN:
                setFocusingMenuItemPosition(FocusingMenuItemPositions.FIRST);
                openMenu();
                handled = true;
                break;
        }

        if (handled) e.preventDefault();
    }, [openMenu]);

    const renderButton = useMemo(() => (
        button &&
        React.cloneElement(button, {
            ref: buttonRef,
            onClick: handleClick,
            onKeyDown: handleKeyDown
        })
    ), [button, handleClick, handleKeyDown]);

    return (
        <div className={bem(menuContainerClass)()}
            role="presentation" ref={containerRef} {...otherHandlers}>
            {renderButton}

            <SettingsContext.Provider value={settings}>
                <EventHandlersContext.Provider value={eventHandlers}>
                    <MenuList
                        className={className}
                        styles={styles}
                        isMounted={isMounted}
                        isOpen={isOpen}
                        focusingMenuItemPosition={focusingMenuItemPosition}
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
