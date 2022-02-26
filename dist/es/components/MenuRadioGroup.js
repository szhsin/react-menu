import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import React, { forwardRef, useMemo } from 'react';
import { string, any, func } from 'prop-types';
import { useBEM } from '../hooks/useBEM.js';
import { RadioGroupContext, menuClass, radioGroupClass } from '../utils/constants.js';
import { useFlatStyles } from '../hooks/useFlatStyles.js';
import { stylePropTypes } from '../utils/propTypes.js';

var _excluded = ["aria-label", "className", "styles", "name", "value", "onRadioChange"];
var MenuRadioGroup = /*#__PURE__*/forwardRef(function MenuRadioGroup(_ref, externalRef) {
  var ariaLabel = _ref['aria-label'],
      className = _ref.className,
      styles = _ref.styles,
      name = _ref.name,
      value = _ref.value,
      onRadioChange = _ref.onRadioChange,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var contextValue = useMemo(function () {
    return {
      name: name,
      value: value,
      onRadioChange: onRadioChange
    };
  }, [name, value, onRadioChange]);
  return /*#__PURE__*/React.createElement(RadioGroupContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement("li", {
    role: "presentation"
  }, /*#__PURE__*/React.createElement("ul", _extends({
    role: "group",
    "aria-label": ariaLabel || name || 'Radio group'
  }, restProps, {
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: radioGroupClass,
      className: className
    }),
    style: useFlatStyles(styles)
  }))));
});
process.env.NODE_ENV !== "production" ? MenuRadioGroup.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  name: string,
  value: any,
  onRadioChange: func
}) : void 0;

export { MenuRadioGroup };
