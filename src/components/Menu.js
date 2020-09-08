import React, { useCallback, useRef, useMemo, useState } from 'react';
import {
    bem, menuContainerClass,
    SettingsContext, EventHandlersContext,
    useMenuState, useMenuList
} from '../utils';
import { MenuList } from './MenuList'


export const Menu = React.memo(({
    className,
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

    const button = useMemo(() => (
        menuButton &&
        React.cloneElement(menuButton, {
            ref: buttonRef,
            onClick: e => {
                setIsKeyboardEvent(e.detail === 0);
                toggleMenu();
            }
        })
    ), [menuButton, toggleMenu]);

    return (
        <div className={bem(menuContainerClass)()}
            role="presentation" ref={containerRef} {...otherHandlers}>
            {button}

            <SettingsContext.Provider value={settings}>
                <EventHandlersContext.Provider value={eventHandlers}>
                    <MenuList
                        className={className}
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
