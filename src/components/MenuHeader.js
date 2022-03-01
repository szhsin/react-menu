import React, { memo, forwardRef } from 'react';
import { useBEM } from '../hooks';
import { menuClass, menuHeaderClass, stylePropTypes } from '../utils';

export const MenuHeader = memo(
  forwardRef(function MenuHeader({ className, ...restProps }, externalRef) {
    return (
      <li
        role="presentation"
        {...restProps}
        ref={externalRef}
        className={useBEM({ block: menuClass, element: menuHeaderClass, className })}
      />
    );
  })
);

MenuHeader.propTypes = {
  ...stylePropTypes()
};
