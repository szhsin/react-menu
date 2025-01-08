import { forwardRef, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { oneOf, exact, number, object, bool, oneOfType, string, func } from 'prop-types';
import { MenuList } from './MenuList.js';
import { jsx } from 'react/jsx-runtime';
import { rootMenuPropTypes } from '../utils/propTypes.js';
import { safeCall, values } from '../utils/utils.js';
import { MenuStateMap, Keys, CloseReason, SettingsContext, EventHandlersContext } from '../utils/constants.js';

const ControlledMenu = /*#__PURE__*/forwardRef(function ControlledMenu({
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
  viewScroll = 'initial',
  portal,
  theming,
  onItemClick,
  ...restProps
}, externalRef) {
  const containerRef = useRef(null);
  const scrollNodesRef = useRef({});
  const {
    anchorRef,
    state,
    onClose
  } = restProps;
  const settings = useMemo(() => ({
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
    viewScroll,
    submenuOpenDelay,
    submenuCloseDelay
  }), [initialMounted, unmountOnClose, transition, transitionTimeout, anchorRef, boundingBoxRef, boundingBoxPadding, reposition, viewScroll, submenuOpenDelay, submenuCloseDelay]);
  const eventHandlers = useMemo(() => ({
    handleClick(event, isCheckorRadio) {
      if (!event.stopPropagation) safeCall(onItemClick, event);
      let keepOpen = event.keepOpen;
      if (keepOpen === undefined) {
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
      safeCall(onClose, {
        key,
        reason: CloseReason.CLICK
      });
    }
  }), [onItemClick, onClose]);
  if (!state) return null;
  const menuList = /*#__PURE__*/jsx(SettingsContext.Provider, {
    value: settings,
    children: /*#__PURE__*/jsx(EventHandlersContext.Provider, {
      value: eventHandlers,
      children: /*#__PURE__*/jsx(MenuList, {
        ...restProps,
        ariaLabel: ariaLabel || 'Menu',
        externalRef: externalRef,
        containerRef: containerRef,
        containerProps: {
          className,
          containerRef,
          containerProps,
          theming,
          transition,
          onClose
        }
      })
    })
  });
  if (portal === true && typeof document !== 'undefined') {
    return /*#__PURE__*/createPortal(menuList, document.body);
  } else if (portal) {
    return portal.target ? /*#__PURE__*/createPortal(menuList, portal.target) : portal.stablePosition ? null : menuList;
  }
  return menuList;
});
process.env.NODE_ENV !== "production" ? ControlledMenu.propTypes = {
  ...rootMenuPropTypes,
  state: /*#__PURE__*/oneOf(/*#__PURE__*/values(MenuStateMap)),
  anchorPoint: /*#__PURE__*/exact({
    x: number,
    y: number
  }),
  anchorRef: object,
  captureFocus: bool,
  menuItemFocus: /*#__PURE__*/exact({
    position: /*#__PURE__*/oneOfType([string, number]),
    alwaysUpdate: bool
  }),
  onClose: func
} : void 0;

export { ControlledMenu };
