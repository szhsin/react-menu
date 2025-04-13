'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var useItemState = require('../hooks/useItemState.cjs');
var useBEM = require('../hooks/useBEM.cjs');
var useCombinedRef = require('../hooks/useCombinedRef.cjs');
var withHovering = require('../utils/withHovering.cjs');
var constants = require('../utils/constants.cjs');
var utils = require('../utils/utils.cjs');

const FocusableItem = /*#__PURE__*/withHovering.withHovering('FocusableItem', function FocusableItem({
  className,
  disabled,
  children,
  isHovering,
  itemRef,
  externalRef,
  ...restProps
}) {
  const isDisabled = !!disabled;
  const ref = react.useRef(null);
  const {
    setHover,
    onPointerLeave,
    ...restStateProps
  } = useItemState.useItemState(itemRef, ref, isHovering, isDisabled);
  const {
    handleClose
  } = react.useContext(constants.EventHandlersContext);
  const modifiers = react.useMemo(() => ({
    disabled: isDisabled,
    hover: isHovering,
    focusable: true
  }), [isDisabled, isHovering]);
  const renderChildren = react.useMemo(() => utils.safeCall(children, {
    ...modifiers,
    ref,
    closeMenu: handleClose
  }), [children, modifiers, handleClose]);
  const mergedProps = utils.mergeProps({
    ...restStateProps,
    onPointerLeave: e => onPointerLeave(e, true),
    onFocus: setHover
  }, restProps);
  return /*#__PURE__*/jsxRuntime.jsx("li", {
    role: constants.roleMenuitem,
    ...utils.commonProps(isDisabled),
    ...mergedProps,
    ref: useCombinedRef.useCombinedRef(externalRef, itemRef),
    className: useBEM.useBEM({
      block: constants.menuClass,
      element: constants.menuItemClass,
      modifiers,
      className
    }),
    children: renderChildren
  });
});

exports.FocusableItem = FocusableItem;
