import { extends as _extends, objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose } from '../_virtual/_rollupPluginBabelHelpers.js';
import { useContext, useMemo } from 'react';
import { any, string, oneOf, bool, oneOfType, node, func } from 'prop-types';
import { jsx } from 'react/jsx-runtime';
import { withHovering } from '../utils/withHovering.js';
import { useItemState } from '../hooks/useItemState.js';
import { EventHandlersContext, RadioGroupContext, menuClass, menuItemClass, Keys } from '../utils/constants.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { useBEM } from '../hooks/useBEM.js';
import { stylePropTypes } from '../utils/propTypes.js';
import { mergeProps, commonProps, safeCall } from '../utils/utils.js';

var _excluded = ["className", "value", "href", "type", "checked", "disabled", "children", "onClick", "isHovering", "itemRef", "externalRef"],
    _excluded2 = ["setHover"];
var MenuItem = /*#__PURE__*/withHovering('MenuItem', function MenuItem(_ref) {
  var className = _ref.className,
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
      restStateProps = _objectWithoutPropertiesLoose(_useItemState, _excluded2);

  var eventHandlers = useContext(EventHandlersContext);
  var radioGroup = useContext(RadioGroupContext);
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

  var handleKeyDown = function handleKeyDown(e) {
    if (!isHovering) return;

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

  var modifiers = useMemo(function () {
    return {
      type: type,
      disabled: isDisabled,
      hover: isHovering,
      checked: isChecked,
      anchor: isAnchor
    };
  }, [type, isDisabled, isHovering, isChecked, isAnchor]);
  var mergedProps = mergeProps(_extends({}, restStateProps, {
    onPointerDown: setHover,
    onKeyDown: handleKeyDown,
    onClick: handleClick
  }), restProps);

  var menuItemProps = _extends({
    role: isRadio ? 'menuitemradio' : isCheckBox ? 'menuitemcheckbox' : 'menuitem',
    'aria-checked': isRadio || isCheckBox ? isChecked : undefined
  }, mergedProps, commonProps(isDisabled, isHovering), {
    ref: useCombinedRef(externalRef, itemRef),
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers: modifiers,
      className: className
    }),
    children: useMemo(function () {
      return safeCall(children, modifiers);
    }, [children, modifiers])
  });

  if (isAnchor) {
    return /*#__PURE__*/jsx("li", {
      role: "presentation",
      children: /*#__PURE__*/jsx("a", _extends({
        href: href
      }, menuItemProps))
    });
  } else {
    return /*#__PURE__*/jsx("li", _extends({}, menuItemProps));
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
