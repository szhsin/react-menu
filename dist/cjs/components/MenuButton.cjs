'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var utils = require('../utils/utils.cjs');
var useBEM = require('../hooks/useBEM.cjs');
var constants = require('../utils/constants.cjs');

const MenuButton = /*#__PURE__*/utils.defineName('MenuButton', /*#__PURE__*/react.forwardRef(function MenuButton({
  className,
  isOpen,
  disabled,
  children,
  ...restProps
}, ref) {
  const modifiers = react.useMemo(() => ({
    open: isOpen
  }), [isOpen]);
  return /*#__PURE__*/jsxRuntime.jsx("button", {
    "aria-haspopup": true,
    "aria-expanded": isOpen,
    "aria-disabled": disabled || undefined,
    type: "button",
    disabled: disabled,
    ...restProps,
    ref: ref,
    className: useBEM.useBEM({
      block: constants.menuButtonClass,
      modifiers,
      className
    }),
    children: children
  });
}));

exports.MenuButton = MenuButton;
