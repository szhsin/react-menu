import React, { forwardRef, useContext, useRef, useState } from 'react';
import { bool } from 'prop-types';
import { useBEM, useLayoutEffect, useCombinedRef } from '../hooks';
import { menuClass, menuGroupClass, stylePropTypes, MenuListContext } from '../utils';

export const MenuGroup = forwardRef(function MenuGroup(
  { className, style, takeOverflow, ...restProps },
  externalRef
) {
  const ref = useRef(null);
  const [overflowStyle, setOverflowStyle] = useState();
  const { overflow, overflowAmt } = useContext(MenuListContext);

  useLayoutEffect(() => {
    let maxHeight;
    if (takeOverflow && overflowAmt >= 0) {
      maxHeight = ref.current.getBoundingClientRect().height - overflowAmt;
      if (maxHeight < 0) maxHeight = 0;
    }
    setOverflowStyle(maxHeight >= 0 ? { maxHeight, overflow } : undefined);
  }, [takeOverflow, overflow, overflowAmt]);

  useLayoutEffect(() => {
    if (overflowStyle) ref.current.scrollTop = 0;
  }, [overflowStyle]);

  return (
    <div
      {...restProps}
      ref={useCombinedRef(externalRef, ref)}
      className={useBEM({ block: menuClass, element: menuGroupClass, className })}
      style={{ ...style, ...overflowStyle }}
    />
  );
});

MenuGroup.propTypes = {
  ...stylePropTypes(),
  takeOverflow: bool
};
