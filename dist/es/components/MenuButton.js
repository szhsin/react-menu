import { extends as _extends, objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose } from '../_virtual/_rollupPluginBabelHelpers.js';
import { forwardRef, useMemo } from 'react';
import { bool } from 'prop-types';
import { jsx } from 'react/jsx-runtime';
import { defineName } from '../utils/utils.js';
import { useBEM } from '../hooks/useBEM.js';
import { stylePropTypes } from '../utils/propTypes.js';
import { menuButtonClass } from '../utils/constants.js';

var _excluded = ["className", "isOpen", "disabled", "children"];
var MenuButton = /*#__PURE__*/defineName('MenuButton', /*#__PURE__*/forwardRef(function MenuButton(_ref, ref) {
  var className = _ref.className,
      isOpen = _ref.isOpen,
      disabled = _ref.disabled,
      children = _ref.children,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var modifiers = useMemo(function () {
    return Object.freeze({
      open: isOpen
    });
  }, [isOpen]);
  return /*#__PURE__*/jsx("button", _extends({
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
    children: children
  }));
}));
process.env.NODE_ENV !== "production" ? MenuButton.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  isOpen: bool,
  disabled: bool
}) : void 0;

export { MenuButton };
