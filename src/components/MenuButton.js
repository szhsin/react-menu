import { forwardRef, useMemo } from 'react';
import { useBEM } from '../hooks';
import { defineName, menuButtonClass } from '../utils';

export const MenuButton = defineName(
  'MenuButton',
  forwardRef(function MenuButton({ className, isOpen, disabled, children, ...restProps }, ref) {
    const modifiers = useMemo(() => ({ open: isOpen }), [isOpen]);

    return (
      <button
        aria-haspopup
        aria-expanded={isOpen}
        aria-disabled={disabled || undefined}
        type="button"
        disabled={disabled}
        {...restProps}
        ref={ref}
        className={useBEM({ block: menuButtonClass, modifiers, className })}
      >
        {children}
      </button>
    );
  })
);
