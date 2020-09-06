import React from 'react';
import {
    bem, menuContainerClass, EventHandlersContext,
    useMenuList
} from '../utils';
import { MenuList } from './MenuList'


export const ContextMenu = React.memo(({
    anchorPoint,
    isOpen,
    isKeyboardEvent,
    children,
    onClick,
    onClose }) => {

    const { containerRef, eventHandlers, ...otherHandlers } = useMenuList(onClick, onClose);

    return (
        <div className={bem(menuContainerClass, null, ['context-menu', true])}
            role="presentation" ref={containerRef} {...otherHandlers}>

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
        </div>
    );
});
