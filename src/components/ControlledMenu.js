import React, { useMemo } from 'react';
import {
    bem, menuContainerClass,
    EventHandlersContext, SettingsContext,
    useMenuList
} from '../utils';
import { MenuList } from './MenuList'


export const ControlledMenu = React.memo(({
    'aria-label': ariaLabel,
    menuItemFocus,
    animation,
    children,
    onClick,
    onClose,
    ...restProps }) => {

    const {
        containerRef,
        settings,
        eventHandlers,
        ...otherHandlers }
        = useMenuList(animation, onClick, onClose);

    return (
        <div className={bem(menuContainerClass, null, { controlled: true })()}
            role="presentation" ref={containerRef} {...otherHandlers}>

            <SettingsContext.Provider value={settings}>
                <EventHandlersContext.Provider value={eventHandlers}>
                    <MenuList
                        {...restProps}
                        ariaLabel={ariaLabel || 'Menu'}
                        isMounted={true}
                        menuItemFocus={useMemo(() =>
                            ({ position: menuItemFocus }), [menuItemFocus])}
                        containerRef={containerRef}>
                        {children}
                    </MenuList>
                </EventHandlersContext.Provider>
            </SettingsContext.Provider>
        </div>
    );
});
