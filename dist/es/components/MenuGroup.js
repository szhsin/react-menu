import { forwardRef, useRef, useState, useContext } from 'react';
import { jsx } from 'react/jsx-runtime';
import { useLayoutEffect as useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect.js';
import { getNormalizedClientRect } from '../positionUtils/getNormalizedClientRect.js';
import { useBEM } from '../hooks/useBEM.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { MenuListContext, menuClass, menuGroupClass } from '../utils/constants.js';

const MenuGroup = /*#__PURE__*/forwardRef(function MenuGroup({
  className,
  style,
  takeOverflow,
  ...restProps
}, externalRef) {
  const ref = useRef(null);
  const [overflowStyle, setOverflowStyle] = useState();
  const {
    overflow,
    overflowAmt
  } = useContext(MenuListContext);
  useIsomorphicLayoutEffect(() => {
    let maxHeight;
    if (takeOverflow && overflowAmt >= 0) {
      maxHeight = getNormalizedClientRect(ref.current).height - overflowAmt;
      if (maxHeight < 0) maxHeight = 0;
    }
    setOverflowStyle(maxHeight >= 0 ? {
      maxHeight,
      overflow
    } : undefined);
  }, [takeOverflow, overflow, overflowAmt]);
  useIsomorphicLayoutEffect(() => {
    if (overflowStyle) ref.current.scrollTop = 0;
  }, [overflowStyle]);
  return /*#__PURE__*/jsx("div", {
    ...restProps,
    ref: useCombinedRef(externalRef, ref),
    className: useBEM({
      block: menuClass,
      element: menuGroupClass,
      className
    }),
    style: {
      ...style,
      ...overflowStyle
    }
  });
});

export { MenuGroup };
