import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import React, { forwardRef, useRef, useState, useContext } from 'react';
import { bool } from 'prop-types';
import { useLayoutEffect as useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { useBEM } from '../hooks/useBEM.js';
import { MenuListContext, menuClass, menuGroupClass } from '../utils/constants.js';
import { useFlatStyles } from '../hooks/useFlatStyles.js';
import { defineName } from '../utils/utils.js';
import { stylePropTypes } from '../utils/propTypes.js';

var _excluded = ["className", "styles", "takeOverflow"];
var MenuGroup = /*#__PURE__*/defineName( /*#__PURE__*/forwardRef(function MenuGroup(_ref, externalRef) {
  var className = _ref.className,
      styles = _ref.styles,
      takeOverflow = _ref.takeOverflow,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var ref = useRef(null);

  var _useState = useState(),
      overflowStyles = _useState[0],
      setOverflowStyles = _useState[1];

  var _useContext = useContext(MenuListContext),
      overflow = _useContext.overflow,
      overflowAmt = _useContext.overflowAmt;

  useIsomorphicLayoutEffect(function () {
    var maxHeight;

    if (takeOverflow && overflowAmt >= 0) {
      maxHeight = ref.current.getBoundingClientRect().height - overflowAmt;
      if (maxHeight < 0) maxHeight = 0;
    }

    setOverflowStyles(maxHeight >= 0 ? {
      maxHeight: maxHeight,
      overflow: overflow
    } : undefined);
  }, [takeOverflow, overflow, overflowAmt]);
  useIsomorphicLayoutEffect(function () {
    if (overflowStyles) ref.current.scrollTop = 0;
  }, [overflowStyles]);
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    ref: useCombinedRef(externalRef, ref),
    className: useBEM({
      block: menuClass,
      element: menuGroupClass,
      className: className
    }),
    style: _extends({}, useFlatStyles(styles), overflowStyles)
  }));
}), 'MenuGroup');
MenuGroup.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  takeOverflow: bool
});

export { MenuGroup };
