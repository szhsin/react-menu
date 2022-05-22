import { objectWithoutPropertiesLoose as _objectWithoutPropertiesLoose, extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { useState, useReducer, useContext, useRef, useCallback, useEffect, useMemo } from 'react';
import { flushSync } from 'react-dom';
import { jsxs, jsx } from 'react/jsx-runtime';
import { SettingsContext, MenuListContext, HoverActionTypes, MenuListItemContext, HoverItemContext, Keys, menuClass, CloseReason, FocusPositions, menuArrowClass } from '../utils/constants.js';
import { useItems } from '../hooks/useItems.js';
import { getScrollAncestor, floatEqual, attachHandlerProps, commonProps, isMenuOpen, getTransition, safeCall, batchedUpdates } from '../utils/utils.js';
import { getPositionHelpers } from '../positionUtils/getPositionHelpers.js';
import { positionContextMenu } from '../positionUtils/positionContextMenu.js';
import { positionMenu } from '../positionUtils/positionMenu.js';
import { useLayoutEffect as useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect.js';
import { useBEM } from '../hooks/useBEM.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';

var _excluded = ["ariaLabel", "menuClassName", "menuStyle", "arrowClassName", "arrowStyle", "anchorPoint", "anchorRef", "containerRef", "externalRef", "parentScrollingRef", "arrow", "align", "direction", "position", "overflow", "setDownOverflow", "repositionFlag", "captureFocus", "state", "endTransition", "isDisabled", "menuItemFocus", "offsetX", "offsetY", "children", "onClose"];
var MenuList = function MenuList(_ref) {
  var ariaLabel = _ref.ariaLabel,
      menuClassName = _ref.menuClassName,
      menuStyle = _ref.menuStyle,
      arrowClassName = _ref.arrowClassName,
      arrowStyle = _ref.arrowStyle,
      anchorPoint = _ref.anchorPoint,
      anchorRef = _ref.anchorRef,
      containerRef = _ref.containerRef,
      externalRef = _ref.externalRef,
      parentScrollingRef = _ref.parentScrollingRef,
      arrow = _ref.arrow,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? 'start' : _ref$align,
      _ref$direction = _ref.direction,
      direction = _ref$direction === void 0 ? 'bottom' : _ref$direction,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'auto' : _ref$position,
      _ref$overflow = _ref.overflow,
      overflow = _ref$overflow === void 0 ? 'visible' : _ref$overflow,
      setDownOverflow = _ref.setDownOverflow,
      repositionFlag = _ref.repositionFlag,
      _ref$captureFocus = _ref.captureFocus,
      captureFocus = _ref$captureFocus === void 0 ? true : _ref$captureFocus,
      state = _ref.state,
      endTransition = _ref.endTransition,
      isDisabled = _ref.isDisabled,
      menuItemFocus = _ref.menuItemFocus,
      _ref$offsetX = _ref.offsetX,
      offsetX = _ref$offsetX === void 0 ? 0 : _ref$offsetX,
      _ref$offsetY = _ref.offsetY,
      offsetY = _ref$offsetY === void 0 ? 0 : _ref$offsetY,
      children = _ref.children,
      onClose = _ref.onClose,
      restProps = _objectWithoutPropertiesLoose(_ref, _excluded);

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

  var _useState5 = useState(0),
      openSubmenuCount = _useState5[0],
      setOpenSubmenuCount = _useState5[1];

  var _useReducer = useReducer(function (c) {
    return c + 1;
  }, 1),
      reposSubmenu = _useReducer[0],
      forceReposSubmenu = _useReducer[1];

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

  var reposFlag = useContext(MenuListContext).reposSubmenu || repositionFlag;
  var menuRef = useRef(null);
  var arrowRef = useRef(null);
  var prevOpen = useRef(false);
  var latestMenuSize = useRef({
    width: 0,
    height: 0
  });
  var latestHandlePosition = useRef(function () {});

  var _useItems = useItems(menuRef),
      hoverItem = _useItems.hoverItem,
      dispatch = _useItems.dispatch,
      updateItems = _useItems.updateItems;

  var isOpen = isMenuOpen(state);
  var openTransition = getTransition(transition, 'open');
  var closeTransition = getTransition(transition, 'close');

  var handleKeyDown = function handleKeyDown(e) {
    var handled = false;

    switch (e.key) {
      case Keys.HOME:
        dispatch(HoverActionTypes.FIRST);
        handled = true;
        break;

      case Keys.END:
        dispatch(HoverActionTypes.LAST);
        handled = true;
        break;

      case Keys.UP:
        dispatch(HoverActionTypes.DECREASE, hoverItem);
        handled = true;
        break;

      case Keys.DOWN:
        dispatch(HoverActionTypes.INCREASE, hoverItem);
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
    if (state === 'closing') {
      setOverflowData();
    }

    safeCall(endTransition);
  };

  var handlePosition = useCallback(function () {
    if (!containerRef.current) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[React-Menu] Menu cannot be positioned properly as container ref is null. If you need to initialise `state` prop to "open" for ControlledMenu, please see this solution: https://codesandbox.io/s/initial-open-sp10wn');
      }

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
    if (overflowData && !setDownOverflow) menuRef.current.scrollTop = 0;
  }, [overflowData, setDownOverflow]);
  useEffect(function () {
    return updateItems;
  }, [updateItems]);
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
    if (scroll === 'auto' && overflow !== 'visible') return;

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
    var resizeObserver = new ResizeObserver(function (_ref2) {
      var entry = _ref2[0];
      var borderBoxSize = entry.borderBoxSize,
          target = entry.target;
      var width, height;

      if (borderBoxSize) {
        var _ref3 = borderBoxSize[0] || borderBoxSize,
            inlineSize = _ref3.inlineSize,
            blockSize = _ref3.blockSize;

        width = inlineSize;
        height = blockSize;
      } else {
        var borderRect = target.getBoundingClientRect();
        width = borderRect.width;
        height = borderRect.height;
      }

      if (width === 0 || height === 0) return;
      if (floatEqual(width, latestMenuSize.current.width, 1) && floatEqual(height, latestMenuSize.current.height, 1)) return;
      flushSync(function () {
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
      dispatch(HoverActionTypes.RESET);
      if (!closeTransition) setOverflowData();
      return;
    }

    var _ref4 = menuItemFocus || {},
        position = _ref4.position,
        alwaysUpdate = _ref4.alwaysUpdate;

    var setItemFocus = function setItemFocus() {
      if (position === FocusPositions.FIRST) {
        dispatch(HoverActionTypes.FIRST);
      } else if (position === FocusPositions.LAST) {
        dispatch(HoverActionTypes.LAST);
      } else if (position >= -1) {
        dispatch(HoverActionTypes.SET_INDEX, undefined, position);
      }
    };

    if (alwaysUpdate) {
      setItemFocus();
    } else if (captureFocus) {
      var id = setTimeout(function () {
        if (menuRef.current && !menuRef.current.contains(document.activeElement)) {
          menuRef.current.focus();
          setItemFocus();
        }
      }, openTransition ? 170 : 100);
      return function () {
        return clearTimeout(id);
      };
    }
  }, [isOpen, openTransition, closeTransition, captureFocus, menuItemFocus, dispatch]);
  var isSubmenuOpen = openSubmenuCount > 0;
  var itemContext = useMemo(function () {
    return {
      isParentOpen: isOpen,
      isSubmenuOpen: isSubmenuOpen,
      setOpenSubmenuCount: setOpenSubmenuCount,
      dispatch: dispatch,
      updateItems: updateItems
    };
  }, [isOpen, isSubmenuOpen, dispatch, updateItems]);
  var maxHeight, overflowAmt;

  if (overflowData) {
    setDownOverflow ? overflowAmt = overflowData.overflowAmt : maxHeight = overflowData.height;
  }

  var listContext = useMemo(function () {
    return {
      reposSubmenu: reposSubmenu,
      overflow: overflow,
      overflowAmt: overflowAmt,
      parentMenuRef: menuRef,
      parentDir: expandedDirection
    };
  }, [reposSubmenu, overflow, overflowAmt, expandedDirection]);
  var overflowStyle = maxHeight >= 0 ? {
    maxHeight: maxHeight,
    overflow: overflow
  } : undefined;
  var modifiers = useMemo(function () {
    return {
      state: state,
      dir: expandedDirection
    };
  }, [state, expandedDirection]);
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

  var handlers = attachHandlerProps({
    onKeyDown: handleKeyDown,
    onAnimationEnd: handleAnimationEnd
  }, restProps);
  return /*#__PURE__*/jsxs("ul", _extends({
    role: "menu",
    "aria-label": ariaLabel
  }, restProps, handlers, commonProps(isDisabled), {
    ref: useCombinedRef(externalRef, menuRef),
    className: useBEM({
      block: menuClass,
      modifiers: modifiers,
      className: menuClassName
    }),
    style: _extends({}, menuStyle, overflowStyle, {
      left: menuPosition.x,
      top: menuPosition.y
    }),
    children: [arrow && /*#__PURE__*/jsx("div", {
      className: _arrowClass,
      style: _extends({}, arrowStyle, {
        left: arrowPosition.x,
        top: arrowPosition.y
      }),
      ref: arrowRef
    }), /*#__PURE__*/jsx(MenuListContext.Provider, {
      value: listContext,
      children: /*#__PURE__*/jsx(MenuListItemContext.Provider, {
        value: itemContext,
        children: /*#__PURE__*/jsx(HoverItemContext.Provider, {
          value: hoverItem,
          children: children
        })
      })
    })]
  }));
};

export { MenuList };
