import { useContext, useMemo, useRef } from 'react';
import { bool, func } from 'prop-types';
import { useBEM, useCombinedRef, useItemState } from '../hooks';
import {
  attachHandlerProps,
  commonProps,
  safeCall,
  menuClass,
  menuItemClass,
  stylePropTypes,
  withHovering,
  EventHandlersContext
} from '../utils';

export const FocusableItem = withHovering(
  'FocusableItem',
  function FocusableItem({
    className,
    disabled,
    children,
    isHovering,
    itemRef,
    externalRef,
    ...restProps
  }) {
    const isDisabled = !!disabled;
    const ref = useRef(null);
    const { setHover, onBlur, onPointerMove, onPointerLeave } = useItemState(
      itemRef,
      ref,
      isHovering,
      isDisabled
    );
    const { handleClose } = useContext(EventHandlersContext);

    const modifiers = useMemo(
      () => ({
        disabled: isDisabled,
        hover: isHovering,
        focusable: true
      }),
      [isDisabled, isHovering]
    );

    const renderChildren = useMemo(
      () =>
        safeCall(children, {
          ...modifiers,
          ref,
          closeMenu: handleClose
        }),
      [children, modifiers, handleClose]
    );

    const handlers = attachHandlerProps(
      {
        onPointerMove,
        onPointerLeave: (e) => onPointerLeave(e, true),
        onFocus: setHover,
        onBlur
      },
      restProps
    );

    return (
      <li
        role="menuitem"
        {...restProps}
        {...handlers}
        {...commonProps(isDisabled)}
        ref={useCombinedRef(externalRef, itemRef)}
        className={useBEM({ block: menuClass, element: menuItemClass, modifiers, className })}
      >
        {renderChildren}
      </li>
    );
  }
);

FocusableItem.propTypes = {
  ...stylePropTypes(),
  disabled: bool,
  children: func
};
