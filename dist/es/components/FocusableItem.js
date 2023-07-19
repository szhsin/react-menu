import { useRef, useContext, useMemo } from 'react';
import { bool, func } from 'prop-types';
import { jsx } from 'react/jsx-runtime';
import { useItemState } from '../hooks/useItemState.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { useBEM } from '../hooks/useBEM.js';
import { withHovering } from '../utils/withHovering.js';
import { stylePropTypes } from '../utils/propTypes.js';
import { EventHandlersContext, roleMenuitem, menuClass, menuItemClass } from '../utils/constants.js';
import { safeCall, mergeProps, commonProps } from '../utils/utils.js';

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
    setHover,
    onPointerLeave,
    ...restStateProps
  } = useItemState(itemRef, ref, isHovering, isDisabled);
  const {
    handleClose
  } = useContext(EventHandlersContext);
  const modifiers = useMemo(() => ({
    disabled: isDisabled,
    hover: isHovering,
    focusable: true
  }), [isDisabled, isHovering]);
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
process.env.NODE_ENV !== "production" ? FocusableItem.propTypes = {
  ...stylePropTypes(),
  disabled: bool,
  children: func
} : void 0;

export { FocusableItem };
