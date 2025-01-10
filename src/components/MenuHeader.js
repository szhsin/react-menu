import { memo, forwardRef } from 'react';
import { useBEM } from '../hooks';
import { menuClass, menuHeaderClass, roleNone } from '../utils';

export const MenuHeader = memo(
  forwardRef(function MenuHeader({ className, ...restProps }, externalRef) {
    return (
      <li
        role={roleNone}
        {...restProps}
        ref={externalRef}
        className={useBEM({ block: menuClass, element: menuHeaderClass, className })}
      />
    );
  })
);
