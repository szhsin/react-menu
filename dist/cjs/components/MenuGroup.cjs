'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var useIsomorphicLayoutEffect = require('../hooks/useIsomorphicLayoutEffect.cjs');
var getNormalizedClientRect = require('../positionUtils/getNormalizedClientRect.cjs');
var useBEM = require('../hooks/useBEM.cjs');
var useCombinedRef = require('../hooks/useCombinedRef.cjs');
var constants = require('../utils/constants.cjs');

const MenuGroup = /*#__PURE__*/react.forwardRef(function MenuGroup({
  className,
  style,
  takeOverflow,
  ...restProps
}, externalRef) {
  const ref = react.useRef(null);
  const [overflowStyle, setOverflowStyle] = react.useState();
  const {
    overflow,
    overflowAmt
  } = react.useContext(constants.MenuListContext);
  useIsomorphicLayoutEffect.useLayoutEffect(() => {
    let maxHeight;
    if (takeOverflow && overflowAmt >= 0) {
      maxHeight = getNormalizedClientRect.getNormalizedClientRect(ref.current).height - overflowAmt;
      if (maxHeight < 0) maxHeight = 0;
    }
    setOverflowStyle(maxHeight >= 0 ? {
      maxHeight,
      overflow
    } : undefined);
  }, [takeOverflow, overflow, overflowAmt]);
  useIsomorphicLayoutEffect.useLayoutEffect(() => {
    if (overflowStyle) ref.current.scrollTop = 0;
  }, [overflowStyle]);
  return /*#__PURE__*/jsxRuntime.jsx("div", {
    ...restProps,
    ref: useCombinedRef.useCombinedRef(externalRef, ref),
    className: useBEM.useBEM({
      block: constants.menuClass,
      element: constants.menuGroupClass,
      className
    }),
    style: {
      ...style,
      ...overflowStyle
    }
  });
});

exports.MenuGroup = MenuGroup;
