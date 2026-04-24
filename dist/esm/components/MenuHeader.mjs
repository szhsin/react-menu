import { memo, forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { roleNone, menuClass, menuHeaderClass } from '../utils/constants.mjs';
import { useBEM } from '../hooks/useBEM.mjs';

const MenuHeader = /*#__PURE__*/memo(/*#__PURE__*/forwardRef(function MenuHeader({
  className,
  ...restProps
}, externalRef) {
  return /*#__PURE__*/jsx("li", {
    role: roleNone,
    ...restProps,
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuHeaderClass,
      className
    })
  });
}));

export { MenuHeader };
