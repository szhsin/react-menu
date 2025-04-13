'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var useBEM = require('../hooks/useBEM.cjs');
var constants = require('../utils/constants.cjs');

const MenuHeader = /*#__PURE__*/react.memo(/*#__PURE__*/react.forwardRef(function MenuHeader({
  className,
  ...restProps
}, externalRef) {
  return /*#__PURE__*/jsxRuntime.jsx("li", {
    role: constants.roleNone,
    ...restProps,
    ref: externalRef,
    className: useBEM.useBEM({
      block: constants.menuClass,
      element: constants.menuHeaderClass,
      className
    })
  });
}));

exports.MenuHeader = MenuHeader;
