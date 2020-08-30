import React, { useState, useCallback, useRef, useMemo } from 'react';
import './styles/index.scss';
import { bem, menuContainerClass, keyCodes, EventHandlersContext } from '../utils';
import { MenuList } from './MenuList'

export const Menu = React.memo(({ menuButton, children, onClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const containerRef = useRef(null);
    const buttonRef = useRef(null);

    const handleMenuButtonClick = useCallback(e => {
        setIsOpen(o => !o);
    }, []);

    const button = useMemo(() => (
        menuButton &&
        React.cloneElement(menuButton,
            { ref: buttonRef, onClick: handleMenuButtonClick })
    ), [menuButton, handleMenuButtonClick]);

    const eventHandlers = useMemo(() => ({
        handleClick(eventValue, isStopPropagation, isKeyEvent) {
            if (!isStopPropagation) onClick && onClick(eventValue);
            setIsOpen(false);
            if (isKeyEvent) buttonRef.current.focus();
        }
    }), [onClick]);

    const handleKeyDown = e => {
        switch (e.keyCode) {
            case keyCodes.ESC:
                setIsOpen(false);
                buttonRef.current.focus();
                break;
        }
    }

    const handleBlur = e => {
        if (!containerRef.current.contains(e.relatedTarget)) {
            setIsOpen(false);
        }
    }

    return (
        <div className={bem(menuContainerClass, null, ['open', isOpen])}
            role="presentation" ref={containerRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}>
            {button}

            <EventHandlersContext.Provider value={eventHandlers}>
                <MenuList isOpen={isOpen} containerRef={containerRef}
                    anchorRef={buttonRef}>
                    {children}
                </MenuList>
            </EventHandlersContext.Provider>
        </div>
    );
});
