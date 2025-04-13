'use strict';

var react = require('react');
var ControlledMenu = require('./ControlledMenu.cjs');
var jsxRuntime = require('react/jsx-runtime');
var useMenuStateAndFocus = require('../hooks/useMenuStateAndFocus.cjs');
var useClick = require('../hooks/useClick.cjs');
var useCombinedRef = require('../hooks/useCombinedRef.cjs');
var utils = require('../utils/utils.cjs');
var constants = require('../utils/constants.cjs');

const isLegacyReact = parseInt(react.version) < 19;
const Menu = /*#__PURE__*/react.forwardRef(function Menu({
  'aria-label': ariaLabel,
  captureFocus: _,
  initialOpen: _1,
  menuButton,
  instanceRef,
  onMenuChange,
  ...restProps
}, externalRef) {
  const [stateProps, toggleMenu, openMenu] = useMenuStateAndFocus.useMenuStateAndFocus({
    ...restProps,
    onMenuChange
  });
  const {
    state
  } = stateProps;
  const isOpen = utils.isMenuOpen(state);
  const buttonRef = react.useRef(null);
  const anchorProps = useClick.useClick(state, (_, e) => openMenu(!e.detail ? constants.FocusPositions.FIRST : undefined));
  const handleClose = react.useCallback(e => {
    toggleMenu(false);
    if (e.key) buttonRef.current.focus();
  }, [toggleMenu]);
  const onKeyDown = e => {
    switch (e.key) {
      case constants.Keys.UP:
        openMenu(constants.FocusPositions.LAST);
        break;
      case constants.Keys.DOWN:
        openMenu(constants.FocusPositions.FIRST);
        break;
      default:
        return;
    }
    e.preventDefault();
  };
  const button = utils.safeCall(menuButton, {
    open: isOpen
  });
  if (!button || !button.type) throw new Error('Menu requires a menuButton prop.');
  const buttonProps = {
    ...utils.mergeProps({
      onKeyDown,
      ...anchorProps
    }, button.props),
    ref: useCombinedRef.useCombinedRef(isLegacyReact ? button.ref : button.props.ref, buttonRef)
  };
  if (utils.getName(button.type) === 'MenuButton') {
    buttonProps.isOpen = isOpen;
  }
  const renderButton = /*#__PURE__*/react.cloneElement(button, buttonProps);
  react.useImperativeHandle(instanceRef, () => ({
    openMenu,
    closeMenu: () => toggleMenu(false)
  }));
  return /*#__PURE__*/jsxRuntime.jsxs(react.Fragment, {
    children: [renderButton, /*#__PURE__*/jsxRuntime.jsx(ControlledMenu.ControlledMenu, {
      ...restProps,
      ...stateProps,
      "aria-label": ariaLabel || (typeof button.props.children === 'string' ? button.props.children : 'Menu'),
      anchorRef: buttonRef,
      ref: externalRef,
      onClose: handleClose
    })]
  });
});

exports.Menu = Menu;
