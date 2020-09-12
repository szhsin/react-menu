import React, { useMemo } from 'react';
import {
    bem, menuContainerClass,
    EventHandlersContext, SettingsContext,
    FocusPositions, useMenuList
} from '../utils';
import { MenuList } from './MenuList'


export const ContextMenu = React.memo(({
    'aria-label': ariaLabel,
    className,
    styles,
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
        <div className={bem(menuContainerClass, null, { contextMenu: true })()}
            role="presentation" ref={containerRef} {...otherHandlers}>

            <SettingsContext.Provider value={settings}>
                <EventHandlersContext.Provider value={eventHandlers}>
                    <MenuList
                        ariaLabel={ariaLabel || 'Context menu'}
                        className={className}
                        styles={styles}
                        isMounted={true}
                        isOpen={isOpen}
                        menuItemFocus={useMemo(() => isKeyboardEvent
                            ? { position: FocusPositions.FIRST }
                            : { position: FocusPositions.INITIAL },
                            [isKeyboardEvent])}
                        containerRef={containerRef}
                        anchorPoint={anchorPoint}>
                        {children}
                    </MenuList>
                </EventHandlersContext.Provider>
            </SettingsContext.Provider>
        </div>
    );
});
