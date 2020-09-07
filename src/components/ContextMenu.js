import React from 'react';
import {
    bem, menuContainerClass,
    EventHandlersContext, SettingsContext,
    useMenuList
} from '../utils';
import { MenuList } from './MenuList'


export const ContextMenu = React.memo(({
    anchorPoint,
    isOpen,
    isKeyboardEvent,
    animation,
    children,
    onClick,
    onClose }) => {

    const {
        containerRef,
        settings,
        eventHandlers,
        ...otherHandlers }
        = useMenuList(animation, onClick, onClose);

    return (
        <div className={bem(menuContainerClass, null, ['context-menu', true])}
            role="presentation" ref={containerRef} {...otherHandlers}>

            <SettingsContext.Provider value={settings}>
                <EventHandlersContext.Provider value={eventHandlers}>
                    <MenuList
                        isMounted={true}
                        isOpen={isOpen}
                        isKeyboardEvent={isKeyboardEvent}
                        containerRef={containerRef}
                        anchorPoint={anchorPoint}>
                        {children}
                    </MenuList>
                </EventHandlersContext.Provider>
            </SettingsContext.Provider>
        </div>
    );
});
