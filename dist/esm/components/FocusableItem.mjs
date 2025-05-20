import { useRef, useContext, useMemo } from 'react';
import { jsx } from 'react/jsx-runtime';
import { useItemState } from '../hooks/useItemState.mjs';
import { useBEM } from '../hooks/useBEM.mjs';
import { useCombinedRef } from '../hooks/useCombinedRef.mjs';
import { withHovering } from '../utils/withHovering.mjs';
import { EventHandlersContext, roleMenuitem, menuClass, menuItemClass } from '../utils/constants.mjs';
import { safeCall, mergeProps, commonProps } from '../utils/utils.mjs';

const FocusableItem = /*#__PURE__*/withHovering('FocusableItem', function FocusableItem({
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
  const {
    mouseOver,
    setHover,
    onPointerLeave,
    ...restStateProps
  } = useItemState(itemRef, ref, isHovering, isDisabled);
  const {
    handleClose
  } = useContext(EventHandlersContext);
  const modifiers = useMemo(() => ({
    disabled: isDisabled,
    hover: mouseOver || isHovering,
    focusable: true
  }), [isDisabled, isHovering, mouseOver]);
  const renderChildren = useMemo(() => safeCall(children, {
    ...modifiers,
    ref,
    closeMenu: handleClose
  }), [children, modifiers, handleClose]);
  const mergedProps = mergeProps({
    ...restStateProps,
    onPointerLeave: e => onPointerLeave(e, true),
    onFocus: setHover
  }, restProps);
  return /*#__PURE__*/jsx("li", {
    role: roleMenuitem,
    ...commonProps(isDisabled),
    ...mergedProps,
    ref: useCombinedRef(externalRef, itemRef),
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers,
      className
    }),
    children: renderChildren
  });
});

export { FocusableItem };
