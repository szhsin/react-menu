import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import React, { memo, forwardRef } from 'react';
import { useBEM } from '../hooks/useBEM.js';
import { menuClass, menuHeaderClass } from '../utils/constants.js';
import { useFlatStyles } from '../hooks/useFlatStyles.js';
import { stylePropTypes } from '../utils/propTypes.js';

var _excluded = ["className", "styles"];
var MenuHeader = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function MenuHeader(_ref, externalRef) {
  var className = _ref.className,
      styles = _ref.styles,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/React.createElement("li", _extends({
    role: "presentation"
  }, restProps, {
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuHeaderClass,
      className: className
    }),
    style: useFlatStyles(styles)
  }));
}));
MenuHeader.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes());

export { MenuHeader };
