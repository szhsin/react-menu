import { forwardRef, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { string, number, bool, func, object, oneOf, oneOfType, exact } from 'prop-types';
import { MenuList } from './MenuList';
import { useBEM } from '../hooks';
import {
  rootMenuPropTypes,
  menuContainerClass,
  attachHandlerProps,
  safeCall,
  isMenuOpen,
  getTransition,
  values,
  CloseReason,
  Keys,
  MenuStateMap,
  EventHandlersContext,
  SettingsContext,
  ItemSettingsContext
} from '../utils';

export const ControlledMenu = forwardRef(function ControlledMenu(
  {
    'aria-label': ariaLabel,
    className,
    containerProps,
    initialMounted,
    unmountOnClose,
    transition,
    transitionTimeout,
    boundingBoxRef,
    boundingBoxPadding,
    reposition = 'auto',
    submenuOpenDelay = 300,
    submenuCloseDelay = 150,
    skipOpen,
    viewScroll = 'initial',
    portal,
    theming,
    onItemClick,
    onClose,
    ...restProps
  },
  externalRef
) {
  const containerRef = useRef(null);
  const scrollingRef = useRef(null);
  const anchorScrollingRef = useRef(null);
  const { anchorRef, state } = restProps;

  const settings = useMemo(
    () => ({
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
    }),
    [
      initialMounted,
      unmountOnClose,
      transition,
      transitionTimeout,
      anchorRef,
      boundingBoxRef,
      boundingBoxPadding,
      reposition,
      viewScroll
    ]
  );

  const itemSettings = useMemo(
    () => ({
      submenuOpenDelay,
      submenuCloseDelay
    }),
    [submenuOpenDelay, submenuCloseDelay]
  );

  const eventHandlers = useMemo(
    () => ({
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
    }),
    [onItemClick, onClose]
  );

  const handleKeyDown = ({ key }) => {
    switch (key) {
      case Keys.ESC:
        safeCall(onClose, { key, reason: CloseReason.CANCEL });
        break;
    }
  };

  const handleBlur = (e) => {
    if (isMenuOpen(state) && !e.currentTarget.contains(e.relatedTarget || document.activeElement)) {
      safeCall(onClose, { reason: CloseReason.BLUR });

      // If a user clicks on the menu button when a menu is open, we need to close the menu.
      // However, a blur event will be fired prior to the click event on menu button,
      // which makes the menu first close and then open again.
      // If this happen, e.relatedTarget is incorrectly set to null instead of the button in Safari and Firefox,
      // and makes it difficult to determine whether onBlur is fired because of clicking on menu button.
      // This is a workaround approach which sets a flag to skip a following click event.
      if (skipOpen) {
        skipOpen.current = true;
        setTimeout(() => (skipOpen.current = false), 300);
      }
    }
  };

  const itemTransition = getTransition(transition, 'item');
  const modifiers = useMemo(() => ({ theme: theming, itemTransition }), [theming, itemTransition]);

  const handlers = attachHandlerProps(
    {
      onKeyDown: handleKeyDown,
      onBlur: handleBlur
    },
    containerProps
  );

  const menuList = (
    <div
      {...containerProps}
      {...handlers}
      className={useBEM({
        block: menuContainerClass,
        modifiers,
        className
      })}
      ref={containerRef}
    >
      {state && (
        <SettingsContext.Provider value={settings}>
          <ItemSettingsContext.Provider value={itemSettings}>
            <EventHandlersContext.Provider value={eventHandlers}>
              <MenuList
                {...restProps}
                ariaLabel={ariaLabel || 'Menu'}
                externalRef={externalRef}
                containerRef={containerRef}
                onClose={onClose}
              />
            </EventHandlersContext.Provider>
          </ItemSettingsContext.Provider>
        </SettingsContext.Provider>
      )}
    </div>
  );

  if (portal === true && typeof document !== 'undefined') {
    return createPortal(menuList, document.body);
  } else if (portal) {
    return portal.target
      ? createPortal(menuList, portal.target)
      : portal.stablePosition
      ? null
      : menuList;
  }
  return menuList;
});

ControlledMenu.propTypes /* remove-proptypes */ = {
  ...rootMenuPropTypes,
  state: oneOf(values(MenuStateMap)),
  anchorPoint: exact({
    x: number,
    y: number
  }),
  anchorRef: object,
  skipOpen: object,
  captureFocus: bool,
  menuItemFocus: exact({
    position: oneOfType([string, number]),
    alwaysUpdate: bool
  }),
  onClose: func
};
