import React, { forwardRef, useMemo } from 'react';
import { bool } from 'prop-types';
import { useBEM } from '../hooks';
import { defineName, menuButtonClass, stylePropTypes } from '../utils';

export const MenuButton = defineName(
  'MenuButton',
  forwardRef(function MenuButton({ className, isOpen, disabled, children, ...restProps }, ref) {
    const modifiers = useMemo(() => Object.freeze({ open: isOpen }), [isOpen]);

    return (
      <button
        aria-haspopup={true}
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

MenuButton.propTypes = {
  ...stylePropTypes(),
  isOpen: bool,
  disabled: bool
};
