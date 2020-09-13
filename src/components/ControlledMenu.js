import React from 'react';
import PropTypes from 'prop-types';
import {
    bem,
    menuContainerClass,
    menuPropTypesBase,
    EventHandlersContext,
    SettingsContext,
    FocusPositions,
    useMenuList,
} from '../utils';
import { MenuList } from './MenuList'


export const ControlledMenu = React.memo(function ControlledMenu({
    'aria-label': ariaLabel,
    className,
    styles,
    animation,
    anchorPoint,
    anchorRef,
    align,
    direction,
    isMounted,
    isOpen,
    menuItemFocus,
    children,
    onClick,
    onClose,
    ...restProps }) {

    const {
        containerRef,
        settings,
        eventHandlers,
        ...otherHandlers
    } = useMenuList(animation, onClick, onClose);

    return (
        <div className={bem(menuContainerClass, null, { controlled: true })()}
            role="presentation" ref={containerRef} {...otherHandlers}>

            <SettingsContext.Provider value={settings}>
                <EventHandlersContext.Provider value={eventHandlers}>
                    <MenuList
                        {...restProps} // restProps for passing through client code defined event handlers
                        ariaLabel={ariaLabel || 'Menu'}
                        className={className}
                        styles={styles}
                        anchorPoint={anchorPoint}
                        anchorRef={anchorRef}
                        containerRef={containerRef}
                        align={align}
                        direction={direction}
                        isOpen={isOpen}
                        isMounted={isMounted}
                        menuItemFocus={menuItemFocus}>
                        {children}
                    </MenuList>
                </EventHandlersContext.Provider>
            </SettingsContext.Provider>
        </div>
    );
});

ControlledMenu.propTypes = {
    ...menuPropTypesBase,
    anchorPoint: PropTypes.exact({
        x: PropTypes.number,
        y: PropTypes.number
    }),
    anchorRef: PropTypes.object,
    isOpen: PropTypes.bool,
    isMounted: PropTypes.bool,
    menuItemFocus: PropTypes.exact({
        position: PropTypes.number
    }),
    onClose: PropTypes.func
};

ControlledMenu.defaultProps = {
    animation: true,
    isMounted: true,
    menuItemFocus: { position: FocusPositions.INITIAL }
};
