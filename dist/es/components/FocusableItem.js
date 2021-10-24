import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import React, { memo, useRef, useContext, useMemo } from 'react';
import { bool, func } from 'prop-types';
import { withHovering } from '../utils/withHovering.js';
import { useItemState } from '../hooks/useItemState.js';
import { useBEM } from '../hooks/useBEM.js';
import { useFlatStyles } from '../hooks/useFlatStyles.js';
import { validateIndex, safeCall, attachHandlerProps } from '../utils/utils.js';
import { EventHandlersContext, menuClass, menuItemClass } from '../utils/constants.js';
import { stylePropTypes } from '../utils/propTypes.js';

var _excluded = ["className", "styles", "disabled", "index", "children", "isHovering", "externalRef"];
var FocusableItem = /*#__PURE__*/withHovering( /*#__PURE__*/memo(function FocusableItem(_ref) {
  var className = _ref.className,
      styles = _ref.styles,
      disabled = _ref.disabled,
      index = _ref.index,
      children = _ref.children,
      isHovering = _ref.isHovering,
      externalRef = _ref.externalRef,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var isDisabled = !!disabled;
  validateIndex(index, isDisabled, children);
  var ref = useRef(null);

  var _useItemState = useItemState(ref, index, isHovering, isDisabled),
      setHover = _useItemState.setHover,
      onBlur = _useItemState.onBlur,
      onMouseEnter = _useItemState.onMouseEnter,
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
    onMouseEnter: onMouseEnter,
    onMouseLeave: function onMouseLeave(e) {
      return _onMouseLeave(e, true);
    },
    onFocus: setHover,
    onBlur: onBlur
  }, restProps);
  return /*#__PURE__*/React.createElement("li", _extends({
    "aria-disabled": isDisabled || undefined,
    role: "menuitem",
    tabIndex: "-1"
  }, restProps, handlers, {
    ref: externalRef,
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers: modifiers,
      className: className
    }),
    style: useFlatStyles(styles, modifiers)
  }), renderChildren);
}), 'FocusableItem');
process.env.NODE_ENV !== "production" ? FocusableItem.propTypes = /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes(), {
  disabled: bool,
  children: func
}) : void 0;

export { FocusableItem };
