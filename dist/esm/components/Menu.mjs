import { forwardRef, useRef, useCallback, useImperativeHandle, Fragment, cloneElement, version } from 'react';
import { ControlledMenu } from './ControlledMenu.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useMenuStateAndFocus } from '../hooks/useMenuStateAndFocus.mjs';
import { useClick } from '../hooks/useClick.mjs';
import { useCombinedRef } from '../hooks/useCombinedRef.mjs';
import { safeCall, mergeProps, isMenuOpen, getName } from '../utils/utils.mjs';
import { FocusPositions, Keys } from '../utils/constants.mjs';

const isLegacyReact = parseInt(version) < 19;
const Menu = /*#__PURE__*/forwardRef(function Menu({
  'aria-label': ariaLabel,
  captureFocus: _,
  initialOpen: _1,
  menuButton,
  instanceRef,
  onMenuChange,
  ...restProps
}, externalRef) {
  const [stateProps, toggleMenu, openMenu] = useMenuStateAndFocus({
    ...restProps,
    onMenuChange
  });
  const {
    state
  } = stateProps;
  const isOpen = isMenuOpen(state);
  const buttonRef = useRef(null);
  const anchorProps = useClick(state, (_, e) => openMenu(!e.detail ? FocusPositions.FIRST : undefined));
  const handleClose = useCallback(e => {
    toggleMenu(false);
    if (e.key) buttonRef.current.focus();
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
    ...mergeProps({
      onKeyDown,
      ...anchorProps
    }, button.props),
    ref: useCombinedRef(isLegacyReact ? button.ref : button.props.ref, buttonRef)
  };
  if (getName(button.type) === 'MenuButton') {
    buttonProps.isOpen = isOpen;
  }
  const renderButton = /*#__PURE__*/cloneElement(button, buttonProps);
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

export { Menu };
