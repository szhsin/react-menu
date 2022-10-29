import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { forwardRef, useRef, useState, useContext } from 'react';
import { bool } from 'prop-types';
import { jsx } from 'react/jsx-runtime';
import { useLayoutEffect as useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { useBEM } from '../hooks/useBEM.js';
import { MenuListContext, menuClass, menuGroupClass } from '../utils/constants.js';
import { stylePropTypes } from '../utils/propTypes.js';

var _excluded = ["className", "style", "takeOverflow"];
var MenuGroup = /*#__PURE__*/forwardRef(function MenuGroup(_ref, externalRef) {
  var className = _ref.className,
    style = _ref.style,
    takeOverflow = _ref.takeOverflow,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var ref = useRef(null);
  var _useState = useState(),
    overflowStyle = _useState[0],
    setOverflowStyle = _useState[1];
  var _useContext = useContext(MenuListContext),
    overflow = _useContext.overflow,
    overflowAmt = _useContext.overflowAmt;
  useIsomorphicLayoutEffect(function () {
    var maxHeight;
    if (takeOverflow && overflowAmt >= 0) {
      maxHeight = ref.current.getBoundingClientRect().height - overflowAmt;
      if (maxHeight < 0) maxHeight = 0;
    }
    setOverflowStyle(maxHeight >= 0 ? {
      maxHeight: maxHeight,
      overflow: overflow
    } : undefined);
  }, [takeOverflow, overflow, overflowAmt]);
  useIsomorphicLayoutEffect(function () {
    if (overflowStyle) ref.current.scrollTop = 0;
  }, [overflowStyle]);
  return /*#__PURE__*/jsx("div", _extends({}, restProps, {
    ref: useCombinedRef(externalRef, ref),
    className: useBEM({
      block: menuClass,
      element: menuGroupClass,
      className: className
    }),
    style: _extends({}, style, overflowStyle)
  }));
});
process.env.NODE_ENV !== "production" ? MenuGroup.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  takeOverflow: bool
}) : void 0;

export { MenuGroup };
