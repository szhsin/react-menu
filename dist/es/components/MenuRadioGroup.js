import { forwardRef, useMemo } from 'react';
import { string, any, func } from 'prop-types';
import { jsx } from 'react/jsx-runtime';
import { useBEM } from '../hooks/useBEM.js';
import { RadioGroupContext, roleNone, menuClass, radioGroupClass } from '../utils/constants.js';
import { stylePropTypes } from '../utils/propTypes.js';

const MenuRadioGroup = /*#__PURE__*/forwardRef(function MenuRadioGroup({
  'aria-label': ariaLabel,
  className,
  name,
  value,
  onRadioChange,
  ...restProps
}, externalRef) {
  const contextValue = useMemo(() => ({
    name,
    value,
    onRadioChange
  }), [name, value, onRadioChange]);
  return /*#__PURE__*/jsx(RadioGroupContext.Provider, {
    value: contextValue,
    children: /*#__PURE__*/jsx("li", {
      role: roleNone,
      children: /*#__PURE__*/jsx("ul", {
        role: "group",
        "aria-label": ariaLabel || name || 'Radio group',
        ...restProps,
        ref: externalRef,
        className: useBEM({
          block: menuClass,
          element: radioGroupClass,
          className
        })
      })
    })
  });
});
process.env.NODE_ENV !== "production" ? MenuRadioGroup.propTypes = {
  ...stylePropTypes(),
  name: string,
  value: any,
  onRadioChange: func
} : void 0;

export { MenuRadioGroup };
