import { useState, useReducer, useContext, useRef, useCallback, useEffect, useMemo } from 'react';
import { flushSync } from 'react-dom';
import { MenuContainer } from './MenuContainer.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { createSubmenuCtx } from '../utils/submenuCtx.mjs';
import { SettingsContext, MenuListContext, HoverActionTypes, noScrollFocus, menuClass, menuArrowClass, positionAbsolute, MenuListItemContext, HoverItemContext, CloseReason, FocusPositions, Keys } from '../utils/constants.mjs';
import { useItems } from '../hooks/useItems.mjs';
import { getScrollAncestor, isMenuOpen, batchedUpdates, getTransition, mergeProps, commonProps, safeCall } from '../utils/utils.mjs';
import { getPositionHelpers } from '../positionUtils/getPositionHelpers.mjs';
import { positionMenu } from '../positionUtils/positionMenu.mjs';
import { useLayoutEffect as useIsomorphicLayoutEffect } from '../hooks/useIsomorphicLayoutEffect.mjs';
import { useBEM } from '../hooks/useBEM.mjs';
import { useCombinedRef } from '../hooks/useCombinedRef.mjs';

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
  focusProps: _1,
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
  const menuRef = useRef();
  const arrowRef = useRef();
  const prevOpen = useRef(false);
  const {
    hoverItem,
    dispatch,
    updateItems
  } = useItems(menuRef);
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
      menuRef.current.focus(noScrollFocus);
    });
  };
  const onPointerLeave = e => {
    if (e.target === e.currentTarget) submenuCtx.off();
  };
  const handlePosition = useCallback(noOverflowCheck => {
    const menuElt = menuRef.current;
    const containerElt = containerRef.current;
    if (!menuElt || !containerElt) return;
    const anchorRect = anchorRef ? anchorRef.current?.getBoundingClientRect() : anchorPoint ? {
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
    const positionHelpers = getPositionHelpers(containerElt, menuElt, scrollNodes.menu, boundingBoxPadding);
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
    const menuHeight = menuRect.height;
    if (!noOverflowCheck && overflow !== 'visible') {
      const {
        getTopOverflow,
        getBottomOverflow
      } = positionHelpers;
      let height, overflowAmt;
      const bottomOverflow = getBottomOverflow(y);
      if (bottomOverflow > 0) {
        height = menuHeight - bottomOverflow;
        overflowAmt = bottomOverflow;
      } else {
        const topOverflow = getTopOverflow(y);
        if (topOverflow < 0) {
          height = menuHeight + topOverflow;
          overflowAmt = 0 - topOverflow;
          if (height >= 0) y -= topOverflow;
        }
      }
      if (height >= 0) {
        setOverflowData({
          height,
          overflowAmt
        });
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
  }, [arrow, align, boundingBoxPadding, direction, gap, shift, position, overflow, anchorPoint, anchorRef, containerRef, boundingBoxRef, rootMenuRef, scrollNodes]);
  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      handlePosition();
      if (prevOpen.current) forceReposSubmenu();
    }
    prevOpen.current = isOpen;
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
    if (!isOpen || typeof ResizeObserver !== 'function' || reposition === 'initial') return;
    const targetList = [];
    const resizeObserver = new ResizeObserver(entries => entries.forEach(({
      target
    }) => {
      if (targetList.indexOf(target) < 0) {
        targetList.push(target);
      } else {
        flushSync(() => {
          handlePosition();
          forceReposSubmenu();
        });
      }
    }));
    const resizeObserverOptions = {
      box: 'border-box'
    };
    resizeObserver.observe(menuRef.current, resizeObserverOptions);
    const anchor = anchorRef?.current;
    anchor && resizeObserver.observe(anchor, resizeObserverOptions);
    return () => resizeObserver.disconnect();
  }, [isOpen, reposition, anchorRef, handlePosition]);
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
        const menuElt = menuRef.current;
        if (menuElt && !menuElt.contains(document.activeElement)) {
          menuElt.focus(noScrollFocus);
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
    align,
    dir: expandedDirection
  }), [state, align, expandedDirection]);
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
      onPointerEnter: parentSubmenuCtx?.off,
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
    children: [arrow && /*#__PURE__*/jsx("li", {
      "aria-hidden": true,
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
