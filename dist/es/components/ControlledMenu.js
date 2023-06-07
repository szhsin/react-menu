import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { forwardRef, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { oneOf, exact, number, object, bool, oneOfType, string, func } from 'prop-types';
import { MenuList } from './MenuList.js';
import { jsx } from 'react/jsx-runtime';
import { SettingsContext, EventHandlersContext, MenuStateMap, Keys, CloseReason } from '../utils/constants.js';
import { rootMenuPropTypes } from '../utils/propTypes.js';
import { safeCall, values } from '../utils/utils.js';

var _excluded = ["aria-label", "className", "containerProps", "initialMounted", "unmountOnClose", "transition", "transitionTimeout", "boundingBoxRef", "boundingBoxPadding", "reposition", "submenuOpenDelay", "submenuCloseDelay", "viewScroll", "portal", "theming", "onItemClick"];
var ControlledMenu = /*#__PURE__*/forwardRef(function ControlledMenu(_ref, externalRef) {
  var ariaLabel = _ref['aria-label'],
    className = _ref.className,
    containerProps = _ref.containerProps,
    initialMounted = _ref.initialMounted,
    unmountOnClose = _ref.unmountOnClose,
    transition = _ref.transition,
    transitionTimeout = _ref.transitionTimeout,
    boundingBoxRef = _ref.boundingBoxRef,
    boundingBoxPadding = _ref.boundingBoxPadding,
    _ref$reposition = _ref.reposition,
    reposition = _ref$reposition === void 0 ? 'auto' : _ref$reposition,
    _ref$submenuOpenDelay = _ref.submenuOpenDelay,
    submenuOpenDelay = _ref$submenuOpenDelay === void 0 ? 300 : _ref$submenuOpenDelay,
    _ref$submenuCloseDela = _ref.submenuCloseDelay,
    submenuCloseDelay = _ref$submenuCloseDela === void 0 ? 150 : _ref$submenuCloseDela,
    _ref$viewScroll = _ref.viewScroll,
    viewScroll = _ref$viewScroll === void 0 ? 'initial' : _ref$viewScroll,
    portal = _ref.portal,
    theming = _ref.theming,
    onItemClick = _ref.onItemClick,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var containerRef = useRef(null);
  var scrollNodesRef = useRef({});
  var anchorRef = restProps.anchorRef,
    state = restProps.state,
    onClose = restProps.onClose;
  var settings = useMemo(function () {
    return {
      initialMounted: initialMounted,
      unmountOnClose: unmountOnClose,
      transition: transition,
      transitionTimeout: transitionTimeout,
      boundingBoxRef: boundingBoxRef,
      boundingBoxPadding: boundingBoxPadding,
      rootMenuRef: containerRef,
      rootAnchorRef: anchorRef,
      scrollNodesRef: scrollNodesRef,
      reposition: reposition,
      viewScroll: viewScroll,
      submenuOpenDelay: submenuOpenDelay,
      submenuCloseDelay: submenuCloseDelay
    };
  }, [initialMounted, unmountOnClose, transition, transitionTimeout, anchorRef, boundingBoxRef, boundingBoxPadding, reposition, viewScroll, submenuOpenDelay, submenuCloseDelay]);
  var eventHandlers = useMemo(function () {
    return {
      handleClick: function handleClick(event, isCheckorRadio) {
        if (!event.stopPropagation) safeCall(onItemClick, event);
        var keepOpen = event.keepOpen;
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
      handleClose: function handleClose(key) {
        safeCall(onClose, {
          key: key,
          reason: CloseReason.CLICK
        });
      }
    };
  }, [onItemClick, onClose]);
  if (!state) return null;
  var menuList = /*#__PURE__*/jsx(SettingsContext.Provider, {
    value: settings,
    children: /*#__PURE__*/jsx(EventHandlersContext.Provider, {
      value: eventHandlers,
      children: /*#__PURE__*/jsx(MenuList, _extends({}, restProps, {
        ariaLabel: ariaLabel || 'Menu',
        externalRef: externalRef,
        containerRef: containerRef,
        containerProps: {
          className: className,
          containerRef: containerRef,
          containerProps: containerProps,
          theming: theming,
          transition: transition,
          onClose: onClose
        }
      }))
    })
  });
  if (portal === true && typeof document !== 'undefined') {
    return /*#__PURE__*/createPortal(menuList, document.body);
  } else if (portal) {
    return portal.target ? /*#__PURE__*/createPortal(menuList, portal.target) : portal.stablePosition ? null : menuList;
  }
  return menuList;
});
process.env.NODE_ENV !== "production" ? ControlledMenu.propTypes = /*#__PURE__*/_extends({}, rootMenuPropTypes, {
  state: /*#__PURE__*/oneOf( /*#__PURE__*/values(MenuStateMap)),
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
}) : void 0;

export { ControlledMenu };
