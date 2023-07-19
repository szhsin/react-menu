import { useState, useReducer, useContext, useRef, useCallback, useEffect, useMemo } from 'react';
import { flushSync } from 'react-dom';
import { MenuContainer } from './MenuContainer.js';
import { jsxs, jsx } from 'react/jsx-runtime';
import { createSubmenuCtx } from '../utils/submenuCtx.js';
import { SettingsContext, MenuListContext, HoverActionTypes, menuClass, menuArrowClass, positionAbsolute, dummyItemProps, MenuListItemContext, HoverItemContext, Keys, CloseReason, FocusPositions } from '../utils/constants.js';
import { useItems } from '../hooks/useItems.js';
import { getScrollAncestor, floatEqual, commonProps, mergeProps, safeCall, isMenuOpen, getTransition, batchedUpdates } from '../utils/utils.js';
import { getPositionHelpers } from '../positionUtils/getPositionHelpers.js';
import { positionMenu } from '../positionUtils/positionMenu.js';
import { useLayoutEffect as useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect.js';
import { useBEM } from '../hooks/useBEM.js';
import { useCombinedRef } from '../hooks/useCombinedRef.js';

const offScreen = -9999;
const MenuList = ({
  ariaLabel,
  menuClassName,
  menuStyle,
  arrow,
  arrowProps = {},
  anchorPoint,
  anchorRef,
  containerRef,
  containerProps,
  focusProps,
  externalRef,
  parentScrollingRef,
  align = 'start',
  direction = 'bottom',
  position = 'auto',
  overflow = 'visible',
  setDownOverflow,
  repositionFlag,
  captureFocus = true,
  state,
  endTransition,
  isDisabled,
  menuItemFocus,
  gap = 0,
  shift = 0,
  children,
  onClose,
  ...restProps
}) => {
  const [menuPosition, setMenuPosition] = useState({
    x: offScreen,
    y: offScreen
  });
  const [arrowPosition, setArrowPosition] = useState({});
  const [overflowData, setOverflowData] = useState();
  const [expandedDirection, setExpandedDirection] = useState(direction);
  const [submenuCtx] = useState(createSubmenuCtx);
  const [reposSubmenu, forceReposSubmenu] = useReducer(c => c + 1, 1);
  const {
    transition,
    boundingBoxRef,
    boundingBoxPadding,
    rootMenuRef,
    rootAnchorRef,
    scrollNodesRef,
    reposition,
    viewScroll,
    submenuCloseDelay
  } = useContext(SettingsContext);
  const {
    submenuCtx: parentSubmenuCtx,
    reposSubmenu: reposFlag = repositionFlag
  } = useContext(MenuListContext);
  const menuRef = useRef(null);
  const focusRef = useRef();
  const arrowRef = useRef();
  const prevOpen = useRef(false);
  const latestMenuSize = useRef({
    width: 0,
    height: 0
  });
  const latestHandlePosition = useRef(() => {});
  const {
    hoverItem,
    dispatch,
    updateItems
  } = useItems(menuRef, focusRef);
  const isOpen = isMenuOpen(state);
  const openTransition = getTransition(transition, 'open');
  const closeTransition = getTransition(transition, 'close');
  const scrollNodes = scrollNodesRef.current;
  const onKeyDown = e => {
    switch (e.key) {
      case Keys.HOME:
        dispatch(HoverActionTypes.FIRST);
        break;
      case Keys.END:
        dispatch(HoverActionTypes.LAST);
        break;
      case Keys.UP:
        dispatch(HoverActionTypes.DECREASE, hoverItem);
        break;
      case Keys.DOWN:
        dispatch(HoverActionTypes.INCREASE, hoverItem);
        break;
      case Keys.SPACE:
        if (e.target && e.target.className.indexOf(menuClass) !== -1) {
          e.preventDefault();
        }
        return;
      default:
        return;
    }
    e.preventDefault();
    e.stopPropagation();
  };
  const onAnimationEnd = () => {
    if (state === 'closing') {
      setOverflowData();
    }
    safeCall(endTransition);
  };
  const onPointerMove = e => {
    e.stopPropagation();
    submenuCtx.on(submenuCloseDelay, () => {
      dispatch(HoverActionTypes.RESET);
      focusRef.current.focus();
    });
  };
  const onPointerLeave = e => {
    if (e.target === e.currentTarget) submenuCtx.off();
  };
  const handlePosition = useCallback(noOverflowCheck => {
    var _anchorRef$current;
    const anchorRect = anchorRef ? (_anchorRef$current = anchorRef.current) == null ? void 0 : _anchorRef$current.getBoundingClientRect() : anchorPoint ? {
      left: anchorPoint.x,
      right: anchorPoint.x,
      top: anchorPoint.y,
      bottom: anchorPoint.y,
      width: 0,
      height: 0
    } : null;
    if (!anchorRect) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('[React-Menu] Menu might not be positioned properly as one of the anchorRef or anchorPoint prop should be provided. If `anchorRef` is provided, the anchor must be mounted before menu is open.');
      }
      return;
    }
    if (!scrollNodes.menu) {
      scrollNodes.menu = (boundingBoxRef ? boundingBoxRef.current : getScrollAncestor(rootMenuRef.current)) || window;
    }
    const positionHelpers = getPositionHelpers(containerRef, menuRef, scrollNodes.menu, boundingBoxPadding);
    let {
      arrowX,
      arrowY,
      x,
      y,
      computedDirection
    } = positionMenu({
      arrow,
      align,
      direction,
      gap,
      shift,
      position,
      anchorRect,
      arrowRef,
      positionHelpers
    });
    const {
      menuRect
    } = positionHelpers;
    let menuHeight = menuRect.height;
    if (!noOverflowCheck && overflow !== 'visible') {
      const {
        getTopOverflow,
        getBottomOverflow
      } = positionHelpers;
      let height, overflowAmt;
      const prevHeight = latestMenuSize.current.height;
      const bottomOverflow = getBottomOverflow(y);
      if (bottomOverflow > 0 || floatEqual(bottomOverflow, 0) && floatEqual(menuHeight, prevHeight)) {
        height = menuHeight - bottomOverflow;
        overflowAmt = bottomOverflow;
      } else {
        const topOverflow = getTopOverflow(y);
        if (topOverflow < 0 || floatEqual(topOverflow, 0) && floatEqual(menuHeight, prevHeight)) {
          height = menuHeight + topOverflow;
          overflowAmt = 0 - topOverflow;
          if (height >= 0) y -= topOverflow;
        }
      }
      if (height >= 0) {
        menuHeight = height;
        setOverflowData({
          height,
          overflowAmt
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
      x,
      y
    });
    setExpandedDirection(computedDirection);
    latestMenuSize.current = {
      width: menuRect.width,
      height: menuHeight
    };
  }, [arrow, align, boundingBoxPadding, direction, gap, shift, position, overflow, anchorPoint, anchorRef, containerRef, boundingBoxRef, rootMenuRef, scrollNodes]);
  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      handlePosition();
      if (prevOpen.current) forceReposSubmenu();
    }
    prevOpen.current = isOpen;
    latestHandlePosition.current = handlePosition;
  }, [isOpen, handlePosition, reposFlag]);
  useIsomorphicLayoutEffect(() => {
    if (overflowData && !setDownOverflow) menuRef.current.scrollTop = 0;
  }, [overflowData, setDownOverflow]);
  useIsomorphicLayoutEffect(() => updateItems, [updateItems]);
  useEffect(() => {
    let {
      menu: menuScroll
    } = scrollNodes;
    if (!isOpen || !menuScroll) return;
    menuScroll = menuScroll.addEventListener ? menuScroll : window;
    if (!scrollNodes.anchors) {
      scrollNodes.anchors = [];
      let anchorScroll = getScrollAncestor(rootAnchorRef && rootAnchorRef.current);
      while (anchorScroll && anchorScroll !== menuScroll) {
        scrollNodes.anchors.push(anchorScroll);
        anchorScroll = getScrollAncestor(anchorScroll);
      }
    }
    let scroll = viewScroll;
    if (scrollNodes.anchors.length && scroll === 'initial') scroll = 'auto';
    if (scroll === 'initial') return;
    const handleScroll = () => {
      if (scroll === 'auto') {
        batchedUpdates(() => handlePosition(true));
      } else {
        safeCall(onClose, {
          reason: CloseReason.SCROLL
        });
      }
    };
    const scrollObservers = scrollNodes.anchors.concat(viewScroll !== 'initial' ? menuScroll : []);
    scrollObservers.forEach(o => o.addEventListener('scroll', handleScroll));
    return () => scrollObservers.forEach(o => o.removeEventListener('scroll', handleScroll));
  }, [rootAnchorRef, scrollNodes, isOpen, onClose, viewScroll, handlePosition]);
  const hasOverflow = !!overflowData && overflowData.overflowAmt > 0;
  useEffect(() => {
    if (hasOverflow || !isOpen || !parentScrollingRef) return;
    const handleScroll = () => batchedUpdates(handlePosition);
    const parentScroll = parentScrollingRef.current;
    parentScroll.addEventListener('scroll', handleScroll);
    return () => parentScroll.removeEventListener('scroll', handleScroll);
  }, [isOpen, hasOverflow, parentScrollingRef, handlePosition]);
  useEffect(() => {
    if (typeof ResizeObserver !== 'function' || reposition === 'initial') return;
    const resizeObserver = new ResizeObserver(([entry]) => {
      const {
        borderBoxSize,
        target
      } = entry;
      let width, height;
      if (borderBoxSize) {
        const {
          inlineSize,
          blockSize
        } = borderBoxSize[0] || borderBoxSize;
        width = inlineSize;
        height = blockSize;
      } else {
        const borderRect = target.getBoundingClientRect();
        width = borderRect.width;
        height = borderRect.height;
      }
      if (width === 0 || height === 0) return;
      if (floatEqual(width, latestMenuSize.current.width, 1) && floatEqual(height, latestMenuSize.current.height, 1)) return;
      flushSync(() => {
        latestHandlePosition.current();
        forceReposSubmenu();
      });
    });
    const observeTarget = menuRef.current;
    resizeObserver.observe(observeTarget, {
      box: 'border-box'
    });
    return () => resizeObserver.unobserve(observeTarget);
  }, [reposition]);
  useEffect(() => {
    if (!isOpen) {
      dispatch(HoverActionTypes.RESET);
      if (!closeTransition) setOverflowData();
      return;
    }
    const {
      position,
      alwaysUpdate
    } = menuItemFocus || {};
    const setItemFocus = () => {
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
      const id = setTimeout(() => {
        if (!menuRef.current.contains(document.activeElement)) {
          focusRef.current.focus();
          setItemFocus();
        }
      }, openTransition ? 170 : 100);
      return () => clearTimeout(id);
    }
  }, [isOpen, openTransition, closeTransition, captureFocus, menuItemFocus, dispatch]);
  const itemContext = useMemo(() => ({
    isParentOpen: isOpen,
    submenuCtx,
    dispatch,
    updateItems
  }), [isOpen, submenuCtx, dispatch, updateItems]);
  let maxHeight, overflowAmt;
  if (overflowData) {
    setDownOverflow ? overflowAmt = overflowData.overflowAmt : maxHeight = overflowData.height;
  }
  const listContext = useMemo(() => ({
    reposSubmenu,
    submenuCtx,
    overflow,
    overflowAmt,
    parentMenuRef: menuRef,
    parentDir: expandedDirection
  }), [reposSubmenu, submenuCtx, overflow, overflowAmt, expandedDirection]);
  const overflowStyle = maxHeight >= 0 ? {
    maxHeight,
    overflow
  } : undefined;
  const modifiers = useMemo(() => ({
    state,
    dir: expandedDirection
  }), [state, expandedDirection]);
  const arrowModifiers = useMemo(() => ({
    dir: expandedDirection
  }), [expandedDirection]);
  const _arrowClassName = useBEM({
    block: menuClass,
    element: menuArrowClass,
    modifiers: arrowModifiers,
    className: arrowProps.className
  });
  const menu = /*#__PURE__*/jsxs("ul", {
    role: "menu",
    "aria-label": ariaLabel,
    ...commonProps(isDisabled),
    ...mergeProps({
      onPointerEnter: parentSubmenuCtx == null ? void 0 : parentSubmenuCtx.off,
      onPointerMove,
      onPointerLeave,
      onKeyDown,
      onAnimationEnd
    }, restProps),
    ref: useCombinedRef(externalRef, menuRef),
    className: useBEM({
      block: menuClass,
      modifiers,
      className: menuClassName
    }),
    style: {
      ...menuStyle,
      ...overflowStyle,
      margin: 0,
      display: state === 'closed' ? 'none' : undefined,
      position: positionAbsolute,
      left: menuPosition.x,
      top: menuPosition.y
    },
    children: [/*#__PURE__*/jsx("li", {
      tabIndex: -1,
      style: {
        position: positionAbsolute,
        left: 0,
        top: 0,
        display: 'block',
        outline: 'none'
      },
      ref: focusRef,
      ...dummyItemProps,
      ...focusProps
    }), arrow && /*#__PURE__*/jsx("li", {
      ...dummyItemProps,
      ...arrowProps,
      className: _arrowClassName,
      style: {
        display: 'block',
        position: positionAbsolute,
        left: arrowPosition.x,
        top: arrowPosition.y,
        ...arrowProps.style
      },
      ref: arrowRef
    }), /*#__PURE__*/jsx(MenuListContext.Provider, {
      value: listContext,
      children: /*#__PURE__*/jsx(MenuListItemContext.Provider, {
        value: itemContext,
        children: /*#__PURE__*/jsx(HoverItemContext.Provider, {
          value: hoverItem,
          children: safeCall(children, modifiers)
        })
      })
    })]
  });
  return containerProps ? /*#__PURE__*/jsx(MenuContainer, {
    ...containerProps,
    isOpen: isOpen,
    children: menu
  }) : menu;
};

export { MenuList };
