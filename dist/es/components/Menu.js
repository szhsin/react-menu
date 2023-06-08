import { forwardRef, useRef, useCallback, useImperativeHandle, Fragment, cloneElement } from 'react';
import { oneOfType, element, func } from 'prop-types';
import { ControlledMenu } from './ControlledMenu.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useMenuStateAndFocus } from '../hooks/useMenuStateAndFocus.js';
import { useClick } from '../hooks/useClick.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { safeCall, mergeProps, getName, isMenuOpen } from '../utils/utils.js';
import { useMenuChange } from '../hooks/useMenuChange.js';
import { rootMenuPropTypes, uncontrolledMenuPropTypes } from '../utils/propTypes.js';
import { FocusPositions, Keys } from '../utils/constants.js';

const Menu = /*#__PURE__*/forwardRef(function Menu({
  'aria-label': ariaLabel,
  captureFocus: _,
  initialOpen: _1,
  menuButton,
  instanceRef,
  onMenuChange,
  ...restProps
}, externalRef) {
  const [stateProps, toggleMenu, openMenu] = useMenuStateAndFocus(restProps);
  const {
    state
  } = stateProps;
  const isOpen = isMenuOpen(state);
  const buttonRef = useRef(null);
  const anchorProps = useClick(state, (_, e) => openMenu(!e.detail ? FocusPositions.FIRST : undefined));
  const handleClose = useCallback(e => {
    toggleMenu(false);
    if (e.key) setTimeout(() => {
      var _buttonRef$current;
      return (_buttonRef$current = buttonRef.current) == null ? void 0 : _buttonRef$current.focus();
    }, 0);
  }, [toggleMenu]);
  const onKeyDown = e => {
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
  const button = safeCall(menuButton, {
    open: isOpen
  });
  if (!button || !button.type) throw new Error('Menu requires a menuButton prop.');
  const buttonProps = {
    ref: useCombinedRef(button.ref, buttonRef),
    ...mergeProps({
      onKeyDown,
      ...anchorProps
    }, button.props)
  };
  if (getName(button.type) === 'MenuButton') {
    buttonProps.isOpen = isOpen;
  }
  const renderButton = /*#__PURE__*/cloneElement(button, buttonProps);
  useMenuChange(onMenuChange, isOpen);
  useImperativeHandle(instanceRef, () => ({
    openMenu,
    closeMenu: () => toggleMenu(false)
  }));
  return /*#__PURE__*/jsxs(Fragment, {
    children: [renderButton, /*#__PURE__*/jsx(ControlledMenu, {
      ...restProps,
      ...stateProps,
      "aria-label": ariaLabel || (typeof button.props.children === 'string' ? button.props.children : 'Menu'),
      anchorRef: buttonRef,
      ref: externalRef,
      onClose: handleClose
    })]
  });
});
process.env.NODE_ENV !== "production" ? Menu.propTypes = {
  ...rootMenuPropTypes,
  ...uncontrolledMenuPropTypes,
  menuButton: oneOfType([element, func]).isRequired
} : void 0;

export { Menu };
