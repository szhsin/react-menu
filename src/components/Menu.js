import React, { useCallback, useRef, useMemo, useState } from 'react';
import {
    bem, menuContainerClass, EventHandlersContext,
    useMenuState, useMenuList
} from '../utils';
import { MenuList } from './MenuList'


export const Menu = React.memo(({ menuButton, direction, children, onClick }) => {

    // console.log(`Menu render`);
    const { isMounted, isOpen, closeMenu, toggleMenu } = useMenuState();
    const [isKeyboardEvent, setIsKeyboardEvent] = useState(false);
    const buttonRef = useRef(null);

    const handleClose = useCallback(isKeyboardEvent => {
        closeMenu();
        if (isKeyboardEvent) buttonRef.current.focus();
    }, [closeMenu]);

    const { containerRef, eventHandlers, ...otherHandlers } = useMenuList(onClick, handleClose);

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
        <div className={bem(menuContainerClass, null, ['open', isOpen])}
            role="presentation" ref={containerRef} {...otherHandlers}>
            {button}

            <EventHandlersContext.Provider value={eventHandlers}>
                <MenuList
                    isMounted={isMounted}
                    isOpen={isOpen}
                    isKeyboardEvent={isKeyboardEvent}
                    containerRef={containerRef}
                    anchorRef={buttonRef}
                    direction={direction}>
                    {children}
                </MenuList>
            </EventHandlersContext.Provider>
        </div>
    );
});
