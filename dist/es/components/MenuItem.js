import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import React, { useContext, useMemo } from 'react';
import { any, string, oneOf, bool, oneOfType, node, func } from 'prop-types';
import { withHovering } from '../utils/withHovering.js';
import { useItemState } from '../hooks/useItemState.js';
import { EventHandlersContext, RadioGroupContext, menuClass, menuItemClass, Keys } from '../utils/constants.js';
import { useActiveState } from '../hooks/useActiveState.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { useBEM } from '../hooks/useBEM.js';
import { useFlatStyles } from '../hooks/useFlatStyles.js';
import { attachHandlerProps, commonProps, safeCall } from '../utils/utils.js';
import { stylePropTypes } from '../utils/propTypes.js';

var _excluded = ["className", "styles", "value", "href", "type", "checked", "disabled", "children", "onClick", "isHovering", "itemRef", "externalRef"],
    _excluded2 = ["isActive", "onKeyUp", "onBlur"];
var MenuItem = /*#__PURE__*/withHovering('MenuItem', function MenuItem(_ref) {
  var className = _ref.className,
      styles = _ref.styles,
      value = _ref.value,
      href = _ref.href,
      type = _ref.type,
      checked = _ref.checked,
      disabled = _ref.disabled,
      children = _ref.children,
      onClick = _ref.onClick,
      isHovering = _ref.isHovering,
      itemRef = _ref.itemRef,
      externalRef = _ref.externalRef,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var isDisabled = !!disabled;

  var _useItemState = useItemState(itemRef, itemRef, isHovering, isDisabled),
      setHover = _useItemState.setHover,
      onBlur = _useItemState.onBlur,
      onMouseMove = _useItemState.onMouseMove,
      onMouseLeave = _useItemState.onMouseLeave;

  var eventHandlers = useContext(EventHandlersContext);
  var radioGroup = useContext(RadioGroupContext);

  var _useActiveState = useActiveState(isHovering, isDisabled),
      isActive = _useActiveState.isActive,
      onKeyUp = _useActiveState.onKeyUp,
      activeStateBlur = _useActiveState.onBlur,
      activeStateHandlers = _objectWithoutPropertiesLoose(_useActiveState, _excluded2);

  var isRadio = type === 'radio';
  var isCheckBox = type === 'checkbox';
  var isAnchor = !!href && !isDisabled && !isRadio && !isCheckBox;
  var isChecked = isRadio ? radioGroup.value === value : isCheckBox ? !!checked : false;

  var handleClick = function handleClick(e) {
    if (isDisabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    var event = {
      value: value,
      syntheticEvent: e
    };
    if (e.key !== undefined) event.key = e.key;
    if (isCheckBox) event.checked = !isChecked;
    if (isRadio) event.name = radioGroup.name;
    safeCall(onClick, event);
    if (isRadio) safeCall(radioGroup.onRadioChange, event);
    eventHandlers.handleClick(event, isCheckBox || isRadio);
  };

  var handleKeyUp = function handleKeyUp(e) {
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

  var handleBlur = function handleBlur(e) {
    activeStateBlur(e);
    onBlur(e);
  };

  var modifiers = useMemo(function () {
    return Object.freeze({
      type: type,
      disabled: isDisabled,
      hover: isHovering,
      active: isActive,
      checked: isChecked,
      anchor: isAnchor
    });
  }, [type, isDisabled, isHovering, isActive, isChecked, isAnchor]);
  var handlers = attachHandlerProps(_extends({}, activeStateHandlers, {
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave,
    onMouseDown: setHover,
    onKeyUp: handleKeyUp,
    onBlur: handleBlur,
    onClick: handleClick
  }), restProps);

  var menuItemProps = _extends({
    role: isRadio ? 'menuitemradio' : isCheckBox ? 'menuitemcheckbox' : 'menuitem',
    'aria-checked': isRadio || isCheckBox ? isChecked : undefined
  }, commonProps(isDisabled, isHovering), restProps, handlers, {
    ref: useCombinedRef(externalRef, itemRef),
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers: modifiers,
      className: className
    }),
    style: useFlatStyles(styles, modifiers)
  });

  var renderChildren = useMemo(function () {
    return safeCall(children, modifiers);
  }, [children, modifiers]);

  if (isAnchor) {
    return /*#__PURE__*/React.createElement("li", {
      role: "presentation"
    }, /*#__PURE__*/React.createElement("a", _extends({}, menuItemProps, {
      href: href
    }), renderChildren));
  } else {
    return /*#__PURE__*/React.createElement("li", menuItemProps, renderChildren);
  }
});
process.env.NODE_ENV !== "production" ? MenuItem.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  value: any,
  href: string,
  type: /*#__PURE__*/oneOf(['checkbox', 'radio']),
  checked: bool,
  disabled: bool,
  children: /*#__PURE__*/oneOfType([node, func]),
  onClick: func
}) : void 0;

export { MenuItem };
