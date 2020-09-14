import React, { useRef, useMemo } from 'react';
import {
    safeCall,
    bem,
    menuContainerClass,
    CloseReason,
    KeyCodes,
    EventHandlersContext,
    SettingsContext
} from '../utils';
import { MenuList } from './MenuList';


export const useMenuList = (
    menuListProps,
    animation,
    debugging,
    children,
    onClick,
    onClose) => {

    const containerRef = useRef(null);

    const settings = useMemo(() => ({
        animation,
        debugging
    }), [animation, debugging]);

    const eventHandlers = useMemo(() => ({
        handleClick(event, isStopPropagation, isCheckorRadio) {
            // According to WAI-ARIA Authoring Practices 1.1
            // Keep menu open when check or radio is invoked by SPACE key
            if (!isCheckorRadio || event.keyCode !== KeyCodes.SPACE) {
                safeCall(onClose, { keyCode: event.keyCode, reason: CloseReason.CLICK });
            }

            if (!isStopPropagation) safeCall(onClick, event);
        }
    }), [onClick, onClose]);

    const handleKeyDown = ({ keyCode }) => {
        switch (keyCode) {
            case KeyCodes.ESC:
                safeCall(onClose, { keyCode, reason: CloseReason.CANCEL });
                break;
        }
    };

    const handleBlur = e => {
        if (!e.currentTarget.contains(e.relatedTarget) && !debugging) {
            safeCall(onClose, { reason: CloseReason.BLUR });
        }
    };

    return (
        <div className={bem(menuContainerClass)()}
            role="presentation"
            ref={containerRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}>

            <SettingsContext.Provider value={settings}>
                <EventHandlersContext.Provider value={eventHandlers}>
                    <MenuList {...menuListProps} containerRef={containerRef}>
                        {children}
                    </MenuList>
                </EventHandlersContext.Provider>
            </SettingsContext.Provider>
        </div>
    );
}
