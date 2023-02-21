import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { forwardRef, useRef, useCallback, useImperativeHandle, Fragment, cloneElement } from 'react';
import { oneOfType, element, func } from 'prop-types';
import { ControlledMenu } from './ControlledMenu.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useMenuStateAndFocus } from '../hooks/useMenuStateAndFocus.js';
import { useClick } from '../hooks/useClick.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { isMenuOpen, safeCall, mergeProps, getName } from '../utils/utils.js';
import { useMenuChange } from '../hooks/useMenuChange.js';
import { rootMenuPropTypes, uncontrolledMenuPropTypes } from '../utils/propTypes.js';
import { FocusPositions, Keys } from '../utils/constants.js';

var _excluded = ["aria-label", "captureFocus", "initialOpen", "menuButton", "instanceRef", "onMenuChange"];
var Menu = /*#__PURE__*/forwardRef(function Menu(_ref, externalRef) {
  var ariaLabel = _ref['aria-label'],
    menuButton = _ref.menuButton,
    instanceRef = _ref.instanceRef,
    onMenuChange = _ref.onMenuChange,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useMenuStateAndFocus = useMenuStateAndFocus(restProps),
    stateProps = _useMenuStateAndFocus[0],
    toggleMenu = _useMenuStateAndFocus[1],
    openMenu = _useMenuStateAndFocus[2];
  var state = stateProps.state;
  var isOpen = isMenuOpen(state);
  var buttonRef = useRef(null);
  var anchorProps = useClick(state, function (_, e) {
    return openMenu(!e.detail ? FocusPositions.FIRST : undefined);
  });
  var handleClose = useCallback(function (e) {
    toggleMenu(false);
    if (e.key) buttonRef.current.focus();
  }, [toggleMenu]);
  var onKeyDown = function onKeyDown(e) {
    switch (e.key) {
      case Keys.UP:
        openMenu(FocusPositions.LAST);
        break;
      case Keys.DOWN:
        openMenu(FocusPositions.FIRST);
        break;
      default:
        return;
    }
    e.preventDefault();
  };
  var button = safeCall(menuButton, {
    open: isOpen
  });
  if (!button || !button.type) throw new Error('Menu requires a menuButton prop.');
  var buttonProps = _extends({
    ref: useCombinedRef(button.ref, buttonRef)
  }, mergeProps(_extends({
    onKeyDown: onKeyDown
  }, anchorProps), button.props));
  if (getName(button.type) === 'MenuButton') {
    buttonProps.isOpen = isOpen;
  }
  var renderButton = /*#__PURE__*/cloneElement(button, buttonProps);
  useMenuChange(onMenuChange, isOpen);
  useImperativeHandle(instanceRef, function () {
    return {
      openMenu: openMenu,
      closeMenu: function closeMenu() {
        return toggleMenu(false);
      }
    };
  });
  return /*#__PURE__*/jsxs(Fragment, {
    children: [renderButton, /*#__PURE__*/jsx(ControlledMenu, _extends({}, restProps, stateProps, {
      "aria-label": ariaLabel || (typeof button.props.children === 'string' ? button.props.children : 'Menu'),
      anchorRef: buttonRef,
      ref: externalRef,
      onClose: handleClose
    }))]
  });
});
process.env.NODE_ENV !== "production" ? Menu.propTypes = /*#__PURE__*/_extends({}, rootMenuPropTypes, uncontrolledMenuPropTypes, {
  menuButton: oneOfType([element, func]).isRequired
}) : void 0;

export { Menu };
