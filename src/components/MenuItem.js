import React, { useContext, useMemo } from 'react';
import { any, string, bool, func, node, oneOf, oneOfType } from 'prop-types';
import { useBEM, useActiveState, useItemState, useCombinedRef } from '../hooks';
import {
  attachHandlerProps,
  commonProps,
  safeCall,
  stylePropTypes,
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
    const { setHover, onBlur, onMouseMove, onMouseLeave } = useItemState(
      itemRef,
      itemRef,
      isHovering,
      isDisabled
    );
    const eventHandlers = useContext(EventHandlersContext);
    const radioGroup = useContext(RadioGroupContext);
    const {
      isActive,
      onKeyUp,
      onBlur: activeStateBlur,
      ...activeStateHandlers
    } = useActiveState(isHovering, isDisabled);
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

    const handleKeyUp = (e) => {
      // Check 'isActive' to skip KeyUp when corresponding KeyDown was initiated in another menu item
      if (!isActive) return;

      onKeyUp(e);
      switch (e.key) {
        case Keys.ENTER:
        case Keys.SPACE:
          if (isAnchor) {
            itemRef.current.click();
          } else {
            handleClick(e);
          }
          break;
      }
    };

    const handleBlur = (e) => {
      activeStateBlur(e);
      onBlur(e);
    };

    const modifiers = useMemo(
      () =>
        Object.freeze({
          type,
          disabled: isDisabled,
          hover: isHovering,
          active: isActive,
          checked: isChecked,
          anchor: isAnchor
        }),
      [type, isDisabled, isHovering, isActive, isChecked, isAnchor]
    );

    const handlers = attachHandlerProps(
      {
        ...activeStateHandlers,
        onMouseMove,
        onMouseLeave,
        onMouseDown: setHover,
        onKeyUp: handleKeyUp,
        onBlur: handleBlur,
        onClick: handleClick
      },
      restProps
    );

    // Order of props overriding (same in all components):
    // 1. Preset props adhering to WAI-ARIA Authoring Practices.
    // 2. restProps(consuming code overriding)
    // 3. handlers (with consuming code handlers hooked)
    // 4. ref, className
    const menuItemProps = {
      role: isRadio ? 'menuitemradio' : isCheckBox ? 'menuitemcheckbox' : 'menuitem',
      'aria-checked': isRadio || isCheckBox ? isChecked : undefined,
      ...commonProps(isDisabled, isHovering),
      ...restProps,
      ...handlers,
      ref: useCombinedRef(externalRef, itemRef),
      className: useBEM({ block: menuClass, element: menuItemClass, modifiers, className })
    };

    const renderChildren = useMemo(() => safeCall(children, modifiers), [children, modifiers]);

    if (isAnchor) {
      return (
        <li role="presentation">
          <a {...menuItemProps} href={href}>
            {renderChildren}
          </a>
        </li>
      );
    } else {
      return <li {...menuItemProps}>{renderChildren}</li>;
    }
  }
);

MenuItem.propTypes = {
  ...stylePropTypes(),
  value: any,
  href: string,
  type: oneOf(['checkbox', 'radio']),
  checked: bool,
  disabled: bool,
  children: oneOfType([node, func]),
  onClick: func
};
