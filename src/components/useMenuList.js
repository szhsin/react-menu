import React, { useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useBEM } from '../hooks';
import { MenuList } from './MenuList';
import {
    attachHandlerProps,
    safeCall,
    isMenuOpen,
    getTransition,
    menuContainerClass,
    CloseReason,
    Keys,
    EventHandlersContext,
    SettingsContext,
    ItemSettingsContext
} from '../utils';


export const useMenuList = (
    menuListProps, {
        containerProps = {},
        initialMounted,
        unmountOnClose,
        transition,
        transitionTimeout,
        boundingBoxRef,
        boundingBoxPadding,
        reposition,
        submenuOpenDelay,
        submenuCloseDelay,
        viewScroll,
        portal,
        theming,
        onItemClick,
        onClose,
        skipClick
    }) => {

    const containerRef = useRef(null);
    const scrollingRef = useRef(null);
    const anchorScrollingRef = useRef(null);
    const { anchorRef, state } = menuListProps;

    const settings = useMemo(() => ({
        initialMounted,
        unmountOnClose,
        transition,
        transitionTimeout,
        boundingBoxRef,
        boundingBoxPadding,
        rootMenuRef: containerRef,
        rootAnchorRef: anchorRef,
        scrollingRef,
        anchorScrollingRef,
        reposition,
        viewScroll
    }), [
        initialMounted, unmountOnClose, transition, transitionTimeout,
        anchorRef, boundingBoxRef, boundingBoxPadding, reposition, viewScroll
    ]);

    const itemSettings = useMemo(() => ({
        submenuOpenDelay,
        submenuCloseDelay,
    }), [submenuOpenDelay, submenuCloseDelay]);

    const eventHandlers = useMemo(() => ({
        handleClick(event, isCheckorRadio) {
            if (!event.stopPropagation) safeCall(onItemClick, event);

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
    }), [onItemClick, onClose]);

    const handleKeyDown = ({ key }) => {
        switch (key) {
            case Keys.ESC:
                safeCall(onClose, { key, reason: CloseReason.CANCEL });
                break;
        }
    };

    const handleBlur = e => {
        if (isMenuOpen(state)
            && !e.currentTarget.contains(e.relatedTarget || document.activeElement)) {
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

    const itemTransition = getTransition(transition, 'item');
    const modifiers = useMemo(() => ({ theme: theming, itemTransition }), [theming, itemTransition]);

    const handlers = attachHandlerProps({
        onKeyDown: handleKeyDown,
        onBlur: handleBlur
    }, containerProps);

    const menuList = (
        <div {...containerProps}
            {...handlers}
            className={useBEM({
                block: menuContainerClass,
                modifiers,
                className: containerProps.className
            })}
            ref={containerRef}
        >
            {state &&
                <SettingsContext.Provider value={settings}>
                    <ItemSettingsContext.Provider value={itemSettings}>
                        <EventHandlersContext.Provider value={eventHandlers}>
                            <MenuList {...menuListProps}
                                containerRef={containerRef}
                                onClose={onClose} />
                        </EventHandlersContext.Provider>
                    </ItemSettingsContext.Provider>
                </SettingsContext.Provider>}
        </div>
    );

    if (portal) {
        return ReactDOM.createPortal(menuList, document.body);
    } else {
        return menuList;
    }
}
