import React, { useCallback, useRef, useMemo, useState } from 'react';
import './styles/index.scss';
import {
    bem, menuContainerClass, keyCodes, EventHandlersContext,
    useMenuState
} from '../utils';
import { MenuList } from './MenuList'


export const Menu = React.memo(({ menuButton, children, onClick }) => {

    // console.log(`Menu render`);
    const { isMounted, isOpen, closeMenu, toggleMenu } = useMenuState();
    const [isKeyboardEvent, setIsKeyboardEvent] = useState(false);
    const containerRef = useRef(null);
    const buttonRef = useRef(null);

    const handleMenuButtonClick = useCallback(e => {
        setIsKeyboardEvent(e.detail === 0);
        toggleMenu();
    }, [toggleMenu]);

    const button = useMemo(() => (
        menuButton &&
        React.cloneElement(menuButton,
            { ref: buttonRef, onClick: handleMenuButtonClick })
    ), [menuButton, handleMenuButtonClick]);

    const eventHandlers = useMemo(() => ({
        handleClick(eventValue, isStopPropagation, isKeyEvent) {
            closeMenu();
            if (isKeyEvent) buttonRef.current.focus();
            if (!isStopPropagation) onClick && onClick(eventValue);
        }
    }), [onClick, closeMenu]);

    const handleKeyDown = e => {
        switch (e.keyCode) {
            case keyCodes.ESC:
                closeMenu();
                buttonRef.current.focus();
                break;
        }
    }

    const handleBlur = e => {
        if (!containerRef.current.contains(e.relatedTarget)) {
            closeMenu();
        }
    }

    return (
        <div className={bem(menuContainerClass, null, ['open', isOpen])}
            role="presentation" ref={containerRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}>
            {button}

            <EventHandlersContext.Provider value={eventHandlers}>
                <MenuList
                    isMounted={isMounted}
                    isOpen={isOpen}
                    isKeyboardEvent={isKeyboardEvent}
                    containerRef={containerRef}
                    anchorRef={buttonRef}>
                    {children}
                </MenuList>
            </EventHandlersContext.Provider>
        </div>
    );
});
