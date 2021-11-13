import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import React, { memo, useContext, useRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { bool, oneOfType, node, func, shape } from 'prop-types';
import { MenuList } from './MenuList.js';
import { withHovering } from '../utils/withHovering.js';
import { validateIndex, attachHandlerProps, safeCall, isMenuOpen } from '../utils/utils.js';
import { useMenuStateAndFocus } from '../hooks/useMenuStateAndFocus.js';
import { useActiveState } from '../hooks/useActiveState.js';
import { useMenuChange } from '../hooks/useMenuChange.js';
import { useBEM } from '../hooks/useBEM.js';
import { SettingsContext, ItemSettingsContext, MenuListItemContext, Keys, SubmenuActionTypes, HoverIndexActionTypes, menuClass, subMenuClass, menuItemClass, FocusPositions } from '../utils/constants.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { useFlatStyles } from '../hooks/useFlatStyles.js';
import { menuPropTypes, uncontrolledMenuPropTypes, stylePropTypes, menuDefaultProps } from '../utils/propTypes.js';

var _excluded = ["aria-label", "className", "disabled", "label", "index", "onMenuChange", "isHovering", "instanceRef", "captureFocus", "repositionFlag", "itemProps"],
    _excluded2 = ["openMenu", "toggleMenu", "state"],
    _excluded3 = ["isActive", "onKeyUp"],
    _excluded4 = ["ref", "className", "styles"];
var SubMenu = /*#__PURE__*/withHovering( /*#__PURE__*/memo(function SubMenu(_ref) {
  var ariaLabel = _ref['aria-label'],
      className = _ref.className,
      disabled = _ref.disabled,
      label = _ref.label,
      index = _ref.index,
      onMenuChange = _ref.onMenuChange,
      isHovering = _ref.isHovering,
      instanceRef = _ref.instanceRef,
      _ref$itemProps = _ref.itemProps,
      itemProps = _ref$itemProps === void 0 ? {} : _ref$itemProps,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var isDisabled = !!disabled;
  validateIndex(index, isDisabled, label);

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
      dispatch = _useContext3.dispatch;

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

  var isOpen = isMenuOpen(state);

  var _useActiveState = useActiveState(isHovering, isDisabled, Keys.RIGHT),
      isActive = _useActiveState.isActive,
      onKeyUp = _useActiveState.onKeyUp,
      activeStateHandlers = _objectWithoutPropertiesLoose(_useActiveState, _excluded3);

  var containerRef = useRef(null);
  var itemRef = useRef(null);
  var timeoutId = useRef();

  var setHover = function setHover() {
    return !isHovering && dispatch({
      type: HoverIndexActionTypes.SET,
      index: index
    });
  };

  var delayOpen = function delayOpen(delay) {
    dispatch({
      type: HoverIndexActionTypes.SET,
      index: index
    });
    timeoutId.current = setTimeout(_openMenu, Math.max(delay, 0));
  };

  var handleMouseEnter = function handleMouseEnter() {
    if (isDisabled || isOpen) return;

    if (isSubmenuOpen) {
      timeoutId.current = setTimeout(function () {
        return delayOpen(submenuOpenDelay - submenuCloseDelay);
      }, submenuCloseDelay);
    } else {
      delayOpen(submenuOpenDelay);
    }
  };

  var handleMouseLeave = function handleMouseLeave() {
    clearTimeout(timeoutId.current);

    if (!isOpen) {
      dispatch({
        type: HoverIndexActionTypes.UNSET,
        index: index
      });
    }
  };

  var handleClick = function handleClick() {
    if (isDisabled) return;
    clearTimeout(timeoutId.current);

    _openMenu();
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
        _openMenu(FocusPositions.FIRST);

        break;
    }
  };

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
  }, [isHovering, isParentOpen, toggleMenu]);
  useEffect(function () {
    dispatch({
      type: isOpen ? SubmenuActionTypes.OPEN : SubmenuActionTypes.CLOSE
    });
  }, [dispatch, isOpen]);
  useMenuChange(onMenuChange, isOpen);
  useImperativeHandle(instanceRef, function () {
    return {
      openMenu: function openMenu() {
        if (isParentOpen) {
          setHover();

          _openMenu.apply(void 0, arguments);
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

  var externaItemlRef = itemProps.ref,
      itemClassName = itemProps.className,
      itemStyles = itemProps.styles,
      restItemProps = _objectWithoutPropertiesLoose(itemProps, _excluded4);

  var itemHandlers = attachHandlerProps(_extends({}, activeStateHandlers, {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: setHover,
    onClick: handleClick,
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
    "aria-expanded": isOpen,
    "aria-disabled": isDisabled || undefined,
    tabIndex: isHovering && !isOpen ? 0 : -1
  }, restItemProps, itemHandlers, {
    ref: useCombinedRef(externaItemlRef, itemRef),
    className: useBEM({
      block: menuClass,
      element: menuItemClass,
      modifiers: modifiers,
      className: itemClassName
    }),
    style: useFlatStyles(itemStyles, modifiers)
  }), useMemo(function () {
    return safeCall(label, modifiers);
  }, [label, modifiers])), state && getMenuList());
}), 'SubMenu');
process.env.NODE_ENV !== "production" ? SubMenu.propTypes = /*#__PURE__*/_extends({}, menuPropTypes, uncontrolledMenuPropTypes, {
  disabled: bool,
  label: /*#__PURE__*/oneOfType([node, func]),
  itemProps: /*#__PURE__*/shape( /*#__PURE__*/_extends({}, /*#__PURE__*/stylePropTypes()))
}) : void 0;
SubMenu.defaultProps = /*#__PURE__*/_extends({}, menuDefaultProps, {
  direction: 'right'
});

export { SubMenu };
