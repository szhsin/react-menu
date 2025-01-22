import { memo, forwardRef } from 'react';
import { useBEM } from '../hooks';
import { menuClass, menuDividerClass } from '../utils';

export const MenuDivider = memo(
  forwardRef(function MenuDivider({ className, ...restProps }, externalRef) {
    return (
      <li
        role="separator"
        {...restProps}
        ref={externalRef}
        className={useBEM({ block: menuClass, element: menuDividerClass, className })}
      />
    );
  })
);
