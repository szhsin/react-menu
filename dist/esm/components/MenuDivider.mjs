import { memo, forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { useBEM } from '../hooks/useBEM.mjs';
import { menuClass, menuDividerClass } from '../utils/constants.mjs';

const MenuDivider = /*#__PURE__*/memo(/*#__PURE__*/forwardRef(function MenuDivider({
  className,
  ...restProps
}, externalRef) {
  return /*#__PURE__*/jsx("li", {
    role: "separator",
    ...restProps,
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuDividerClass,
      className
    })
  });
}));

export { MenuDivider };
