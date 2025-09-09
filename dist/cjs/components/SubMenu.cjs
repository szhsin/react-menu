'use strict';

var react = require('react');
var reactDom = require('react-dom');
var MenuList = require('./MenuList.cjs');
var jsxRuntime = require('react/jsx-runtime');
var withHovering = require('../utils/withHovering.cjs');
var useMenuStateAndFocus = require('../hooks/useMenuStateAndFocus.cjs');
var useMouseOver = require('../hooks/useMouseOver.cjs');
var useItemEffect = require('../hooks/useItemEffect.cjs');
var constants = require('../utils/constants.cjs');
var useBEM = require('../hooks/useBEM.cjs');
var useCombinedRef = require('../hooks/useCombinedRef.cjs');
var utils = require('../utils/utils.cjs');

const SubMenu = /*#__PURE__*/withHovering.withHovering('SubMenu', function SubMenu({
  'aria-label': ariaLabel,
  className,
  disabled,
  direction,
  label,
  openTrigger,
  onMenuChange,
  isHovering,
  instanceRef,
  itemRef,
  captureFocus: _1,
  repositionFlag: _2,
  itemProps = {},
  portal = false,
  ...restProps
}) {
  const settings = react.useContext(constants.SettingsContext);
  const {
    rootMenuRef,
    submenuOpenDelay,
    submenuCloseDelay
  } = settings;
  const {
    parentMenuRef,
    parentDir,
    overflow: parentOverflow
  } = react.useContext(constants.MenuListContext);
  const {
    isParentOpen,
    submenuCtx,
    dispatch,
    updateItems
  } = react.useContext(constants.MenuListItemContext);
  const isPortal = portal || parentOverflow !== 'visible';
  const [stateProps, toggleMenu, _openMenu] = useMenuStateAndFocus.useMenuStateAndFocus({
    ...settings,
    onMenuChange
  });
  const [mouseOver, mouseOverStart, mouseOverEnd] = useMouseOver.useMouseOver(isHovering);
  const {
    state
  } = stateProps;
  const isDisabled = !!disabled;
  const isOpen = utils.isMenuOpen(state);
  const containerRef = react.useRef(null);
  const [timerId] = react.useState({
    v: 0
  });
  const stopTimer = () => {
    submenuCtx.off();
    if (timerId.v) {
      clearTimeout(timerId.v);
      timerId.v = 0;
    }
  };
  const openMenu = (...args) => {
    stopTimer();
    setHover();
    !isDisabled && _openMenu(...args);
  };
  const setHover = () => !isHovering && !isDisabled && dispatch(constants.HoverActionTypes.SET, itemRef.current);
  const delayOpen = delay => {
    setHover();
    if (!openTrigger) timerId.v = setTimeout(() => utils.batchedUpdates(openMenu), Math.max(delay, 0));
  };
  const onPointerMove = e => {
    if (isDisabled) return;
    e.stopPropagation();
    mouseOverStart();
    if (timerId.v || isOpen) return;
    submenuCtx.on(submenuCloseDelay, () => delayOpen(submenuOpenDelay - submenuCloseDelay), () => delayOpen(submenuOpenDelay));
  };
  const onPointerLeave = () => {
    mouseOverEnd();
    stopTimer();
    if (!isOpen) dispatch(constants.HoverActionTypes.UNSET, itemRef.current);
  };
  const onKeyDown = e => {
    if (!isHovering) return;
    switch (e.key) {
      case constants.Keys.ENTER:
        e.preventDefault();
      case constants.Keys.SPACE:
      case constants.Keys.RIGHT:
        openTrigger !== 'none' && openMenu(constants.FocusPositions.FIRST);
    }
  };
  const onKeyDownOfRoot = e => {
    let handled = false;
    switch (e.key) {
      case constants.Keys.LEFT:
        if (isOpen) {
          itemRef.current.focus();
          toggleMenu(false);
          handled = true;
        }
        break;
      case constants.Keys.RIGHT:
        if (!isOpen) handled = true;
        break;
    }
    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  useItemEffect.useItemEffect(isDisabled, itemRef, updateItems);
  react.useEffect(() => submenuCtx.toggle(isOpen), [submenuCtx, isOpen]);
  react.useEffect(() => () => {
    clearTimeout(timerId.v);
    submenuCtx.toggle(false);
  }, [timerId, submenuCtx]);
  react.useEffect(() => {
    if (isHovering && isParentOpen) {
      itemRef.current.focus();
    } else {
      toggleMenu(false);
    }
  }, [isHovering, isParentOpen, toggleMenu, itemRef]);
  react.useImperativeHandle(instanceRef, () => ({
    openMenu: (...args) => {
      isParentOpen && openMenu(...args);
    },
    closeMenu: () => {
      if (isOpen) {
        itemRef.current.focus();
        toggleMenu(false);
      }
    }
  }));
  const modifiers = react.useMemo(() => ({
    open: isOpen,
    hover: mouseOver || isHovering,
    disabled: isDisabled,
    submenu: true
  }), [isOpen, isHovering, isDisabled, mouseOver]);
  const {
    ref: externalItemRef,
    className: itemClassName,
    ...restItemProps
  } = itemProps;
  const mergedItemProps = utils.mergeProps({
    onPointerEnter: submenuCtx.off,
    onPointerMove,
    onPointerLeave,
    onKeyDown,
    onClick: () => openTrigger !== 'none' && openMenu()
  }, restItemProps);
  const getMenuList = () => {
    const menuList = /*#__PURE__*/jsxRuntime.jsx(MenuList.MenuList, {
      ...restProps,
      ...stateProps,
      ariaLabel: ariaLabel || (typeof label === 'string' ? label : 'Submenu'),
      anchorRef: itemRef,
      containerRef: isPortal ? rootMenuRef : containerRef,
      direction: direction || (parentDir === 'right' || parentDir === 'left' ? parentDir : 'right'),
      parentScrollingRef: isPortal && parentMenuRef,
      isDisabled: isDisabled
    });
    const container = rootMenuRef.current;
    return isPortal && container ? /*#__PURE__*/reactDom.createPortal(menuList, container) : menuList;
  };
  return /*#__PURE__*/jsxRuntime.jsxs("li", {
    className: useBEM.useBEM({
      block: constants.menuClass,
      element: constants.subMenuClass,
      className
    }),
    style: {
      position: 'relative'
    },
    role: constants.roleNone,
    ref: containerRef,
    onKeyDown: onKeyDownOfRoot,
    children: [/*#__PURE__*/jsxRuntime.jsx("div", {
      role: constants.roleMenuitem,
      "aria-haspopup": true,
      "aria-expanded": isOpen,
      ...utils.commonProps(isDisabled, isHovering),
      ...mergedItemProps,
      ref: useCombinedRef.useCombinedRef(externalItemRef, itemRef),
      className: useBEM.useBEM({
        block: constants.menuClass,
        element: constants.menuItemClass,
        modifiers,
        className: itemClassName
      }),
      children: react.useMemo(() => utils.safeCall(label, modifiers), [label, modifiers])
    }), state && getMenuList()]
  });
});

exports.SubMenu = SubMenu;
