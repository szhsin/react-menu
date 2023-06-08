import { useContext, useRef, useState, useEffect, useImperativeHandle, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { bool, oneOf, oneOfType, node, func, shape } from 'prop-types';
import { MenuList } from './MenuList.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { withHovering } from '../utils/withHovering.js';
import { menuPropTypes, uncontrolledMenuPropTypes, stylePropTypes } from '../utils/propTypes.js';
import { useMenuStateAndFocus } from '../hooks/useMenuStateAndFocus.js';
import { useItemEffect } from '../hooks/useItemEffect.js';
import { useMenuChange } from '../hooks/useMenuChange.js';
import { useBEM } from '../hooks/useBEM.js';
import { SettingsContext, MenuListContext, MenuListItemContext, menuClass, subMenuClass, roleNone, roleMenuitem, menuItemClass, HoverActionTypes, Keys, FocusPositions } from '../utils/constants.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { mergeProps, commonProps, safeCall, isMenuOpen, batchedUpdates } from '../utils/utils.js';

const SubMenu = /*#__PURE__*/withHovering('SubMenu', function SubMenu({
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
  ...restProps
}) {
  const settings = useContext(SettingsContext);
  const {
    rootMenuRef,
    submenuOpenDelay,
    submenuCloseDelay
  } = settings;
  const {
    parentMenuRef,
    parentDir,
    overflow: parentOverflow
  } = useContext(MenuListContext);
  const {
    isParentOpen,
    submenuCtx,
    dispatch,
    updateItems
  } = useContext(MenuListItemContext);
  const isPortal = parentOverflow !== 'visible';
  const [stateProps, toggleMenu, _openMenu] = useMenuStateAndFocus(settings);
  const {
    state
  } = stateProps;
  const isDisabled = !!disabled;
  const isOpen = isMenuOpen(state);
  const containerRef = useRef(null);
  const [timerId] = useState({
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
  const setHover = () => !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);
  const delayOpen = delay => {
    setHover();
    if (!openTrigger) timerId.v = setTimeout(() => batchedUpdates(openMenu), Math.max(delay, 0));
  };
  const onPointerMove = e => {
    if (isDisabled) return;
    e.stopPropagation();
    if (timerId.v || isOpen) return;
    submenuCtx.on(submenuCloseDelay, () => delayOpen(submenuOpenDelay - submenuCloseDelay), () => delayOpen(submenuOpenDelay));
  };
  const onPointerLeave = () => {
    stopTimer();
    if (!isOpen) dispatch(HoverActionTypes.UNSET, itemRef.current);
  };
  const onKeyDown = e => {
    if (!isHovering) return;
    switch (e.key) {
      case Keys.ENTER:
      case Keys.SPACE:
      case Keys.RIGHT:
        openTrigger !== 'none' && openMenu(FocusPositions.FIRST);
        break;
    }
  };
  const onKeyDownOfRoot = e => {
    let handled = false;
    switch (e.key) {
      case Keys.LEFT:
        if (isOpen) {
          itemRef.current.focus();
          toggleMenu(false);
          handled = true;
        }
        break;
      case Keys.RIGHT:
        if (!isOpen) handled = true;
        break;
    }
    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
  useItemEffect(isDisabled, itemRef, updateItems);
  useMenuChange(onMenuChange, isOpen);
  useEffect(() => submenuCtx.toggle(isOpen), [submenuCtx, isOpen]);
  useEffect(() => () => clearTimeout(timerId.v), [timerId]);
  useEffect(() => {
    if (isHovering && isParentOpen) {
      itemRef.current.focus();
    } else {
      toggleMenu(false);
    }
  }, [isHovering, isParentOpen, toggleMenu, itemRef]);
  useImperativeHandle(instanceRef, () => ({
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
  const modifiers = useMemo(() => ({
    open: isOpen,
    hover: isHovering,
    disabled: isDisabled,
    submenu: true
  }), [isOpen, isHovering, isDisabled]);
  const {
    ref: externalItemRef,
    className: itemClassName,
    ...restItemProps
  } = itemProps;
  const mergedItemProps = mergeProps({
    onPointerEnter: submenuCtx.off,
    onPointerMove,
    onPointerLeave,
    onKeyDown,
    onClick: () => openTrigger !== 'none' && openMenu()
  }, restItemProps);
  const getMenuList = () => {
    const menuList = /*#__PURE__*/jsx(MenuList, {
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
    return isPortal && container ? /*#__PURE__*/createPortal(menuList, container) : menuList;
  };
  return /*#__PURE__*/jsxs("li", {
    className: useBEM({
      block: menuClass,
      element: subMenuClass,
      className
    }),
    style: {
      position: 'relative'
    },
    role: roleNone,
    ref: containerRef,
    onKeyDown: onKeyDownOfRoot,
    children: [/*#__PURE__*/jsx("div", {
      role: roleMenuitem,
      "aria-haspopup": true,
      "aria-expanded": isOpen,
      ...commonProps(isDisabled, isHovering),
      ...mergedItemProps,
      ref: useCombinedRef(externalItemRef, itemRef),
      className: useBEM({
        block: menuClass,
        element: menuItemClass,
        modifiers,
        className: itemClassName
      }),
      children: useMemo(() => safeCall(label, modifiers), [label, modifiers])
    }), state && getMenuList()]
  });
});
process.env.NODE_ENV !== "production" ? SubMenu.propTypes = {
  ...menuPropTypes,
  ...uncontrolledMenuPropTypes,
  disabled: bool,
  openTrigger: /*#__PURE__*/oneOf(['none', 'clickOnly']),
  label: /*#__PURE__*/oneOfType([node, func]),
  itemProps: /*#__PURE__*/shape({
    ...stylePropTypes()
  })
} : void 0;

export { SubMenu };
