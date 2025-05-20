import { useContext, useMemo } from 'react';
import { useBEM, useItemState, useCombinedRef } from '../hooks';
import {
  mergeProps,
  commonProps,
  roleNone,
  roleMenuitem,
  safeCall,
  menuClass,
  menuItemClass,
  withHovering,
  EventHandlersContext,
  RadioGroupContext,
  Keys
} from '../utils';

export const MenuItem = withHovering(
  'MenuItem',
  function MenuItem({
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
    const { mouseOver, setHover, ...restStateProps } = useItemState(
      itemRef,
      itemRef,
      isHovering,
      isDisabled
    );
    const eventHandlers = useContext(EventHandlersContext);
    const radioGroup = useContext(RadioGroupContext);
    const isRadio = type === 'radio';
    const isCheckBox = type === 'checkbox';
    const isAnchor = !!href && !isDisabled && !isRadio && !isCheckBox;
    const isChecked = isRadio ? radioGroup.value === value : isCheckBox ? !!checked : false;

    const handleClick = (e) => {
      if (isDisabled) {
        e.stopPropagation();
        e.preventDefault();
        return;
      }

      const event = { value, syntheticEvent: e };
      if (e.key !== undefined) event.key = e.key;
      if (isCheckBox) event.checked = !isChecked;
      if (isRadio) event.name = radioGroup.name;
      safeCall(onClick, event);
      if (isRadio) safeCall(radioGroup.onRadioChange, event);
      eventHandlers.handleClick(event, isCheckBox || isRadio);
    };

    const handleKeyDown = (e) => {
      if (!isHovering) return;

      switch (e.key) {
        case Keys.ENTER:
          e.preventDefault(); // eslint-disable-next-line no-fallthrough
        case Keys.SPACE:
          isAnchor ? itemRef.current.click() : handleClick(e);
      }
    };

    const modifiers = useMemo(
      () => ({
        type,
        disabled: isDisabled,
        hover: mouseOver || isHovering,
        checked: isChecked,
        anchor: isAnchor
      }),
      [type, isDisabled, mouseOver, isHovering, isChecked, isAnchor]
    );

    const mergedProps = mergeProps(
      {
        ...restStateProps,
        onPointerDown: setHover,
        onKeyDown: handleKeyDown,
        onClick: handleClick
      },
      restProps
    );

    // Order of props overriding (same in all components):
    // 1. Preset props adhering to WAI-ARIA Authoring Practices.
    // 2. Merged outer and local props
    // 3. ref, className
    const menuItemProps = {
      role: isRadio ? 'menuitemradio' : isCheckBox ? 'menuitemcheckbox' : roleMenuitem,
      'aria-checked': isRadio || isCheckBox ? isChecked : undefined,
      ...commonProps(isDisabled, isHovering),
      ...mergedProps,
      ref: useCombinedRef(externalRef, itemRef),
      className: useBEM({ block: menuClass, element: menuItemClass, modifiers, className }),
      children: useMemo(() => safeCall(children, modifiers), [children, modifiers])
    };

    return isAnchor ? (
      <li role={roleNone}>
        <a href={href} {...menuItemProps} />
      </li>
    ) : (
      <li {...menuItemProps} />
    );
  }
);
