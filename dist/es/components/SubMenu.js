import { extends as _extends, objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose } from '../_virtual/_rollupPluginBabelHelpers.js';
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

var _excluded = ["aria-label", "className", "disabled", "direction", "label", "openTrigger", "onMenuChange", "isHovering", "instanceRef", "itemRef", "captureFocus", "repositionFlag", "itemProps"],
  _excluded2 = ["ref", "className"];
var SubMenu = /*#__PURE__*/withHovering('SubMenu', function SubMenu(_ref) {
  var ariaLabel = _ref['aria-label'],
    className = _ref.className,
    disabled = _ref.disabled,
    direction = _ref.direction,
    label = _ref.label,
    openTrigger = _ref.openTrigger,
    onMenuChange = _ref.onMenuChange,
    isHovering = _ref.isHovering,
    instanceRef = _ref.instanceRef,
    itemRef = _ref.itemRef,
    _ref$itemProps = _ref.itemProps,
    itemProps = _ref$itemProps === void 0 ? {} : _ref$itemProps,
    restProps = _objectWithoutPropertiesLoose(_ref, _excluded);
  var settings = useContext(SettingsContext);
  var rootMenuRef = settings.rootMenuRef,
    submenuOpenDelay = settings.submenuOpenDelay,
    submenuCloseDelay = settings.submenuCloseDelay;
  var _useContext = useContext(MenuListContext),
    parentMenuRef = _useContext.parentMenuRef,
    parentDir = _useContext.parentDir,
    parentOverflow = _useContext.overflow;
  var _useContext2 = useContext(MenuListItemContext),
    isParentOpen = _useContext2.isParentOpen,
    submenuCtx = _useContext2.submenuCtx,
    dispatch = _useContext2.dispatch,
    updateItems = _useContext2.updateItems;
  var isPortal = parentOverflow !== 'visible';
  var _useMenuStateAndFocus = useMenuStateAndFocus(settings),
    stateProps = _useMenuStateAndFocus[0],
    toggleMenu = _useMenuStateAndFocus[1],
    _openMenu = _useMenuStateAndFocus[2];
  var state = stateProps.state;
  var isDisabled = !!disabled;
  var isOpen = isMenuOpen(state);
  var containerRef = useRef(null);
  var _useState = useState({
      v: 0
    }),
    timerId = _useState[0];
  var stopTimer = function stopTimer() {
    submenuCtx.off();
    if (timerId.v) {
      clearTimeout(timerId.v);
      timerId.v = 0;
    }
  };
  var _openMenu2 = function openMenu() {
    stopTimer();
    setHover();
    !isDisabled && _openMenu.apply(void 0, arguments);
  };
  var setHover = function setHover() {
    return !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);
  };
  var delayOpen = function delayOpen(delay) {
    setHover();
    if (!openTrigger) timerId.v = setTimeout(function () {
      return batchedUpdates(_openMenu2);
    }, Math.max(delay, 0));
  };
  var onPointerMove = function onPointerMove(e) {
    if (isDisabled) return;
    e.stopPropagation();
    if (timerId.v || isOpen) return;
    submenuCtx.on(submenuCloseDelay, function () {
      return delayOpen(submenuOpenDelay - submenuCloseDelay);
    }, function () {
      return delayOpen(submenuOpenDelay);
    });
  };
  var onPointerLeave = function onPointerLeave() {
    stopTimer();
    if (!isOpen) dispatch(HoverActionTypes.UNSET, itemRef.current);
  };
  var onKeyDown = function onKeyDown(e) {
    if (!isHovering) return;
    switch (e.key) {
      case Keys.ENTER:
      case Keys.SPACE:
      case Keys.RIGHT:
        openTrigger !== 'none' && _openMenu2(FocusPositions.FIRST);
        break;
    }
  };
  var onKeyDownOfRoot = function onKeyDownOfRoot(e) {
    var handled = false;
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
  useEffect(function () {
    return submenuCtx.toggle(isOpen);
  }, [submenuCtx, isOpen]);
  useEffect(function () {
    return function () {
      return clearTimeout(timerId.v);
    };
  }, [timerId]);
  useEffect(function () {
    if (isHovering && isParentOpen) {
      itemRef.current.focus();
    } else {
      toggleMenu(false);
    }
  }, [isHovering, isParentOpen, toggleMenu, itemRef]);
  useImperativeHandle(instanceRef, function () {
    return {
      openMenu: function openMenu() {
        isParentOpen && _openMenu2.apply(void 0, arguments);
      },
      closeMenu: function closeMenu() {
        if (isOpen) {
          itemRef.current.focus();
          toggleMenu(false);
        }
      }
    };
  });
  var modifiers = useMemo(function () {
    return {
      open: isOpen,
      hover: isHovering,
      disabled: isDisabled,
      submenu: true
    };
  }, [isOpen, isHovering, isDisabled]);
  var externalItemRef = itemProps.ref,
    itemClassName = itemProps.className,
    restItemProps = _objectWithoutPropertiesLoose(itemProps, _excluded2);
  var mergedItemProps = mergeProps({
    onPointerEnter: submenuCtx.off,
    onPointerMove: onPointerMove,
    onPointerLeave: onPointerLeave,
    onKeyDown: onKeyDown,
    onClick: function onClick() {
      return openTrigger !== 'none' && _openMenu2();
    }
  }, restItemProps);
  var getMenuList = function getMenuList() {
    var menuList = /*#__PURE__*/jsx(MenuList, _extends({}, restProps, stateProps, {
      ariaLabel: ariaLabel || (typeof label === 'string' ? label : 'Submenu'),
      anchorRef: itemRef,
      containerRef: isPortal ? rootMenuRef : containerRef,
      direction: direction || (parentDir === 'right' || parentDir === 'left' ? parentDir : 'right'),
      parentScrollingRef: isPortal && parentMenuRef,
      isDisabled: isDisabled
    }));
    var container = rootMenuRef.current;
    return isPortal && container ? /*#__PURE__*/createPortal(menuList, container) : menuList;
  };
  return /*#__PURE__*/jsxs("li", {
    className: useBEM({
      block: menuClass,
      element: subMenuClass,
      className: className
    }),
    style: {
      position: 'relative'
    },
    role: roleNone,
    ref: containerRef,
    onKeyDown: onKeyDownOfRoot,
    children: [/*#__PURE__*/jsx("div", _extends({
      role: roleMenuitem,
      "aria-haspopup": true,
      "aria-expanded": isOpen
    }, commonProps(isDisabled, isHovering), mergedItemProps, {
      ref: useCombinedRef(externalItemRef, itemRef),
      className: useBEM({
        block: menuClass,
        element: menuItemClass,
        modifiers: modifiers,
        className: itemClassName
      }),
      children: useMemo(function () {
        return safeCall(label, modifiers);
      }, [label, modifiers])
    })), state && getMenuList()]
  });
});
process.env.NODE_ENV !== "production" ? SubMenu.propTypes = /*#__PURE__*/_extends({}, menuPropTypes, uncontrolledMenuPropTypes, {
  disabled: bool,
  openTrigger: /*#__PURE__*/oneOf(['none', 'clickOnly']),
  label: /*#__PURE__*/oneOfType([node, func]),
  itemProps: /*#__PURE__*/shape( /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes()))
}) : void 0;

export { SubMenu };
