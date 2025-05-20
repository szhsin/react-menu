import { useContext, useMemo, useRef } from 'react';
import { useBEM, useCombinedRef, useItemState } from '../hooks';
import {
  mergeProps,
  commonProps,
  safeCall,
  menuClass,
  menuItemClass,
  roleMenuitem,
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
    const { mouseOver, setHover, onPointerLeave, ...restStateProps } = useItemState(
      itemRef,
      ref,
      isHovering,
      isDisabled
    );
    const { handleClose } = useContext(EventHandlersContext);

    const modifiers = useMemo(
      () => ({
        disabled: isDisabled,
        hover: mouseOver || isHovering,
        focusable: true
      }),
      [isDisabled, isHovering, mouseOver]
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

    const mergedProps = mergeProps(
      {
        ...restStateProps,
        onPointerLeave: (e) => onPointerLeave(e, true),
        onFocus: setHover
      },
      restProps
    );

    return (
      <li
        role={roleMenuitem}
        {...commonProps(isDisabled)}
        {...mergedProps}
        ref={useCombinedRef(externalRef, itemRef)}
        className={useBEM({ block: menuClass, element: menuItemClass, modifiers, className })}
      >
        {renderChildren}
      </li>
    );
  }
);
