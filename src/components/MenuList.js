import { useState, useReducer, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import { flushSync } from 'react-dom';
import { MenuContainer } from './MenuContainer';
import { useBEM, useCombinedRef, useLayoutEffect, useItems } from '../hooks';
import { getPositionHelpers, positionMenu } from '../positionUtils';
import {
  mergeProps,
  batchedUpdates,
  commonProps,
  createSubmenuCtx,
  getScrollAncestor,
  getTransition,
  positionAbsolute,
  dummyItemProps,
  safeCall,
  isMenuOpen,
  menuClass,
  menuArrowClass,
  CloseReason,
  Keys,
  FocusPositions,
  HoverActionTypes,
  SettingsContext,
  MenuListContext,
  MenuListItemContext,
  HoverItemContext
} from '../utils';

const offScreen = -9999;

export const MenuList = ({
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
  const [menuPosition, setMenuPosition] = useState({ x: offScreen, y: offScreen });
  const [arrowPosition, setArrowPosition] = useState({});
  const [overflowData, setOverflowData] = useState();
  const [expandedDirection, setExpandedDirection] = useState(direction);
  const [submenuCtx] = useState(createSubmenuCtx);
  const [reposSubmenu, forceReposSubmenu] = useReducer((c) => c + 1, 1);
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
  // Intentionally ignore the repositionFlag in non-top-level menus.
  // Using top-level repositionFlag to cascade reposition into all descendent menus.
  const { submenuCtx: parentSubmenuCtx, reposSubmenu: reposFlag = repositionFlag } =
    useContext(MenuListContext);
  const menuRef = useRef(null);
  const focusRef = useRef();
  const arrowRef = useRef();
  const prevOpen = useRef(false);
  const { hoverItem, dispatch, updateItems } = useItems(menuRef, focusRef);

  const isOpen = isMenuOpen(state);
  const openTransition = getTransition(transition, 'open');
  const closeTransition = getTransition(transition, 'close');
  const scrollNodes = scrollNodesRef.current;

  const onKeyDown = (e) => {
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

      // prevent browser from scrolling the page when SPACE is pressed
      case Keys.SPACE:
        // Don't preventDefault on children of FocusableItem
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
      setOverflowData(); // reset overflowData after closing
    }

    safeCall(endTransition);
  };

  const onPointerMove = (e) => {
    e.stopPropagation();
    submenuCtx.on(submenuCloseDelay, () => {
      dispatch(HoverActionTypes.RESET);
      focusRef.current.focus();
    });
  };

  const onPointerLeave = (e) => {
    if (e.target === e.currentTarget) submenuCtx.off();
  };

  const handlePosition = useCallback(
    (noOverflowCheck) => {
      const anchorRect = anchorRef
        ? anchorRef.current?.getBoundingClientRect()
        : anchorPoint
          ? {
              left: anchorPoint.x,
              right: anchorPoint.x,
              top: anchorPoint.y,
              bottom: anchorPoint.y,
              width: 0,
              height: 0
            }
          : null;
      if (!anchorRect) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            '[React-Menu] Menu might not be positioned properly as one of the anchorRef or anchorPoint prop should be provided. If `anchorRef` is provided, the anchor must be mounted before menu is open.'
          );
        }
        return;
      }

      if (!scrollNodes.menu) {
        scrollNodes.menu =
          (boundingBoxRef
            ? boundingBoxRef.current // user explicitly sets boundingBoxRef
            : getScrollAncestor(rootMenuRef.current)) || window; // try to discover bounding box automatically
      }

      const positionHelpers = getPositionHelpers(
        containerRef,
        menuRef,
        scrollNodes.menu,
        boundingBoxPadding
      );

      let { arrowX, arrowY, x, y, computedDirection } = positionMenu({
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

      const { menuRect } = positionHelpers;
      const menuHeight = menuRect.height;

      if (!noOverflowCheck && overflow !== 'visible') {
        const { getTopOverflow, getBottomOverflow } = positionHelpers;

        let height, overflowAmt;
        const bottomOverflow = getBottomOverflow(y);
        if (bottomOverflow > 0) {
          height = menuHeight - bottomOverflow;
          overflowAmt = bottomOverflow;
        } else {
          const topOverflow = getTopOverflow(y);
          if (topOverflow < 0) {
            height = menuHeight + topOverflow;
            overflowAmt = 0 - topOverflow; // avoid getting -0
            if (height >= 0) y -= topOverflow;
          }
        }

        if (height >= 0) {
          setOverflowData({ height, overflowAmt });
        }
      }

      if (arrow) setArrowPosition({ x: arrowX, y: arrowY });
      setMenuPosition({ x, y });
      setExpandedDirection(computedDirection);
    },
    [
      arrow,
      align,
      boundingBoxPadding,
      direction,
      gap,
      shift,
      position,
      overflow,
      anchorPoint,
      anchorRef,
      containerRef,
      boundingBoxRef,
      rootMenuRef,
      scrollNodes
    ]
  );

  useLayoutEffect(() => {
    if (isOpen) {
      handlePosition();
      // Reposition submenu whenever deps(except isOpen) have changed
      if (prevOpen.current) forceReposSubmenu();
    }
    prevOpen.current = isOpen;
  }, [isOpen, handlePosition, /* effect dep */ reposFlag]);

  useLayoutEffect(() => {
    if (overflowData && !setDownOverflow) menuRef.current.scrollTop = 0;
  }, [overflowData, setDownOverflow]);

  useLayoutEffect(() => updateItems, [updateItems]);

  useEffect(() => {
    let { menu: menuScroll } = scrollNodes;
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
        safeCall(onClose, { reason: CloseReason.SCROLL });
      }
    };

    const scrollObservers = scrollNodes.anchors.concat(viewScroll !== 'initial' ? menuScroll : []);
    scrollObservers.forEach((o) => o.addEventListener('scroll', handleScroll));
    return () => scrollObservers.forEach((o) => o.removeEventListener('scroll', handleScroll));
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
    const resizeObserver = new ResizeObserver((entries) =>
      entries.forEach(({ target }) => {
        if (targetList.indexOf(target) < 0) {
          // ResizeObserver callback fires on initial observe call,
          // use this workaround to skip the first callback
          targetList.push(target);
        } else {
          flushSync(() => {
            handlePosition();
            forceReposSubmenu();
          });
        }
      })
    );

    const resizeObserverOptions = { box: 'border-box' };
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

    const { position, alwaysUpdate } = menuItemFocus || {};
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
      // Use a timeout here because if set focus immediately, page might scroll unexpectedly.
      const id = setTimeout(
        () => {
          // If focus has already been set to a children element, don't set focus on menu or item
          const menuElt = menuRef.current;
          if (menuElt && !menuElt.contains(document.activeElement)) {
            focusRef.current.focus();
            setItemFocus();
          }
        },
        openTransition ? 170 : 100
      );

      return () => clearTimeout(id);
    }
  }, [isOpen, openTransition, closeTransition, captureFocus, menuItemFocus, dispatch]);

  const itemContext = useMemo(
    () => ({
      isParentOpen: isOpen,
      submenuCtx,
      dispatch,
      updateItems
    }),
    [isOpen, submenuCtx, dispatch, updateItems]
  );

  let maxHeight, overflowAmt;
  if (overflowData) {
    setDownOverflow ? (overflowAmt = overflowData.overflowAmt) : (maxHeight = overflowData.height);
  }

  const listContext = useMemo(
    () => ({
      reposSubmenu,
      submenuCtx,
      overflow,
      overflowAmt,
      parentMenuRef: menuRef,
      parentDir: expandedDirection
    }),
    [reposSubmenu, submenuCtx, overflow, overflowAmt, expandedDirection]
  );
  const overflowStyle = maxHeight >= 0 ? { maxHeight, overflow } : undefined;

  const modifiers = useMemo(
    () => ({
      state,
      align,
      dir: expandedDirection
    }),
    [state, align, expandedDirection]
  );
  const arrowModifiers = useMemo(() => ({ dir: expandedDirection }), [expandedDirection]);
  const _arrowClassName = useBEM({
    block: menuClass,
    element: menuArrowClass,
    modifiers: arrowModifiers,
    className: arrowProps.className
  });

  const menu = (
    <ul
      role="menu"
      aria-label={ariaLabel}
      {...commonProps(isDisabled)}
      {...mergeProps(
        {
          onPointerEnter: parentSubmenuCtx?.off,
          onPointerMove,
          onPointerLeave,
          onKeyDown,
          onAnimationEnd
        },
        restProps
      )}
      ref={useCombinedRef(externalRef, menuRef)}
      className={useBEM({ block: menuClass, modifiers, className: menuClassName })}
      style={{
        ...menuStyle,
        ...overflowStyle,
        margin: 0,
        display: state === 'closed' ? 'none' : undefined,
        position: positionAbsolute,
        left: menuPosition.x,
        top: menuPosition.y
      }}
    >
      <li
        tabIndex={-1}
        style={{ position: positionAbsolute, left: 0, top: 0, display: 'block', outline: 'none' }}
        ref={focusRef}
        {...dummyItemProps}
        {...focusProps}
      />
      {arrow && (
        <li
          {...dummyItemProps}
          {...arrowProps}
          className={_arrowClassName}
          style={{
            display: 'block',
            position: positionAbsolute,
            left: arrowPosition.x,
            top: arrowPosition.y,
            ...arrowProps.style
          }}
          ref={arrowRef}
        />
      )}

      <MenuListContext.Provider value={listContext}>
        <MenuListItemContext.Provider value={itemContext}>
          <HoverItemContext.Provider value={hoverItem}>
            {safeCall(children, modifiers)}
          </HoverItemContext.Provider>
        </MenuListItemContext.Provider>
      </MenuListContext.Provider>
    </ul>
  );

  return containerProps ? (
    <MenuContainer {...containerProps} isOpen={isOpen}>
      {menu}
    </MenuContainer>
  ) : (
    menu
  );
};
