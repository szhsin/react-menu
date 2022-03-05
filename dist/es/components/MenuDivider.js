import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { memo, forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { useBEM } from '../hooks/useBEM.js';
import { menuClass, menuDividerClass } from '../utils/constants.js';
import { stylePropTypes } from '../utils/propTypes.js';

var _excluded = ["className"];
var MenuDivider = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function MenuDivider(_ref, externalRef) {
  var className = _ref.className,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/jsx("li", _extends({
    role: "separator"
  }, restProps, {
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuDividerClass,
      className: className
    })
  }));
}));
process.env.NODE_ENV !== "production" ? MenuDivider.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes()) : void 0;

export { MenuDivider };
