import React, { useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import {
    safeCall,
    bem,
    menuContainerClass,
    CloseReason,
    Keys,
    EventHandlersContext,
    SettingsContext
} from '../utils';
import { MenuList } from './MenuList';


export const useMenuList = (
    menuListProps,
    id,
    animation,
    boundingBoxRef,
    boundingBoxPadding,
    debugging,
    viewScroll,
    portal,
    onClick,
    onClose,
    skipClick) => {

    const containerRef = useRef(null);

    const settings = useMemo(() => ({
        animation,
        boundingBoxRef,
        boundingBoxPadding,
        debugging,
        viewScroll
    }), [animation, boundingBoxRef, boundingBoxPadding, debugging, viewScroll]);

    const eventHandlers = useMemo(() => ({
        handleClick(event, isStopPropagation, isCheckorRadio) {
            if (!isStopPropagation) safeCall(onClick, event);

            let keepOpen = event.keepOpen;
            if (keepOpen === undefined) {
                // if event.keepOpen is undefined, the following default behaviour is used
                // According to WAI-ARIA Authoring Practices 1.1
                // Keep menu open when check or radio is invoked by SPACE key
                keepOpen = isCheckorRadio && event.key === Keys.SPACE;
            }

            if (!keepOpen) {
                safeCall(onClose, {
                    value: event.value,
                    key: event.key,
                    reason: CloseReason.CLICK
                });
            }
        },

        handleClose(key) {
            safeCall(onClose, { key, reason: CloseReason.CLICK });
        }
    }), [onClick, onClose]);

    const handleKeyDown = ({ key }) => {
        switch (key) {
            case Keys.ESC:
                safeCall(onClose, { key, reason: CloseReason.CANCEL });
                break;
        }
    };

    const handleBlur = e => {
        if (menuListProps.isOpen
            && !e.currentTarget.contains(e.relatedTarget || document.activeElement)
            && !debugging) {
            safeCall(onClose, { reason: CloseReason.BLUR });

            // If a user clicks on the menu button when a menu is open, we need to close the menu.
            // However, a blur event will be fired prior to the click event on menu button,
            // which makes the menu first close and then open again.
            // If this happen, e.relatedTarget is incorrectly set to null instead of the button in Safari and Firefox,
            // and makes it difficult to determine whether onBlur is fired because of clicking on menu button.
            // This is a workaround approach which sets a flag to skip a following click event.
            if (skipClick) {
                skipClick.current = true;
                setTimeout(() => skipClick.current = false, 300);
            }
        }
    };

    const menuList = (
        <div id={id}
            className={bem(menuContainerClass)()}
            role="presentation"
            ref={containerRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}>

            <SettingsContext.Provider value={settings}>
                <EventHandlersContext.Provider value={eventHandlers}>
                    <MenuList {...menuListProps}
                        containerRef={containerRef}
                        onClose={onClose} />
                </EventHandlersContext.Provider>
            </SettingsContext.Provider>
        </div>
    );

    if (portal) {
        return ReactDOM.createPortal(menuList, document.body);
    } else {
        return menuList;
    }
}
