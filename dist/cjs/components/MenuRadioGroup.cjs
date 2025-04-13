'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var useBEM = require('../hooks/useBEM.cjs');
var constants = require('../utils/constants.cjs');

const MenuRadioGroup = /*#__PURE__*/react.forwardRef(function MenuRadioGroup({
  'aria-label': ariaLabel,
  className,
  name,
  value,
  onRadioChange,
  ...restProps
}, externalRef) {
  const contextValue = react.useMemo(() => ({
    name,
    value,
    onRadioChange
  }), [name, value, onRadioChange]);
  return /*#__PURE__*/jsxRuntime.jsx(constants.RadioGroupContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/jsxRuntime.jsx("li", {
      role: constants.roleNone,
      children: /*#__PURE__*/jsxRuntime.jsx("ul", {
        role: "group",
        "aria-label": ariaLabel || name || 'Radio group',
        ...restProps,
        ref: externalRef,
        className: useBEM.useBEM({
          block: constants.menuClass,
          element: constants.radioGroupClass,
          className
        })
      })
    })
  });
});

exports.MenuRadioGroup = MenuRadioGroup;
