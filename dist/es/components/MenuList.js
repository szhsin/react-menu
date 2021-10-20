import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState, useContext, useRef, useReducer, useMemo, useCallback, useEffect } from 'react';
import { SettingsContext, MenuListContext, initialHoverIndex, HoverIndexActionTypes, FocusPositions, MenuListItemContext, HoverIndexContext, SubmenuActionTypes, Keys, menuClass, CloseReason, menuArrowClass } from '../utils/constants.js';
import { cloneChildren } from '../utils/cloneChildren.js';
import { isProd, getScrollAncestor, floatEqual, batchedUpdates, attachHandlerProps, isMenuOpen, getTransition, safeCall } from '../utils/utils.js';
import { getPositionHelpers } from '../positionUtils/getPositionHelpers.js';
import { positionContextMenu } from '../positionUtils/positionContextMenu.js';
import { positionMenu } from '../positionUtils/positionMenu.js';
import { useLayoutEffect as useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect.js';
import { useBEM } from '../hooks/useBEM.js';
import { useFlatStyles } from '../hooks/useFlatStyles.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';

var _excluded = ["ariaLabel", "menuClassName", "menuStyles", "arrowClassName", "arrowStyles", "anchorPoint", "anchorRef", "containerRef", "externalRef", "parentScrollingRef", "arrow", "align", "direction", "position", "overflow", "repositionFlag", "captureFocus", "state", "endTransition", "isDisabled", "menuItemFocus", "offsetX", "offsetY", "children", "onClose"];
var MenuList = function MenuList(_ref) {
  var ariaLabel = _ref.ariaLabel,
      menuClassName = _ref.menuClassName,
      menuStyles = _ref.menuStyles,
      arrowClassName = _ref.arrowClassName,
      arrowStyles = _ref.arrowStyles,
      anchorPoint = _ref.anchorPoint,
      anchorRef = _ref.anchorRef,
      containerRef = _ref.containerRef,
      externalRef = _ref.externalRef,
      parentScrollingRef = _ref.parentScrollingRef,
      arrow = _ref.arrow,
      align = _ref.align,
      direction = _ref.direction,
      position = _ref.position,
      overflow = _ref.overflow,
      repositionFlag = _ref.repositionFlag,
      _ref$captureFocus = _ref.captureFocus,
      captureFocus = _ref$captureFocus === void 0 ? true : _ref$captureFocus,
      menuState = _ref.state,
      endTransition = _ref.endTransition,
      isDisabled = _ref.isDisabled,
      menuItemFocus = _ref.menuItemFocus,
      offsetX = _ref.offsetX,
      offsetY = _ref.offsetY,
      children = _ref.children,
      onClose = _ref.onClose,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var isOpen = isMenuOpen(menuState);

  var _useState = useState({
    x: 0,
    y: 0
  }),
      menuPosition = _useState[0],
      setMenuPosition = _useState[1];

  var _useState2 = useState({}),
      arrowPosition = _useState2[0],
      setArrowPosition = _useState2[1];

  var _useState3 = useState(),
      overflowData = _useState3[0],
      setOverflowData = _useState3[1];

  var _useState4 = useState(direction),
      expandedDirection = _useState4[0],
      setExpandedDirection = _useState4[1];

  var _useContext = useContext(SettingsContext),
      transition = _useContext.transition,
      boundingBoxRef = _useContext.boundingBoxRef,
      boundingBoxPadding = _useContext.boundingBoxPadding,
      rootMenuRef = _useContext.rootMenuRef,
      rootAnchorRef = _useContext.rootAnchorRef,
      scrollingRef = _useContext.scrollingRef,
      anchorScrollingRef = _useContext.anchorScrollingRef,
      reposition = _useContext.reposition,
      viewScroll = _useContext.viewScroll;

  var menuRef = useRef(null);
  var arrowRef = useRef(null);
  var menuItemsCount = useRef(0);
  var prevOpen = useRef(isOpen);
  var latestMenuSize = useRef({
    width: 0,
    height: 0
  });
  var latestHandlePosition = useRef(function () {});
  var descendOverflowRef = useRef(false);
  var reposFlag = useContext(MenuListContext).reposSubmenu || repositionFlag;

  var _useReducer = useReducer(function (c) {
    return c + 1;
  }, 1),
      reposSubmenu = _useReducer[0],
      forceReposSubmenu = _useReducer[1];

  var _useReducer2 = useReducer(reducer, {
    hoverIndex: initialHoverIndex,
    openSubmenuCount: 0
  }),
      _useReducer2$ = _useReducer2[0],
      hoverIndex = _useReducer2$.hoverIndex,
      openSubmenuCount = _useReducer2$.openSubmenuCount,
      dispatch = _useReducer2[1];

  var openTransition = getTransition(transition, 'open');
  var closeTransition = getTransition(transition, 'close');

  function reducer(_ref2, action) {
    var hoverIndex = _ref2.hoverIndex,
        openSubmenuCount = _ref2.openSubmenuCount;
    return {
      hoverIndex: hoverIndexReducer(hoverIndex, action),
      openSubmenuCount: submenuCountReducer(openSubmenuCount, action)
    };
  }

  function hoverIndexReducer(state, _ref3) {
    var type = _ref3.type,
        index = _ref3.index;

    switch (type) {
      case HoverIndexActionTypes.RESET:
        return initialHoverIndex;

      case HoverIndexActionTypes.SET:
        return index;

      case HoverIndexActionTypes.UNSET:
        return state === index ? initialHoverIndex : state;

      case HoverIndexActionTypes.DECREASE:
        {
          var i = state;
          i--;
          if (i < 0) i = menuItemsCount.current - 1;
          return i;
        }

      case HoverIndexActionTypes.INCREASE:
        {
          var _i = state;
          _i++;
          if (_i >= menuItemsCount.current) _i = 0;
          return _i;
        }

      case HoverIndexActionTypes.FIRST:
        return menuItemsCount.current > 0 ? 0 : initialHoverIndex;

      case HoverIndexActionTypes.LAST:
        return menuItemsCount.current > 0 ? menuItemsCount.current - 1 : initialHoverIndex;

      default:
        return state;
    }
  }

  var menuItems = useMemo(function () {
    var _cloneChildren = cloneChildren(children),
        items = _cloneChildren.items,
        index = _cloneChildren.index,
        descendOverflow = _cloneChildren.descendOverflow;

    menuItemsCount.current = index;
    descendOverflowRef.current = descendOverflow;
    return items;
  }, [children]);

  var handleKeyDown = function handleKeyDown(e) {
    var handled = false;

    switch (e.key) {
      case Keys.HOME:
        dispatch({
          type: HoverIndexActionTypes.FIRST
        });
        handled = true;
        break;

      case Keys.END:
        dispatch({
          type: HoverIndexActionTypes.LAST
        });
        handled = true;
        break;

      case Keys.UP:
        dispatch({
          type: HoverIndexActionTypes.DECREASE
        });
        handled = true;
        break;

      case Keys.DOWN:
        dispatch({
          type: HoverIndexActionTypes.INCREASE
        });
        handled = true;
        break;

      case Keys.SPACE:
        if (e.target && e.target.className.indexOf(menuClass) !== -1) {
          e.preventDefault();
        }

        break;
    }

    if (handled) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  var handleAnimationEnd = function handleAnimationEnd() {
    if (menuState === 'closing') {
      setOverflowData();
    }

    safeCall(endTransition);
  };

  var handlePosition = useCallback(function () {
    if (!containerRef.current) {
      if (!isProd) throw new Error('[React-Menu] Menu cannot be positioned properly as container ref is null. If you initialise isOpen prop to true for ControlledMenu, please see this link for a solution: https://github.com/szhsin/react-menu/issues/2#issuecomment-719166062');
      return;
    }

    if (!scrollingRef.current) {
      scrollingRef.current = boundingBoxRef ? boundingBoxRef.current : getScrollAncestor(rootMenuRef.current);
    }

    var positionHelpers = getPositionHelpers({
      menuRef: menuRef,
      containerRef: containerRef,
      scrollingRef: scrollingRef,
      boundingBoxPadding: boundingBoxPadding
    });
    var menuRect = positionHelpers.menuRect;
    var results = {
      computedDirection: 'bottom'
    };

    if (anchorPoint) {
      results = positionContextMenu({
        positionHelpers: positionHelpers,
        anchorPoint: anchorPoint
      });
    } else if (anchorRef) {
      results = positionMenu({
        arrow: arrow,
        align: align,
        direction: direction,
        offsetX: offsetX,
        offsetY: offsetY,
        position: position,
        anchorRef: anchorRef,
        arrowRef: arrowRef,
        positionHelpers: positionHelpers
      });
    }

    var _results = results,
        arrowX = _results.arrowX,
        arrowY = _results.arrowY,
        x = _results.x,
        y = _results.y,
        computedDirection = _results.computedDirection;
    var menuHeight = menuRect.height;

    if (overflow !== 'visible') {
      var getTopOverflow = positionHelpers.getTopOverflow,
          getBottomOverflow = positionHelpers.getBottomOverflow;

      var height, _overflowAmt;

      var prevHeight = latestMenuSize.current.height;
      var bottomOverflow = getBottomOverflow(y);

      if (bottomOverflow > 0 || floatEqual(bottomOverflow, 0) && floatEqual(menuHeight, prevHeight)) {
        height = menuHeight - bottomOverflow;
        _overflowAmt = bottomOverflow;
      } else {
        var topOverflow = getTopOverflow(y);

        if (topOverflow < 0 || floatEqual(topOverflow, 0) && floatEqual(menuHeight, prevHeight)) {
          height = menuHeight + topOverflow;
          _overflowAmt = 0 - topOverflow;
          if (height >= 0) y -= topOverflow;
        }
      }

      if (height >= 0) {
        menuHeight = height;
        setOverflowData({
          height: height,
          overflowAmt: _overflowAmt
        });
      } else {
        setOverflowData();
      }
    }

    if (arrow) setArrowPosition({
      x: arrowX,
      y: arrowY
    });
    setMenuPosition({
      x: x,
      y: y
    });
    setExpandedDirection(computedDirection);
    latestMenuSize.current = {
      width: menuRect.width,
      height: menuHeight
    };
  }, [arrow, align, boundingBoxPadding, direction, offsetX, offsetY, position, overflow, anchorPoint, anchorRef, containerRef, boundingBoxRef, rootMenuRef, scrollingRef]);
  useIsomorphicLayoutEffect(function () {
    if (isOpen) {
      handlePosition();
      if (prevOpen.current) forceReposSubmenu();
    }

    prevOpen.current = isOpen;
    latestHandlePosition.current = handlePosition;
  }, [isOpen, handlePosition, reposFlag]);
  useIsomorphicLayoutEffect(function () {
    if (overflowData && !descendOverflowRef.current) menuRef.current.scrollTop = 0;
  }, [overflowData]);
  useEffect(function () {
    if (!isOpen) return;

    if (!anchorScrollingRef.current && rootAnchorRef && rootAnchorRef.current.tagName) {
      anchorScrollingRef.current = getScrollAncestor(rootAnchorRef.current);
    }

    var scrollCurrent = scrollingRef.current;
    var menuScroll = scrollCurrent && scrollCurrent.addEventListener ? scrollCurrent : window;
    var anchorScroll = anchorScrollingRef.current || menuScroll;
    var scroll = viewScroll;
    if (anchorScroll !== menuScroll && scroll === 'initial') scroll = 'auto';
    if (scroll === 'initial') return;
    if (scroll === 'auto' && overflow !== 'visible') scroll = 'close';

    var handleScroll = function handleScroll() {
      if (scroll === 'auto') {
        batchedUpdates(handlePosition);
      } else {
        safeCall(onClose, {
          reason: CloseReason.SCROLL
        });
      }
    };

    var scrollObservers = anchorScroll !== menuScroll && viewScroll !== 'initial' ? [anchorScroll, menuScroll] : [anchorScroll];
    scrollObservers.forEach(function (o) {
      return o.addEventListener('scroll', handleScroll);
    });
    return function () {
      return scrollObservers.forEach(function (o) {
        return o.removeEventListener('scroll', handleScroll);
      });
    };
  }, [rootAnchorRef, anchorScrollingRef, scrollingRef, isOpen, overflow, onClose, viewScroll, handlePosition]);
  var hasOverflow = !!overflowData && overflowData.overflowAmt > 0;
  useEffect(function () {
    if (hasOverflow || !isOpen || !parentScrollingRef) return;

    var handleScroll = function handleScroll() {
      return batchedUpdates(handlePosition);
    };

    var parentScroll = parentScrollingRef.current;
    parentScroll.addEventListener('scroll', handleScroll);
    return function () {
      return parentScroll.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, hasOverflow, parentScrollingRef, handlePosition]);
  useEffect(function () {
    if (typeof ResizeObserver !== 'function' || reposition === 'initial') return;
    var resizeObserver = new ResizeObserver(function (_ref4) {
      var entry = _ref4[0];
      var borderBoxSize = entry.borderBoxSize,
          target = entry.target;
      var width, height;

      if (borderBoxSize) {
        var _ref5 = borderBoxSize[0] || borderBoxSize,
            inlineSize = _ref5.inlineSize,
            blockSize = _ref5.blockSize;

        width = inlineSize;
        height = blockSize;
      } else {
        var borderRect = target.getBoundingClientRect();
        width = borderRect.width;
        height = borderRect.height;
      }

      if (width === 0 || height === 0) return;
      if (floatEqual(width, latestMenuSize.current.width, 1) && floatEqual(height, latestMenuSize.current.height, 1)) return;
      batchedUpdates(function () {
        latestHandlePosition.current();
        forceReposSubmenu();
      });
    });
    var observeTarget = menuRef.current;
    resizeObserver.observe(observeTarget, {
      box: 'border-box'
    });
    return function () {
      return resizeObserver.unobserve(observeTarget);
    };
  }, [reposition]);
  useEffect(function () {
    if (!isOpen) {
      dispatch({
        type: HoverIndexActionTypes.RESET
      });
      if (!closeTransition) setOverflowData();
      return;
    }

    var id = setTimeout(function () {
      if (!menuRef.current) return;

      var _ref6 = menuItemFocus || {},
          position = _ref6.position,
          alwaysUpdate = _ref6.alwaysUpdate;

      if (!alwaysUpdate && menuRef.current.contains(document.activeElement)) return;
      if (captureFocus) menuRef.current.focus();

      if (position === FocusPositions.FIRST) {
        dispatch({
          type: HoverIndexActionTypes.FIRST
        });
      } else if (position === FocusPositions.LAST) {
        dispatch({
          type: HoverIndexActionTypes.LAST
        });
      } else if (position >= 0 && position < menuItemsCount.current) {
        dispatch({
          type: HoverIndexActionTypes.SET,
          index: position
        });
      }
    }, openTransition ? 170 : 100);
    return function () {
      return clearTimeout(id);
    };
  }, [openTransition, closeTransition, captureFocus, isOpen, menuItemFocus]);
  var isSubmenuOpen = openSubmenuCount > 0;
  var itemContext = useMemo(function () {
    return {
      parentMenuRef: menuRef,
      parentOverflow: overflow,
      isParentOpen: isOpen,
      isSubmenuOpen: isSubmenuOpen,
      dispatch: dispatch
    };
  }, [isOpen, isSubmenuOpen, overflow]);
  var maxHeight, overflowAmt;

  if (overflowData) {
    descendOverflowRef.current ? overflowAmt = overflowData.overflowAmt : maxHeight = overflowData.height;
  }

  var listContext = useMemo(function () {
    return {
      reposSubmenu: reposSubmenu,
      overflow: overflow,
      overflowAmt: overflowAmt
    };
  }, [reposSubmenu, overflow, overflowAmt]);
  var overflowStyles = maxHeight >= 0 ? {
    maxHeight: maxHeight,
    overflow: overflow
  } : undefined;
  var modifiers = useMemo(function () {
    return {
      state: menuState,
      dir: expandedDirection
    };
  }, [menuState, expandedDirection]);
  var arrowModifiers = useMemo(function () {
    return Object.freeze({
      dir: expandedDirection
    });
  }, [expandedDirection]);

  var _arrowClass = useBEM({
    block: menuClass,
    element: menuArrowClass,
    modifiers: arrowModifiers,
    className: arrowClassName
  });

  var _arrowStyles = useFlatStyles(arrowStyles, arrowModifiers);

  var handlers = attachHandlerProps({
    onKeyDown: handleKeyDown,
    onAnimationEnd: handleAnimationEnd
  }, restProps);
  return /*#__PURE__*/React.createElement("ul", _extends({
    role: "menu",
    tabIndex: "-1",
    "aria-disabled": isDisabled || undefined,
    "aria-label": ariaLabel
  }, restProps, handlers, {
    ref: useCombinedRef(externalRef, menuRef),
    className: useBEM({
      block: menuClass,
      modifiers: modifiers,
      className: menuClassName
    }),
    style: _extends({}, useFlatStyles(menuStyles, modifiers), overflowStyles, {
      left: menuPosition.x + "px",
      top: menuPosition.y + "px"
    })
  }), arrow && /*#__PURE__*/React.createElement("div", {
    className: _arrowClass,
    style: _extends({}, _arrowStyles, {
      left: arrowPosition.x && arrowPosition.x + "px",
      top: arrowPosition.y && arrowPosition.y + "px"
    }),
    ref: arrowRef
  }), /*#__PURE__*/React.createElement(MenuListContext.Provider, {
    value: listContext
  }, /*#__PURE__*/React.createElement(MenuListItemContext.Provider, {
    value: itemContext
  }, /*#__PURE__*/React.createElement(HoverIndexContext.Provider, {
    value: hoverIndex
  }, menuItems))));
};

function submenuCountReducer(state, _ref7) {
  var type = _ref7.type;

  switch (type) {
    case SubmenuActionTypes.OPEN:
      return state + 1;

    case SubmenuActionTypes.CLOSE:
      return Math.max(state - 1, 0);

    default:
      return state;
  }
}

export { MenuList };
