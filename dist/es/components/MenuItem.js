import { useContext, useMemo } from 'react';
import { jsx } from 'react/jsx-runtime';
import { useItemState } from '../hooks/useItemState.js';
import { EventHandlersContext, RadioGroupContext, menuClass, menuItemClass, roleNone, roleMenuitem, Keys } from '../utils/constants.js';
import { useBEM } from '../hooks/useBEM.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { withHovering } from '../utils/withHovering.js';
import { mergeProps, safeCall, commonProps } from '../utils/utils.js';

const MenuItem = /*#__PURE__*/withHovering('MenuItem', function MenuItem({
  className,
  value,
  href,
  type,
  checked,
  disabled,
  children,
  onClick,
  isHovering,
  itemRef,
  externalRef,
  ...restProps
}) {
  const isDisabled = !!disabled;
  const {
    setHover,
    ...restStateProps
  } = useItemState(itemRef, itemRef, isHovering, isDisabled);
  const eventHandlers = useContext(EventHandlersContext);
  const radioGroup = useContext(RadioGroupContext);
  const isRadio = type === 'radio';
  const isCheckBox = type === 'checkbox';
  const isAnchor = !!href && !isDisabled && !isRadio && !isCheckBox;
  const isChecked = isRadio ? radioGroup.value === value : isCheckBox ? !!checked : false;
  const handleClick = e => {
    if (isDisabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }
    const event = {
      value,
      syntheticEvent: e
    };
    if (e.key !== undefined) event.key = e.key;
    if (isCheckBox) event.checked = !isChecked;
    if (isRadio) event.name = radioGroup.name;
    safeCall(onClick, event);
    if (isRadio) safeCall(radioGroup.onRadioChange, event);
    eventHandlers.handleClick(event, isCheckBox || isRadio);
  };
  const handleKeyDown = e => {
    if (!isHovering) return;
    switch (e.key) {
      case Keys.ENTER:
        e.preventDefault();
      case Keys.SPACE:
        isAnchor ? itemRef.current.click() : handleClick(e);
    }
  };
  const modifiers = useMemo(() => ({
    type,
    disabled: isDisabled,
    hover: isHovering,
    checked: isChecked,
    anchor: isAnchor
  }), [type, isDisabled, isHovering, isChecked, isAnchor]);
  const mergedProps = mergeProps({
    ...restStateProps,
    onPointerDown: setHover,
    onKeyDown: handleKeyDown,
    onClick: handleClick
  }, restProps);
  const menuItemProps = {
    role: isRadio ? 'menuitemradio' : isCheckBox ? 'menuitemcheckbox' : roleMenuitem,
    'aria-checked': isRadio || isCheckBox ? isChecked : undefined,
    ...commonProps(isDisabled, isHovering),
    ...mergedProps,
    ref: useCombinedRef(externalRef, itemRef),
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers,
      className
    }),
    children: useMemo(() => safeCall(children, modifiers), [children, modifiers])
  };
  return isAnchor ? /*#__PURE__*/jsx("li", {
    role: roleNone,
    children: /*#__PURE__*/jsx("a", {
      href: href,
      ...menuItemProps
    })
  }) : /*#__PURE__*/jsx("li", {
    ...menuItemProps
  });
});

export { MenuItem };
