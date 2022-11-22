import { forwardRef, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { string, number, bool, func, object, oneOf, oneOfType, exact } from 'prop-types';
import { MenuList } from './MenuList';
import {
  rootMenuPropTypes,
  safeCall,
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
    ...restProps
  },
  externalRef
) {
  const containerRef = useRef(null);
  const scrollNodesRef = useRef({});
  const { anchorRef, state, onClose } = restProps;

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
      scrollNodesRef,
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

  if (!state) return null;

  const menuList = (
    <SettingsContext.Provider value={settings}>
      <ItemSettingsContext.Provider value={itemSettings}>
        <EventHandlersContext.Provider value={eventHandlers}>
          <MenuList
            {...restProps}
            ariaLabel={ariaLabel || 'Menu'}
            externalRef={externalRef}
            containerRef={containerRef}
            containerProps={{
              className,
              containerRef,
              containerProps,
              skipOpen,
              theming,
              transition,
              onClose
            }}
          />
        </EventHandlersContext.Provider>
      </ItemSettingsContext.Provider>
    </SettingsContext.Provider>
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
