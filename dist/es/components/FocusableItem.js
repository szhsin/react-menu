import { extends as _extends, objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose } from '../_virtual/_rollupPluginBabelHelpers.js';
import { useRef, useContext, useMemo } from 'react';
import { bool, func } from 'prop-types';
import { jsx } from 'react/jsx-runtime';
import { withHovering } from '../utils/withHovering.js';
import { useItemState } from '../hooks/useItemState.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { useBEM } from '../hooks/useBEM.js';
import { stylePropTypes } from '../utils/propTypes.js';
import { EventHandlersContext, menuClass, menuItemClass } from '../utils/constants.js';
import { safeCall, attachHandlerProps, commonProps } from '../utils/utils.js';

var _excluded = ["className", "disabled", "children", "isHovering", "itemRef", "externalRef"];
var FocusableItem = /*#__PURE__*/withHovering('FocusableItem', function FocusableItem(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      children = _ref.children,
      isHovering = _ref.isHovering,
      itemRef = _ref.itemRef,
      externalRef = _ref.externalRef,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var isDisabled = !!disabled;
  var ref = useRef(null);

  var _useItemState = useItemState(itemRef, ref, isHovering, isDisabled),
      setHover = _useItemState.setHover,
      onBlur = _useItemState.onBlur,
      onMouseMove = _useItemState.onMouseMove,
      _onMouseLeave = _useItemState.onMouseLeave;

  var _useContext = useContext(EventHandlersContext),
      handleClose = _useContext.handleClose;

  var modifiers = useMemo(function () {
    return Object.freeze({
      disabled: isDisabled,
      hover: isHovering,
      focusable: true
    });
  }, [isDisabled, isHovering]);
  var renderChildren = useMemo(function () {
    return safeCall(children, _extends({}, modifiers, {
      ref: ref,
      closeMenu: handleClose
    }));
  }, [children, modifiers, handleClose]);
  var handlers = attachHandlerProps({
    onMouseMove: onMouseMove,
    onMouseLeave: function onMouseLeave(e) {
      return _onMouseLeave(e, true);
    },
    onFocus: setHover,
    onBlur: onBlur
  }, restProps);
  return /*#__PURE__*/jsx("li", _extends({
    role: "menuitem"
  }, restProps, handlers, commonProps(isDisabled), {
    ref: useCombinedRef(externalRef, itemRef),
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers: modifiers,
      className: className
    }),
    children: renderChildren
  }));
});
process.env.NODE_ENV !== "production" ? FocusableItem.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  disabled: bool,
  children: func
}) : void 0;

export { FocusableItem };
