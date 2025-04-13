import { forwardRef, useMemo } from 'react';
import { jsx } from 'react/jsx-runtime';
import { useBEM } from '../hooks/useBEM.mjs';
import { RadioGroupContext, roleNone, menuClass, radioGroupClass } from '../utils/constants.mjs';

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

export { MenuRadioGroup };
