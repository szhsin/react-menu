'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');
var useItemState = require('../hooks/useItemState.cjs');
var constants = require('../utils/constants.cjs');
var useBEM = require('../hooks/useBEM.cjs');
var useCombinedRef = require('../hooks/useCombinedRef.cjs');
var withHovering = require('../utils/withHovering.cjs');
var utils = require('../utils/utils.cjs');

const MenuItem = /*#__PURE__*/withHovering.withHovering('MenuItem', function MenuItem({
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
    mouseOver,
    setHover,
    ...restStateProps
  } = useItemState.useItemState(itemRef, itemRef, isHovering, isDisabled);
  const eventHandlers = react.useContext(constants.EventHandlersContext);
  const radioGroup = react.useContext(constants.RadioGroupContext);
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
    utils.safeCall(onClick, event);
    if (isRadio) utils.safeCall(radioGroup.onRadioChange, event);
    eventHandlers.handleClick(event, isCheckBox || isRadio);
  };
  const handleKeyDown = e => {
    if (!isHovering) return;
    switch (e.key) {
      case constants.Keys.ENTER:
        e.preventDefault();
      case constants.Keys.SPACE:
        isAnchor ? itemRef.current.click() : handleClick(e);
    }
  };
  const modifiers = react.useMemo(() => ({
    type,
    disabled: isDisabled,
    hover: mouseOver || isHovering,
    checked: isChecked,
    anchor: isAnchor
  }), [type, isDisabled, mouseOver, isHovering, isChecked, isAnchor]);
  const mergedProps = utils.mergeProps({
    ...restStateProps,
    onPointerDown: setHover,
    onKeyDown: handleKeyDown,
    onClick: handleClick
  }, restProps);
  const menuItemProps = {
    role: isRadio ? 'menuitemradio' : isCheckBox ? 'menuitemcheckbox' : constants.roleMenuitem,
    'aria-checked': isRadio || isCheckBox ? isChecked : undefined,
    ...utils.commonProps(isDisabled, isHovering),
    ...mergedProps,
    ref: useCombinedRef.useCombinedRef(externalRef, itemRef),
    className: useBEM.useBEM({
      block: constants.menuClass,
      element: constants.menuItemClass,
      modifiers,
      className
    }),
    children: react.useMemo(() => utils.safeCall(children, modifiers), [children, modifiers])
  };
  return isAnchor ? /*#__PURE__*/jsxRuntime.jsx("li", {
    role: constants.roleNone,
    children: /*#__PURE__*/jsxRuntime.jsx("a", {
      href: href,
      ...menuItemProps
    })
  }) : /*#__PURE__*/jsxRuntime.jsx("li", {
    ...menuItemProps
  });
});

exports.MenuItem = MenuItem;
