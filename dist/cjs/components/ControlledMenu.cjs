'use strict';

var react = require('react');
var reactDom = require('react-dom');
var MenuList = require('./MenuList.cjs');
var jsxRuntime = require('react/jsx-runtime');
var constants = require('../utils/constants.cjs');
var utils = require('../utils/utils.cjs');

const ControlledMenu = /*#__PURE__*/react.forwardRef(function ControlledMenu({
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
  const containerRef = react.useRef(null);
  const scrollNodesRef = react.useRef({});
  const {
    anchorRef,
    state,
    onClose
  } = restProps;
  const settings = react.useMemo(() => ({
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
  const eventHandlers = react.useMemo(() => ({
    handleClick(event, isCheckorRadio) {
      if (!event.stopPropagation) utils.safeCall(onItemClick, event);
      let keepOpen = event.keepOpen;
      if (keepOpen === undefined) {
        keepOpen = isCheckorRadio && event.key === constants.Keys.SPACE;
      }
      if (!keepOpen) {
        utils.safeCall(onClose, {
          value: event.value,
          key: event.key,
          reason: constants.CloseReason.CLICK
        });
      }
    },
    handleClose(key) {
      utils.safeCall(onClose, {
        key,
        reason: constants.CloseReason.CLICK
      });
    }
  }), [onItemClick, onClose]);
  if (!state) return null;
  const menuList = /*#__PURE__*/jsxRuntime.jsx(constants.SettingsContext.Provider, {
    value: settings,
    children: /*#__PURE__*/jsxRuntime.jsx(constants.EventHandlersContext.Provider, {
      value: eventHandlers,
      children: /*#__PURE__*/jsxRuntime.jsx(MenuList.MenuList, {
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
    return /*#__PURE__*/reactDom.createPortal(menuList, document.body);
  } else if (portal) {
    return portal.target ? /*#__PURE__*/reactDom.createPortal(menuList, portal.target) : portal.stablePosition ? null : menuList;
  }
  return menuList;
});

exports.ControlledMenu = ControlledMenu;
