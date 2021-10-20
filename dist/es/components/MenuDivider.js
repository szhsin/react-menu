import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import React, { memo, forwardRef } from 'react';
import { useBEM } from '../hooks/useBEM.js';
import { menuClass, menuDividerClass } from '../utils/constants.js';
import { useFlatStyles } from '../hooks/useFlatStyles.js';
import { stylePropTypes } from '../utils/propTypes.js';

var _excluded = ["className", "styles"];
var MenuDivider = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function MenuDivider(_ref, externalRef) {
  var className = _ref.className,
      styles = _ref.styles,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/React.createElement("li", _extends({
    role: "separator"
  }, restProps, {
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuDividerClass,
      className: className
    }),
    style: useFlatStyles(styles)
  }));
}));
MenuDivider.propTypes = _extends({}, stylePropTypes());

export { MenuDivider };
