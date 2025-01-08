import { memo, forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { useBEM } from '../hooks/useBEM.js';
import { menuClass, menuDividerClass } from '../utils/constants.js';
import { stylePropTypes } from '../utils/propTypes.js';

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
process.env.NODE_ENV !== "production" ? MenuDivider.propTypes = {
  ...stylePropTypes()
} : void 0;

export { MenuDivider };
