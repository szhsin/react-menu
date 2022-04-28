import { useState, useReducer, useEffect, useRef, useMemo, useCallback, useContext } from 'react';
import { flushSync } from 'react-dom';
import { useBEM, useCombinedRef, useLayoutEffect, useItems } from '../hooks';
import { getPositionHelpers, positionMenu, positionContextMenu } from '../positionUtils';
import {
  attachHandlerProps,
  batchedUpdates,
  commonProps,
  floatEqual,
  getScrollAncestor,
  getTransition,
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

export const MenuList = ({
  ariaLabel,
  menuClassName,
  menuStyle,
  arrowClassName,
  arrowStyle,
  anchorPoint,
  anchorRef,
  containerRef,
  externalRef,
  parentScrollingRef,
  arrow,
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
  offsetX = 0,
  offsetY = 0,
  children,
  onClose,
  ...restProps
}) => {
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [arrowPosition, setArrowPosition] = useState({});
  const [overflowData, setOverflowData] = useState();
  const [expandedDirection, setExpandedDirection] = useState(direction);
  const [openSubmenuCount, setOpenSubmenuCount] = useState(0);
  const [reposSubmenu, forceReposSubmenu] = useReducer((c) => c + 1, 1);
  const {
    transition,
    boundingBoxRef,
    boundingBoxPadding,
    rootMenuRef,
    rootAnchorRef,
    scrollingRef,
    anchorScrollingRef,
    reposition,
    viewScroll
  } = useContext(SettingsContext);
  const reposFlag = useContext(MenuListContext).reposSubmenu || repositionFlag;
  const menuRef = useRef(null);
  const arrowRef = useRef(null);
  const prevOpen = useRef(false);
  const latestMenuSize = useRef({ width: 0, height: 0 });
  const latestHandlePosition = useRef(() => {});
  const { hoverItem, dispatch, updateItems } = useItems(menuRef);

  const isOpen = isMenuOpen(state);
  const openTransition = getTransition(transition, 'open');
  const closeTransition = getTransition(transition, 'close');

  const handleKeyDown = (e) => {
    let handled = false;

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

      // prevent browser from scrolling the page when SPACE is pressed
      case Keys.SPACE:
        // Don't preventDefault on children of FocusableItem
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

  const handleAnimationEnd = () => {
    if (state === 'closing') {
      setOverflowData(); // reset overflowData after closing
    }

    safeCall(endTransition);
  };

  const handlePosition = useCallback(() => {
    if (!containerRef.current) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          '[React-Menu] Menu cannot be positioned properly as container ref is null. If you need to initialise `state` prop to "open" for ControlledMenu, please see this solution: https://codesandbox.io/s/initial-open-sp10wn'
        );
      }
      return;
    }

    if (!scrollingRef.current) {
      scrollingRef.current = boundingBoxRef
        ? boundingBoxRef.current // user explicitly sets boundingBoxRef
        : getScrollAncestor(rootMenuRef.current); // try to discover bounding box automatically
    }

    const positionHelpers = getPositionHelpers({
      menuRef,
      containerRef,
      scrollingRef,
      boundingBoxPadding
    });
    const { menuRect } = positionHelpers;
    let results = { computedDirection: 'bottom' };
    if (anchorPoint) {
      results = positionContextMenu({ positionHelpers, anchorPoint });
    } else if (anchorRef) {
      results = positionMenu({
        arrow,
        align,
        direction,
        offsetX,
        offsetY,
        position,
        anchorRef,
        arrowRef,
        positionHelpers
      });
    }
    let { arrowX, arrowY, x, y, computedDirection } = results;
    let menuHeight = menuRect.height;

    if (overflow !== 'visible') {
      const { getTopOverflow, getBottomOverflow } = positionHelpers;

      let height, overflowAmt;
      const prevHeight = latestMenuSize.current.height;
      const bottomOverflow = getBottomOverflow(y);
      // When bottomOverflow is 0, menu is on the bottom edge of viewport
      // This might be the result of a previous maxHeight set on the menu.
      // In this situation, we need to still apply a new maxHeight.
      // Same reason for the top side
      if (
        bottomOverflow > 0 ||
        (floatEqual(bottomOverflow, 0) && floatEqual(menuHeight, prevHeight))
      ) {
        height = menuHeight - bottomOverflow;
        overflowAmt = bottomOverflow;
      } else {
        const topOverflow = getTopOverflow(y);
        if (topOverflow < 0 || (floatEqual(topOverflow, 0) && floatEqual(menuHeight, prevHeight))) {
          height = menuHeight + topOverflow;
          overflowAmt = 0 - topOverflow; // avoid getting -0
          if (height >= 0) y -= topOverflow;
        }
      }

      if (height >= 0) {
        // To avoid triggering reposition in the next ResizeObserver callback
        menuHeight = height;
        setOverflowData({ height, overflowAmt });
      } else {
        setOverflowData();
      }
    }

    if (arrow) setArrowPosition({ x: arrowX, y: arrowY });
    setMenuPosition({ x, y });
    setExpandedDirection(computedDirection);
    latestMenuSize.current = { width: menuRect.width, height: menuHeight };
  }, [
    arrow,
    align,
    boundingBoxPadding,
    direction,
    offsetX,
    offsetY,
    position,
    overflow,
    anchorPoint,
    anchorRef,
    containerRef,
    boundingBoxRef,
    rootMenuRef,
    scrollingRef
  ]);

  useLayoutEffect(() => {
    if (isOpen) {
      handlePosition();
      // Reposition submenu whenever deps(except isOpen) have changed
      if (prevOpen.current) forceReposSubmenu();
    }
    prevOpen.current = isOpen;
    latestHandlePosition.current = handlePosition;
  }, [isOpen, handlePosition, /* effect dep */ reposFlag]);

  useLayoutEffect(() => {
    if (overflowData && !setDownOverflow) menuRef.current.scrollTop = 0;
  }, [overflowData, setDownOverflow]);

  useEffect(() => updateItems, [updateItems]);

  useEffect(() => {
    if (!isOpen) return;

    if (!anchorScrollingRef.current && rootAnchorRef && rootAnchorRef.current.tagName) {
      anchorScrollingRef.current = getScrollAncestor(rootAnchorRef.current);
    }
    const scrollCurrent = scrollingRef.current;
    const menuScroll = scrollCurrent && scrollCurrent.addEventListener ? scrollCurrent : window;
    const anchorScroll = anchorScrollingRef.current || menuScroll;

    let scroll = viewScroll;
    if (anchorScroll !== menuScroll && scroll === 'initial') scroll = 'auto';
    if (scroll === 'initial') return;

    // For best user experience, behave as 'initial' in the following condition:
    if (scroll === 'auto' && overflow !== 'visible') return;

    const handleScroll = () => {
      if (scroll === 'auto') {
        batchedUpdates(handlePosition);
      } else {
        safeCall(onClose, { reason: CloseReason.SCROLL });
      }
    };

    const scrollObservers =
      anchorScroll !== menuScroll && viewScroll !== 'initial'
        ? [anchorScroll, menuScroll]
        : [anchorScroll];
    scrollObservers.forEach((o) => o.addEventListener('scroll', handleScroll));
    return () => scrollObservers.forEach((o) => o.removeEventListener('scroll', handleScroll));
  }, [
    rootAnchorRef,
    anchorScrollingRef,
    scrollingRef,
    isOpen,
    overflow,
    onClose,
    viewScroll,
    handlePosition
  ]);

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
      const { borderBoxSize, target } = entry;
      let width, height;
      if (borderBoxSize) {
        const { inlineSize, blockSize } = borderBoxSize[0] || borderBoxSize;
        width = inlineSize;
        height = blockSize;
      } else {
        const borderRect = target.getBoundingClientRect();
        width = borderRect.width;
        height = borderRect.height;
      }

      if (width === 0 || height === 0) return;
      if (
        floatEqual(width, latestMenuSize.current.width, 1) &&
        floatEqual(height, latestMenuSize.current.height, 1)
      )
        return;
      flushSync(() => {
        latestHandlePosition.current();
        forceReposSubmenu();
      });
    });

    const observeTarget = menuRef.current;
    resizeObserver.observe(observeTarget, { box: 'border-box' });
    return () => resizeObserver.unobserve(observeTarget);
  }, [reposition]);

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
          if (menuRef.current && !menuRef.current.contains(document.activeElement)) {
            menuRef.current.focus();
            setItemFocus();
          }
        },
        openTransition ? 170 : 100
      );

      return () => clearTimeout(id);
    }
  }, [isOpen, openTransition, closeTransition, captureFocus, menuItemFocus, dispatch]);

  const isSubmenuOpen = openSubmenuCount > 0;
  const itemContext = useMemo(
    () => ({
      parentMenuRef: menuRef,
      parentOverflow: overflow,
      isParentOpen: isOpen,
      isSubmenuOpen,
      setOpenSubmenuCount,
      dispatch,
      updateItems
    }),
    [isOpen, isSubmenuOpen, overflow, dispatch, updateItems]
  );

  let maxHeight, overflowAmt;
  if (overflowData) {
    setDownOverflow ? (overflowAmt = overflowData.overflowAmt) : (maxHeight = overflowData.height);
  }

  const listContext = useMemo(
    () => ({
      reposSubmenu,
      overflow,
      overflowAmt
    }),
    [reposSubmenu, overflow, overflowAmt]
  );
  const overflowStyle = maxHeight >= 0 ? { maxHeight, overflow } : undefined;

  // Modifier object are shared between this project and client code,
  // freeze them to prevent client code from accidentally altering them.
  const modifiers = useMemo(
    () => ({
      state,
      dir: expandedDirection
    }),
    [state, expandedDirection]
  );
  const arrowModifiers = useMemo(
    () => Object.freeze({ dir: expandedDirection }),
    [expandedDirection]
  );
  const _arrowClass = useBEM({
    block: menuClass,
    element: menuArrowClass,
    modifiers: arrowModifiers,
    className: arrowClassName
  });

  const handlers = attachHandlerProps(
    {
      onKeyDown: handleKeyDown,
      onAnimationEnd: handleAnimationEnd
    },
    restProps
  );

  return (
    <ul
      role="menu"
      aria-label={ariaLabel}
      {...restProps}
      {...handlers}
      {...commonProps(isDisabled)}
      ref={useCombinedRef(externalRef, menuRef)}
      className={useBEM({ block: menuClass, modifiers, className: menuClassName })}
      style={{
        ...menuStyle,
        ...overflowStyle,
        left: menuPosition.x,
        top: menuPosition.y
      }}
    >
      {arrow && (
        <div
          className={_arrowClass}
          style={{
            ...arrowStyle,
            left: arrowPosition.x,
            top: arrowPosition.y
          }}
          ref={arrowRef}
        />
      )}

      <MenuListContext.Provider value={listContext}>
        <MenuListItemContext.Provider value={itemContext}>
          <HoverItemContext.Provider value={hoverItem}>{children}</HoverItemContext.Provider>
        </MenuListItemContext.Provider>
      </MenuListContext.Provider>
    </ul>
  );
};
