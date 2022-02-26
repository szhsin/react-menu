import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import React, { forwardRef, useMemo } from 'react';
import { bool } from 'prop-types';
import { defineName } from '../utils/utils.js';
import { useBEM } from '../hooks/useBEM.js';
import { menuButtonClass } from '../utils/constants.js';
import { useFlatStyles } from '../hooks/useFlatStyles.js';
import { stylePropTypes } from '../utils/propTypes.js';

var _excluded = ["className", "styles", "isOpen", "disabled", "children"];
var MenuButton = /*#__PURE__*/defineName('MenuButton', /*#__PURE__*/forwardRef(function MenuButton(_ref, ref) {
  var className = _ref.className,
      styles = _ref.styles,
      isOpen = _ref.isOpen,
      disabled = _ref.disabled,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var modifiers = useMemo(function () {
    return Object.freeze({
      open: isOpen
    });
  }, [isOpen]);
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-haspopup": true,
    "aria-expanded": isOpen,
    "aria-disabled": disabled || undefined,
    type: "button",
    disabled: disabled
  }, restProps, {
    ref: ref,
    className: useBEM({
      block: menuButtonClass,
      modifiers: modifiers,
      className: className
    }),
    style: useFlatStyles(styles, modifiers)
  }), children);
}));
process.env.NODE_ENV !== "production" ? MenuButton.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  isOpen: bool,
  disabled: bool
}) : void 0;

export { MenuButton };
