import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { memo, forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { useBEM } from '../hooks/useBEM.js';
import { menuClass, menuHeaderClass } from '../utils/constants.js';
import { stylePropTypes } from '../utils/propTypes.js';

var _excluded = ["className"];
var MenuHeader = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function MenuHeader(_ref, externalRef) {
  var className = _ref.className,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  return /*#__PURE__*/jsx("li", _extends({
    role: "presentation"
  }, restProps, {
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuHeaderClass,
      className: className
    })
  }));
}));
process.env.NODE_ENV !== "production" ? MenuHeader.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes()) : void 0;

export { MenuHeader };
