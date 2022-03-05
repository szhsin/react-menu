import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { useContext, useRef, useEffect, useImperativeHandle, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { bool, oneOf, oneOfType, node, func, shape } from 'prop-types';
import { MenuList } from './MenuList.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { withHovering } from '../utils/withHovering.js';
import { useMenuStateAndFocus } from '../hooks/useMenuStateAndFocus.js';
import { useItemEffect } from '../hooks/useItemEffect.js';
import { useMenuChange } from '../hooks/useMenuChange.js';
import { useBEM } from '../hooks/useBEM.js';
import { SettingsContext, ItemSettingsContext, MenuListItemContext, HoverActionTypes, menuClass, subMenuClass, menuItemClass, Keys, FocusPositions } from '../utils/constants.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';
import { menuPropTypes, uncontrolledMenuPropTypes, stylePropTypes } from '../utils/propTypes.js';
import { isMenuOpen, attachHandlerProps, safeCall, commonProps, batchedUpdates } from '../utils/utils.js';

var _excluded = ["aria-label", "className", "disabled", "direction", "label", "openTrigger", "onMenuChange", "isHovering", "instanceRef", "itemRef", "captureFocus", "repositionFlag", "itemProps"],
    _excluded2 = ["ref", "className"];
var SubMenu = /*#__PURE__*/withHovering('SubMenu', function SubMenu(_ref) {
  var ariaLabel = _ref['aria-label'],
      className = _ref.className,
      disabled = _ref.disabled,
      _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'right' : _ref$direction,
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
  var rootMenuRef = settings.rootMenuRef;

  var _useContext = useContext(ItemSettingsContext),
      submenuOpenDelay = _useContext.submenuOpenDelay,
      submenuCloseDelay = _useContext.submenuCloseDelay;

  var _useContext2 = useContext(MenuListItemContext),
      parentMenuRef = _useContext2.parentMenuRef,
      parentOverflow = _useContext2.parentOverflow,
      isParentOpen = _useContext2.isParentOpen,
      isSubmenuOpen = _useContext2.isSubmenuOpen,
      setOpenSubmenuCount = _useContext2.setOpenSubmenuCount,
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

  var handleItemKeyDown = function handleItemKeyDown(e) {
    if (!isHovering) return;

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
      disabled: isDisabled,
      submenu: true
    });
  }, [isOpen, isHovering, isDisabled]);

  var externalItemRef = itemProps.ref,
      itemClassName = itemProps.className,
      restItemProps = _objectWithoutPropertiesLoose(itemProps, _excluded2);

  var itemHandlers = attachHandlerProps({
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onMouseDown: setHover,
    onKeyDown: handleItemKeyDown,
    onClick: function onClick() {
      return openTrigger !== 'none' && _openMenu2();
    }
  }, restItemProps);

  var getMenuList = function getMenuList() {
    var menuList = /*#__PURE__*/jsx(MenuList, _extends({}, restProps, stateProps, {
      ariaLabel: ariaLabel || (typeof label === 'string' ? label : 'Submenu'),
      anchorRef: itemRef,
      containerRef: isPortal ? rootMenuRef : containerRef,
      direction: direction,
      parentScrollingRef: isPortal && parentMenuRef,
      isDisabled: isDisabled
    }));

    return isPortal ? /*#__PURE__*/createPortal(menuList, rootMenuRef.current) : menuList;
  };

  return /*#__PURE__*/jsxs("li", {
    className: useBEM({
      block: menuClass,
      element: subMenuClass,
      className: className
    }),
    role: "presentation",
    ref: containerRef,
    onKeyDown: handleKeyDown,
    children: [/*#__PURE__*/jsx("div", _extends({
      role: "menuitem",
      "aria-haspopup": true,
      "aria-expanded": isOpen
    }, restItemProps, itemHandlers, commonProps(isDisabled, isHovering), {
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
