import { memo, forwardRef } from 'react';
import { jsx } from 'react/jsx-runtime';
import { useBEM } from '../hooks/useBEM.js';
import { roleNone, menuClass, menuHeaderClass } from '../utils/constants.js';
import { stylePropTypes } from '../utils/propTypes.js';

const MenuHeader = /*#__PURE__*/memo( /*#__PURE__*/forwardRef(function MenuHeader({
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
process.env.NODE_ENV !== "production" ? MenuHeader.propTypes = {
  ...stylePropTypes()
} : void 0;

export { MenuHeader };
