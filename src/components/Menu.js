import React, { useCallback, useRef, useMemo, useState } from 'react';
import {
    bem, menuContainerClass,
    SettingsContext, EventHandlersContext,
    useMenuState, useMenuList
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
    const { isMounted, isOpen, closeMenu, toggleMenu } = useMenuState();
    const [isKeyboardEvent, setIsKeyboardEvent] = useState(false);
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

    const renderButton = useMemo(() => (
        button &&
        React.cloneElement(button, {
            ref: buttonRef,
            onClick: e => {
                setIsKeyboardEvent(e.detail === 0);
                toggleMenu();
            }
        })
    ), [button, toggleMenu]);

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
                        isKeyboardEvent={isKeyboardEvent}
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
