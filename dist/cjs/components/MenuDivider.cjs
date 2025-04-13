'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var useBEM = require('../hooks/useBEM.cjs');
var constants = require('../utils/constants.cjs');

const MenuDivider = /*#__PURE__*/react.memo(/*#__PURE__*/react.forwardRef(function MenuDivider({
  className,
  ...restProps
}, externalRef) {
  return /*#__PURE__*/jsxRuntime.jsx("li", {
    role: "separator",
    ...restProps,
    ref: externalRef,
    className: useBEM.useBEM({
      block: constants.menuClass,
      element: constants.menuDividerClass,
      className
    })
  });
}));

exports.MenuDivider = MenuDivider;
