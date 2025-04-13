'use strict';

var react = require('react');
var reactDom = require('react-dom');
var MenuContainer = require('./MenuContainer.cjs');
var jsxRuntime = require('react/jsx-runtime');
var submenuCtx = require('../utils/submenuCtx.cjs');
var constants = require('../utils/constants.cjs');
var useItems = require('../hooks/useItems.cjs');
var utils = require('../utils/utils.cjs');
var getPositionHelpers = require('../positionUtils/getPositionHelpers.cjs');
var positionMenu = require('../positionUtils/positionMenu.cjs');
var useIsomorphicLayoutEffect = require('../hooks/useIsomorphicLayoutEffect.cjs');
var useBEM = require('../hooks/useBEM.cjs');
var useCombinedRef = require('../hooks/useCombinedRef.cjs');

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
  const [menuPosition, setMenuPosition] = react.useState({
    x: offScreen,
    y: offScreen
  });
  const [arrowPosition, setArrowPosition] = react.useState({});
  const [overflowData, setOverflowData] = react.useState();
  const [expandedDirection, setExpandedDirection] = react.useState(direction);
  const [submenuCtx$1] = react.useState(submenuCtx.createSubmenuCtx);
  const [reposSubmenu, forceReposSubmenu] = react.useReducer(c => c + 1, 1);
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
  } = react.useContext(constants.SettingsContext);
  const {
    submenuCtx: parentSubmenuCtx,
    reposSubmenu: reposFlag = repositionFlag
  } = react.useContext(constants.MenuListContext);
  const menuRef = react.useRef();
  const arrowRef = react.useRef();
  const prevOpen = react.useRef(false);
  const {
    hoverItem,
    dispatch,
    updateItems
  } = useItems.useItems(menuRef);
  const isOpen = utils.isMenuOpen(state);
  const openTransition = utils.getTransition(transition, 'open');
  const closeTransition = utils.getTransition(transition, 'close');
  const scrollNodes = scrollNodesRef.current;
  const onKeyDown = e => {
    switch (e.key) {
      case constants.Keys.HOME:
        dispatch(constants.HoverActionTypes.FIRST);
        break;
      case constants.Keys.END:
        dispatch(constants.HoverActionTypes.LAST);
        break;
      case constants.Keys.UP:
        dispatch(constants.HoverActionTypes.DECREASE, hoverItem);
        break;
      case constants.Keys.DOWN:
        dispatch(constants.HoverActionTypes.INCREASE, hoverItem);
        break;
      case constants.Keys.SPACE:
        if (e.target && e.target.className.indexOf(constants.menuClass) !== -1) {
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
    utils.safeCall(endTransition);
  };
  const onPointerMove = e => {
    e.stopPropagation();
    submenuCtx$1.on(submenuCloseDelay, () => {
      dispatch(constants.HoverActionTypes.RESET);
      menuRef.current.focus(constants.noScrollFocus);
    });
  };
  const onPointerLeave = e => {
    if (e.target === e.currentTarget) submenuCtx$1.off();
  };
  const handlePosition = react.useCallback(noOverflowCheck => {
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
      scrollNodes.menu = (boundingBoxRef ? boundingBoxRef.current : utils.getScrollAncestor(rootMenuRef.current)) || window;
    }
    const positionHelpers = getPositionHelpers.getPositionHelpers(containerRef, menuRef, scrollNodes.menu, boundingBoxPadding);
    let {
      arrowX,
      arrowY,
      x,
      y,
      computedDirection
    } = positionMenu.positionMenu({
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
  useIsomorphicLayoutEffect.useLayoutEffect(() => {
    if (isOpen) {
      handlePosition();
      if (prevOpen.current) forceReposSubmenu();
    }
    prevOpen.current = isOpen;
  }, [isOpen, handlePosition, reposFlag]);
  useIsomorphicLayoutEffect.useLayoutEffect(() => {
    if (overflowData && !setDownOverflow) menuRef.current.scrollTop = 0;
  }, [overflowData, setDownOverflow]);
  useIsomorphicLayoutEffect.useLayoutEffect(() => updateItems, [updateItems]);
  react.useEffect(() => {
    let {
      menu: menuScroll
    } = scrollNodes;
    if (!isOpen || !menuScroll) return;
    menuScroll = menuScroll.addEventListener ? menuScroll : window;
    if (!scrollNodes.anchors) {
      scrollNodes.anchors = [];
      let anchorScroll = utils.getScrollAncestor(rootAnchorRef && rootAnchorRef.current);
      while (anchorScroll && anchorScroll !== menuScroll) {
        scrollNodes.anchors.push(anchorScroll);
        anchorScroll = utils.getScrollAncestor(anchorScroll);
      }
    }
    let scroll = viewScroll;
    if (scrollNodes.anchors.length && scroll === 'initial') scroll = 'auto';
    if (scroll === 'initial') return;
    const handleScroll = () => {
      if (scroll === 'auto') {
        utils.batchedUpdates(() => handlePosition(true));
      } else {
        utils.safeCall(onClose, {
          reason: constants.CloseReason.SCROLL
        });
      }
    };
    const scrollObservers = scrollNodes.anchors.concat(viewScroll !== 'initial' ? menuScroll : []);
    scrollObservers.forEach(o => o.addEventListener('scroll', handleScroll));
    return () => scrollObservers.forEach(o => o.removeEventListener('scroll', handleScroll));
  }, [rootAnchorRef, scrollNodes, isOpen, onClose, viewScroll, handlePosition]);
  const hasOverflow = !!overflowData && overflowData.overflowAmt > 0;
  react.useEffect(() => {
    if (hasOverflow || !isOpen || !parentScrollingRef) return;
    const handleScroll = () => utils.batchedUpdates(handlePosition);
    const parentScroll = parentScrollingRef.current;
    parentScroll.addEventListener('scroll', handleScroll);
    return () => parentScroll.removeEventListener('scroll', handleScroll);
  }, [isOpen, hasOverflow, parentScrollingRef, handlePosition]);
  react.useEffect(() => {
    if (!isOpen || typeof ResizeObserver !== 'function' || reposition === 'initial') return;
    const targetList = [];
    const resizeObserver = new ResizeObserver(entries => entries.forEach(({
      target
    }) => {
      if (targetList.indexOf(target) < 0) {
        targetList.push(target);
      } else {
        reactDom.flushSync(() => {
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
  react.useEffect(() => {
    if (!isOpen) {
      dispatch(constants.HoverActionTypes.RESET);
      if (!closeTransition) setOverflowData();
      return;
    }
    const {
      position,
      alwaysUpdate
    } = menuItemFocus || {};
    const setItemFocus = () => {
      if (position === constants.FocusPositions.FIRST) {
        dispatch(constants.HoverActionTypes.FIRST);
      } else if (position === constants.FocusPositions.LAST) {
        dispatch(constants.HoverActionTypes.LAST);
      } else if (position >= -1) {
        dispatch(constants.HoverActionTypes.SET_INDEX, undefined, position);
      }
    };
    if (alwaysUpdate) {
      setItemFocus();
    } else if (captureFocus) {
      const id = setTimeout(() => {
        const menuElt = menuRef.current;
        if (menuElt && !menuElt.contains(document.activeElement)) {
          menuElt.focus(constants.noScrollFocus);
          setItemFocus();
        }
      }, openTransition ? 170 : 100);
      return () => clearTimeout(id);
    }
  }, [isOpen, openTransition, closeTransition, captureFocus, menuItemFocus, dispatch]);
  const itemContext = react.useMemo(() => ({
    isParentOpen: isOpen,
    submenuCtx: submenuCtx$1,
    dispatch,
    updateItems
  }), [isOpen, submenuCtx$1, dispatch, updateItems]);
  let maxHeight, overflowAmt;
  if (overflowData) {
    setDownOverflow ? overflowAmt = overflowData.overflowAmt : maxHeight = overflowData.height;
  }
  const listContext = react.useMemo(() => ({
    reposSubmenu,
    submenuCtx: submenuCtx$1,
    overflow,
    overflowAmt,
    parentMenuRef: menuRef,
    parentDir: expandedDirection
  }), [reposSubmenu, submenuCtx$1, overflow, overflowAmt, expandedDirection]);
  const overflowStyle = maxHeight >= 0 ? {
    maxHeight,
    overflow
  } : undefined;
  const modifiers = react.useMemo(() => ({
    state,
    align,
    dir: expandedDirection
  }), [state, align, expandedDirection]);
  const arrowModifiers = react.useMemo(() => ({
    dir: expandedDirection
  }), [expandedDirection]);
  const _arrowClassName = useBEM.useBEM({
    block: constants.menuClass,
    element: constants.menuArrowClass,
    modifiers: arrowModifiers,
    className: arrowProps.className
  });
  const menu = /*#__PURE__*/jsxRuntime.jsxs("ul", {
    role: "menu",
    "aria-label": ariaLabel,
    ...utils.commonProps(isDisabled),
    ...utils.mergeProps({
      onPointerEnter: parentSubmenuCtx?.off,
      onPointerMove,
      onPointerLeave,
      onKeyDown,
      onAnimationEnd
    }, restProps),
    ref: useCombinedRef.useCombinedRef(externalRef, menuRef),
    className: useBEM.useBEM({
      block: constants.menuClass,
      modifiers,
      className: menuClassName
    }),
    style: {
      ...menuStyle,
      ...overflowStyle,
      margin: 0,
      display: state === 'closed' ? 'none' : undefined,
      position: constants.positionAbsolute,
      left: menuPosition.x,
      top: menuPosition.y
    },
    children: [arrow && /*#__PURE__*/jsxRuntime.jsx("li", {
      "aria-hidden": true,
      ...arrowProps,
      className: _arrowClassName,
      style: {
        display: 'block',
        position: constants.positionAbsolute,
        left: arrowPosition.x,
        top: arrowPosition.y,
        ...arrowProps.style
      },
      ref: arrowRef
    }), /*#__PURE__*/jsxRuntime.jsx(constants.MenuListContext.Provider, {
      value: listContext,
      children: /*#__PURE__*/jsxRuntime.jsx(constants.MenuListItemContext.Provider, {
        value: itemContext,
        children: /*#__PURE__*/jsxRuntime.jsx(constants.HoverItemContext.Provider, {
          value: hoverItem,
          children: utils.safeCall(children, modifiers)
        })
      })
    })]
  });
  return containerProps ? /*#__PURE__*/jsxRuntime.jsx(MenuContainer.MenuContainer, {
    ...containerProps,
    isOpen: isOpen,
    children: menu
  }) : menu;
};

exports.MenuList = MenuList;
