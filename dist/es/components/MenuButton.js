import { forwardRef, useMemo } from 'react';
import { jsx } from 'react/jsx-runtime';
import { defineName } from '../utils/utils.js';
import { useBEM } from '../hooks/useBEM.js';
import { menuButtonClass } from '../utils/constants.js';

const MenuButton = /*#__PURE__*/defineName('MenuButton', /*#__PURE__*/forwardRef(function MenuButton({
  className,
  isOpen,
  disabled,
  children,
  ...restProps
}, ref) {
  const modifiers = useMemo(() => ({
    open: isOpen
  }), [isOpen]);
  return /*#__PURE__*/jsx("button", {
    "aria-haspopup": true,
    "aria-expanded": isOpen,
    "aria-disabled": disabled || undefined,
    type: "button",
    disabled: disabled,
    ...restProps,
    ref: ref,
    className: useBEM({
      block: menuButtonClass,
      modifiers,
      className
    }),
    children: children
  });
}));

export { MenuButton };
