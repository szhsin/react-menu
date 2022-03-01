import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import React, { useContext, useRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { bool, oneOf, oneOfType, node, func, shape } from 'prop-types';
import { MenuList } from './MenuList.js';
import { withHovering } from '../utils/withHovering.js';
import { useMenuStateAndFocus } from '../hooks/useMenuStateAndFocus.js';
import { useActiveState } from '../hooks/useActiveState.js';
import { useItemEffect } from '../hooks/useItemEffect.js';
import { useMenuChange } from '../hooks/useMenuChange.js';
import { useBEM } from '../hooks/useBEM.js';
import { SettingsContext, ItemSettingsContext, MenuListItemContext, Keys, HoverActionTypes, menuClass, subMenuClass, menuItemClass, FocusPositions } from '../utils/constants.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { menuPropTypes, uncontrolledMenuPropTypes, stylePropTypes, menuDefaultProps } from '../utils/propTypes.js';
import { isMenuOpen, attachHandlerProps, commonProps, safeCall, batchedUpdates } from '../utils/utils.js';

var _excluded = ["aria-label", "className", "disabled", "label", "openTrigger", "onMenuChange", "isHovering", "instanceRef", "itemRef", "captureFocus", "repositionFlag", "itemProps"],
    _excluded2 = ["openMenu", "toggleMenu", "state"],
    _excluded3 = ["isActive", "onKeyUp"],
    _excluded4 = ["ref", "className"];
var SubMenu = /*#__PURE__*/withHovering('SubMenu', function SubMenu(_ref) {
  var ariaLabel = _ref['aria-label'],
      className = _ref.className,
      disabled = _ref.disabled,
      label = _ref.label,
      openTrigger = _ref.openTrigger,
      onMenuChange = _ref.onMenuChange,
      isHovering = _ref.isHovering,
      instanceRef = _ref.instanceRef,
      itemRef = _ref.itemRef,
      _ref$itemProps = _ref.itemProps,
      itemProps = _ref$itemProps === void 0 ? {} : _ref$itemProps,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var _useContext = useContext(SettingsContext),
      initialMounted = _useContext.initialMounted,
      unmountOnClose = _useContext.unmountOnClose,
      transition = _useContext.transition,
      transitionTimeout = _useContext.transitionTimeout,
      rootMenuRef = _useContext.rootMenuRef;

  var _useContext2 = useContext(ItemSettingsContext),
      submenuOpenDelay = _useContext2.submenuOpenDelay,
      submenuCloseDelay = _useContext2.submenuCloseDelay;

  var _useContext3 = useContext(MenuListItemContext),
      parentMenuRef = _useContext3.parentMenuRef,
      parentOverflow = _useContext3.parentOverflow,
      isParentOpen = _useContext3.isParentOpen,
      isSubmenuOpen = _useContext3.isSubmenuOpen,
      setOpenSubmenuCount = _useContext3.setOpenSubmenuCount,
      dispatch = _useContext3.dispatch,
      updateItems = _useContext3.updateItems;

  var isPortal = parentOverflow !== 'visible';

  var _useMenuStateAndFocus = useMenuStateAndFocus({
    initialMounted: initialMounted,
    unmountOnClose: unmountOnClose,
    transition: transition,
    transitionTimeout: transitionTimeout
  }),
      _openMenu = _useMenuStateAndFocus.openMenu,
      toggleMenu = _useMenuStateAndFocus.toggleMenu,
      state = _useMenuStateAndFocus.state,
      otherStateProps = _objectWithoutPropertiesLoose(_useMenuStateAndFocus, _excluded2);

  var isDisabled = !!disabled;
  var isOpen = isMenuOpen(state);

  var _useActiveState = useActiveState(isHovering, isDisabled, Keys.RIGHT),
      isActive = _useActiveState.isActive,
      onKeyUp = _useActiveState.onKeyUp,
      activeStateHandlers = _objectWithoutPropertiesLoose(_useActiveState, _excluded3);

  var containerRef = useRef(null);
  var timeoutId = useRef(0);

  var stopTimer = function stopTimer() {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = 0;
    }
  };

  var _openMenu2 = function openMenu() {
    stopTimer();
    !isDisabled && _openMenu.apply(void 0, arguments);
  };

  var setHover = function setHover() {
    return !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);
  };

  var delayOpen = function delayOpen(delay) {
    setHover();
    if (!openTrigger) timeoutId.current = setTimeout(function () {
      return batchedUpdates(_openMenu2);
    }, Math.max(delay, 0));
  };

  var handleMouseMove = function handleMouseMove() {
    if (timeoutId.current || isOpen || isDisabled) return;

    if (isSubmenuOpen) {
      timeoutId.current = setTimeout(function () {
        return delayOpen(submenuOpenDelay - submenuCloseDelay);
      }, submenuCloseDelay);
    } else {
      delayOpen(submenuOpenDelay);
    }
  };

  var handleMouseLeave = function handleMouseLeave() {
    stopTimer();
    if (!isOpen) dispatch(HoverActionTypes.UNSET, itemRef.current);
  };

  var handleKeyDown = function handleKeyDown(e) {
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

  var handleKeyUp = function handleKeyUp(e) {
    if (!isActive) return;
    onKeyUp(e);

    switch (e.key) {
      case Keys.ENTER:
      case Keys.SPACE:
      case Keys.RIGHT:
        openTrigger !== 'none' && _openMenu2(FocusPositions.FIRST);
        break;
    }
  };

  useItemEffect(isDisabled, itemRef, updateItems);
  useMenuChange(onMenuChange, isOpen);
  useEffect(function () {
    return function () {
      return clearTimeout(timeoutId.current);
    };
  }, []);
  useEffect(function () {
    if (isHovering && isParentOpen) {
      itemRef.current.focus();
    } else {
      toggleMenu(false);
    }
  }, [isHovering, isParentOpen, toggleMenu, itemRef]);
  useEffect(function () {
    setOpenSubmenuCount(function (count) {
      return isOpen ? count + 1 : Math.max(count - 1, 0);
    });
  }, [setOpenSubmenuCount, isOpen]);
  useImperativeHandle(instanceRef, function () {
    return {
      openMenu: function openMenu() {
        if (isParentOpen) {
          setHover();

          _openMenu2.apply(void 0, arguments);
        }
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
    return Object.freeze({
      open: isOpen,
      hover: isHovering,
      active: isActive,
      disabled: isDisabled,
      submenu: true
    });
  }, [isOpen, isHovering, isActive, isDisabled]);

  var externalItemRef = itemProps.ref,
      itemClassName = itemProps.className,
      restItemProps = _objectWithoutPropertiesLoose(itemProps, _excluded4);

  var itemHandlers = attachHandlerProps(_extends({}, activeStateHandlers, {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseDown: setHover,
    onClick: function onClick() {
      return openTrigger !== 'none' && _openMenu2();
    },
    onKeyUp: handleKeyUp
  }), restItemProps);

  var getMenuList = function getMenuList() {
    var menuList = /*#__PURE__*/React.createElement(MenuList, _extends({}, restProps, otherStateProps, {
      state: state,
      ariaLabel: ariaLabel || (typeof label === 'string' ? label : 'Submenu'),
      anchorRef: itemRef,
      containerRef: isPortal ? rootMenuRef : containerRef,
      parentScrollingRef: isPortal && parentMenuRef,
      isDisabled: isDisabled
    }));
    return isPortal ? /*#__PURE__*/createPortal(menuList, rootMenuRef.current) : menuList;
  };

  return /*#__PURE__*/React.createElement("li", {
    className: useBEM({
      block: menuClass,
      element: subMenuClass,
      className: className
    }),
    role: "presentation",
    ref: containerRef,
    onKeyDown: handleKeyDown
  }, /*#__PURE__*/React.createElement("div", _extends({
    role: "menuitem",
    "aria-haspopup": true,
    "aria-expanded": isOpen
  }, commonProps(isDisabled, isHovering), restItemProps, itemHandlers, {
    ref: useCombinedRef(externalItemRef, itemRef),
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers: modifiers,
      className: itemClassName
    })
  }), useMemo(function () {
    return safeCall(label, modifiers);
  }, [label, modifiers])), state && getMenuList());
});
process.env.NODE_ENV !== "production" ? SubMenu.propTypes = /*#__PURE__*/_extends({}, menuPropTypes, uncontrolledMenuPropTypes, {
  disabled: bool,
  openTrigger: /*#__PURE__*/oneOf(['none', 'clickOnly']),
  label: /*#__PURE__*/oneOfType([node, func]),
  itemProps: /*#__PURE__*/shape( /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes()))
}) : void 0;
SubMenu.defaultProps = /*#__PURE__*/_extends({}, menuDefaultProps, {
  direction: 'right'
});

export { SubMenu };
