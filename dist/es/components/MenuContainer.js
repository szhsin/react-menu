import { extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { useMemo } from 'react';
import { jsx } from 'react/jsx-runtime';
import { mergeProps, getTransition, safeCall } from '../utils/utils.js';
import { useBEM } from '../hooks/useBEM.js';
import { menuContainerClass, Keys, CloseReason } from '../utils/constants.js';

var MenuContainer = function MenuContainer(_ref) {
  var className = _ref.className,
    containerRef = _ref.containerRef,
    containerProps = _ref.containerProps,
    children = _ref.children,
    isOpen = _ref.isOpen,
    theming = _ref.theming,
    transition = _ref.transition,
    onClose = _ref.onClose;
  var itemTransition = getTransition(transition, 'item');
  var onKeyDown = function onKeyDown(_ref2) {
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
  var onBlur = function onBlur(e) {
    if (isOpen && !e.currentTarget.contains(e.relatedTarget || document.activeElement)) {
      safeCall(onClose, {
        reason: CloseReason.BLUR
      });
    }
  };
  return /*#__PURE__*/jsx("div", _extends({}, mergeProps({
    onKeyDown: onKeyDown,
    onBlur: onBlur
  }, containerProps), {
    className: useBEM({
      block: menuContainerClass,
      modifiers: useMemo(function () {
        return {
          theme: theming,
          itemTransition: itemTransition
        };
      }, [theming, itemTransition]),
      className: className
    }),
    style: _extends({
      position: 'absolute'
    }, containerProps == null ? void 0 : containerProps.style),
    ref: containerRef,
    children: children
  }));
};

export { MenuContainer };
