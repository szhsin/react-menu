import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import React, { forwardRef, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { oneOf, exact, number, object, bool, oneOfType, string, func } from 'prop-types';
import { MenuList } from './MenuList.js';
import { useBEM } from '../hooks/useBEM.js';
import { CloseReason, menuContainerClass, SettingsContext, ItemSettingsContext, EventHandlersContext, MenuStateMap, Keys } from '../utils/constants.js';
import { rootMenuPropTypes, rootMenuDefaultProps } from '../utils/propTypes.js';
import { safeCall, attachHandlerProps, values, getTransition, isMenuOpen } from '../utils/utils.js';

var _excluded = ["aria-label", "className", "containerProps", "initialMounted", "unmountOnClose", "transition", "transitionTimeout", "boundingBoxRef", "boundingBoxPadding", "reposition", "submenuOpenDelay", "submenuCloseDelay", "skipOpen", "viewScroll", "portal", "theming", "onItemClick", "onClose"];
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
      reposition = _ref.reposition,
      submenuOpenDelay = _ref.submenuOpenDelay,
      submenuCloseDelay = _ref.submenuCloseDelay,
      skipOpen = _ref.skipOpen,
      viewScroll = _ref.viewScroll,
      portal = _ref.portal,
      theming = _ref.theming,
      onItemClick = _ref.onItemClick,
      onClose = _ref.onClose,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var containerRef = useRef(null);
  var scrollingRef = useRef(null);
  var anchorScrollingRef = useRef(null);
  var anchorRef = restProps.anchorRef,
      state = restProps.state;
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
      scrollingRef: scrollingRef,
      anchorScrollingRef: anchorScrollingRef,
      reposition: reposition,
      viewScroll: viewScroll
    };
  }, [initialMounted, unmountOnClose, transition, transitionTimeout, anchorRef, boundingBoxRef, boundingBoxPadding, reposition, viewScroll]);
  var itemSettings = useMemo(function () {
    return {
      submenuOpenDelay: submenuOpenDelay,
      submenuCloseDelay: submenuCloseDelay
    };
  }, [submenuOpenDelay, submenuCloseDelay]);
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

  var handleKeyDown = function handleKeyDown(_ref2) {
    var key = _ref2.key;

    switch (key) {
      case Keys.ESC:
        safeCall(onClose, {
          key: key,
          reason: CloseReason.CANCEL
        });
        break;
    }
  };

  var handleBlur = function handleBlur(e) {
    if (isMenuOpen(state) && !e.currentTarget.contains(e.relatedTarget || document.activeElement)) {
      safeCall(onClose, {
        reason: CloseReason.BLUR
      });

      if (skipOpen) {
        skipOpen.current = true;
        setTimeout(function () {
          return skipOpen.current = false;
        }, 300);
      }
    }
  };

  var itemTransition = getTransition(transition, 'item');
  var modifiers = useMemo(function () {
    return {
      theme: theming,
      itemTransition: itemTransition
    };
  }, [theming, itemTransition]);
  var handlers = attachHandlerProps({
    onKeyDown: handleKeyDown,
    onBlur: handleBlur
  }, containerProps);
  var menuList = /*#__PURE__*/React.createElement("div", _extends({}, containerProps, handlers, {
    className: useBEM({
      block: menuContainerClass,
      modifiers: modifiers,
      className: className
    }),
    ref: containerRef
  }), state && /*#__PURE__*/React.createElement(SettingsContext.Provider, {
    value: settings
  }, /*#__PURE__*/React.createElement(ItemSettingsContext.Provider, {
    value: itemSettings
  }, /*#__PURE__*/React.createElement(EventHandlersContext.Provider, {
    value: eventHandlers
  }, /*#__PURE__*/React.createElement(MenuList, _extends({}, restProps, {
    ariaLabel: ariaLabel || 'Menu',
    externalRef: externalRef,
    containerRef: containerRef,
    onClose: onClose
  }))))));

  if (portal) {
    return /*#__PURE__*/createPortal(menuList, document.body);
  } else {
    return menuList;
  }
});
process.env.NODE_ENV !== "production" ? ControlledMenu.propTypes = /*#__PURE__*/_extends({}, rootMenuPropTypes, {
  state: /*#__PURE__*/oneOf( /*#__PURE__*/values(MenuStateMap)),
  anchorPoint: /*#__PURE__*/exact({
    x: number,
    y: number
  }),
  anchorRef: object,
  skipOpen: object,
  captureFocus: bool,
  captureInitialMouseFocus: bool,
  menuItemFocus: /*#__PURE__*/exact({
    position: /*#__PURE__*/oneOfType([string, number]),
    alwaysUpdate: bool
  }),
  onClose: func
}) : void 0;
ControlledMenu.defaultProps = /*#__PURE__*/_extends({}, rootMenuDefaultProps, {
  menuItemFocus: {}
});

export { ControlledMenu };
