import React, {
    useState,
    useReducer,
    useEffect,
    useRef,
    useMemo,
    useCallback,
    useContext
} from 'react';
import {
    useBEM,
    useFlatStyles,
    useCombinedRef,
    useLayoutEffect
} from '../hooks';
import {
    getPositionHelpers,
    positionMenu,
    positionContextMenu
} from '../positionUtils';
import {
    attachHandlerProps,
    batchedUpdates,
    cloneChildren,
    floatEqual,
    getScrollAncestor,
    getTransition,
    safeCall,
    isProd,
    menuClass,
    menuArrowClass,
    SettingsContext,
    MenuListContext,
    MenuListItemContext,
    HoverIndexContext,
    initialHoverIndex,
    isMenuOpen,
    CloseReason,
    Keys,
    FocusPositions,
    HoverIndexActionTypes,
    SubmenuActionTypes
} from '../utils';


export const MenuList = ({
    ariaLabel,
    menuClassName,
    menuStyles,
    arrowClassName,
    arrowStyles,
    anchorPoint,
    anchorRef,
    containerRef,
    externalRef,
    parentScrollingRef,
    arrow,
    align,
    direction,
    position,
    overflow,
    repositionFlag,
    captureFocus = true,
    state: menuState,
    endTransition,
    isDisabled,
    menuItemFocus,
    offsetX,
    offsetY,
    children,
    onClose,
    ...restProps
}) => {
    const isOpen = isMenuOpen(menuState);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [arrowPosition, setArrowPosition] = useState({});
    const [overflowData, setOverflowData] = useState();
    const [expandedDirection, setExpandedDirection] = useState(direction);
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
    const menuRef = useRef(null);
    const arrowRef = useRef(null);
    const menuItemsCount = useRef(0);
    const prevOpen = useRef(isOpen);
    const latestMenuSize = useRef({ width: 0, height: 0 });
    const latestHandlePosition = useRef(() => { });
    const descendOverflowRef = useRef(false);
    const reposFlag = useContext(MenuListContext).reposSubmenu || repositionFlag;
    const [reposSubmenu, forceReposSubmenu] = useReducer(c => c + 1, 1);
    const [{ hoverIndex, openSubmenuCount }, dispatch] = useReducer(reducer, {
        hoverIndex: initialHoverIndex,
        openSubmenuCount: 0
    });
    const openTransition = getTransition(transition, 'open');
    const closeTransition = getTransition(transition, 'close');

    function reducer({ hoverIndex, openSubmenuCount }, action) {
        return {
            hoverIndex: hoverIndexReducer(hoverIndex, action),
            openSubmenuCount: submenuCountReducer(openSubmenuCount, action)
        }
    }

    function hoverIndexReducer(state, { type, index }) {
        switch (type) {
            case HoverIndexActionTypes.RESET:
                return initialHoverIndex;

            case HoverIndexActionTypes.SET:
                return index;

            case HoverIndexActionTypes.UNSET:
                return state === index ? initialHoverIndex : state;

            case HoverIndexActionTypes.DECREASE: {
                let i = state;
                i--;
                if (i < 0) i = menuItemsCount.current - 1;
                return i;
            }

            case HoverIndexActionTypes.INCREASE: {
                let i = state;
                i++;
                if (i >= menuItemsCount.current) i = 0;
                return i;
            }

            case HoverIndexActionTypes.FIRST:
                return menuItemsCount.current > 0 ? 0 : initialHoverIndex;

            case HoverIndexActionTypes.LAST:
                return menuItemsCount.current > 0
                    ? menuItemsCount.current - 1 : initialHoverIndex;

            default:
                return state;
        }
    }

    const menuItems = useMemo(() => {
        const { items, index, descendOverflow } = cloneChildren(children);
        // Store results in refs rather than local states
        // to avoid updating state during render
        menuItemsCount.current = index;
        descendOverflowRef.current = descendOverflow;
        return items;
    }, [children]);

    const handleKeyDown = e => {
        let handled = false;

        switch (e.key) {
            case Keys.HOME:
                dispatch({ type: HoverIndexActionTypes.FIRST });
                handled = true;
                break;

            case Keys.END:
                dispatch({ type: HoverIndexActionTypes.LAST });
                handled = true;
                break;

            case Keys.UP:
                dispatch({ type: HoverIndexActionTypes.DECREASE });
                handled = true;
                break;

            case Keys.DOWN:
                dispatch({ type: HoverIndexActionTypes.INCREASE });
                handled = true;
                break;

            // prevent browser from scrolling the page when SPACE is pressed
            case Keys.SPACE:
                // Don't preventDefault on children of FocusableItem 
                if (e.target && e.target.className.includes(menuClass)) {
                    e.preventDefault();
                }
                break;
        }

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const handleAnimationEnd = () => {
        if (menuState === 'closing') {
            setOverflowData(); // reset overflowData after closing
        }

        safeCall(endTransition);
    }

    const handlePosition = useCallback(() => {
        if (!containerRef.current) {
            if (!isProd) throw new Error('[react-menu] Menu cannot be positioned properly as container ref is null. If you initialise isOpen prop to true for ControlledMenu, please see this link for a solution: https://github.com/szhsin/react-menu/issues/2#issuecomment-719166062');
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
            const {
                getTopOverflow,
                getBottomOverflow
            } = positionHelpers;

            let height, overflowAmt;
            const prevHeight = latestMenuSize.current.height;
            const bottomOverflow = getBottomOverflow(y);
            // When bottomOverflow is 0, menu is on the bottom edge of viewport
            // This might be the result of a previous maxHeight set on the menu.
            // In this situation, we need to still apply a new maxHeight.
            // Same reason for the top side
            if (bottomOverflow > 0 ||
                (floatEqual(bottomOverflow, 0) && floatEqual(menuHeight, prevHeight))) {
                height = menuHeight - bottomOverflow;
                overflowAmt = bottomOverflow;
            } else {
                const topOverflow = getTopOverflow(y);
                if (topOverflow < 0 ||
                    (floatEqual(topOverflow, 0) && floatEqual(menuHeight, prevHeight))) {
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
        arrow, align, boundingBoxPadding, direction, offsetX, offsetY, position, overflow,
        anchorPoint, anchorRef, containerRef, boundingBoxRef, rootMenuRef, scrollingRef
    ]);

    useLayoutEffect(() => {
        if (isOpen) {
            handlePosition();
            // Reposition submenu whenever deps(except isOpen) have changed
            if (prevOpen.current) forceReposSubmenu();
        }
        prevOpen.current = isOpen;
        latestHandlePosition.current = handlePosition;
    }, [isOpen, handlePosition, reposFlag]);

    useLayoutEffect(() => {
        if (overflowData && !descendOverflowRef.current) menuRef.current.scrollTop = 0;
    }, [overflowData]);

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

        // For best user experience, 
        // force to close menu in the following setting combination
        if (scroll === 'auto' && overflow !== 'visible') scroll = 'close';

        const handleScroll = () => {
            if (scroll === 'auto') {
                batchedUpdates(handlePosition);
            } else {
                safeCall(onClose, { reason: CloseReason.SCROLL });
            }
        }

        const scrollObservers = anchorScroll !== menuScroll && viewScroll !== 'initial'
            ? [anchorScroll, menuScroll] : [anchorScroll];
        scrollObservers.forEach(o => o.addEventListener('scroll', handleScroll));
        return () => scrollObservers.forEach(o => o.removeEventListener('scroll', handleScroll));
    }, [
        rootAnchorRef, anchorScrollingRef, scrollingRef,
        isOpen, overflow, onClose, viewScroll, handlePosition
    ]);

    const hasOverflow = Boolean(overflowData) && overflowData.overflowAmt > 0;
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
            if (floatEqual(width, latestMenuSize.current.width, 1)
                && floatEqual(height, latestMenuSize.current.height, 1)) return;
            batchedUpdates(() => {
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
            dispatch({ type: HoverIndexActionTypes.RESET });
            if (!closeTransition) setOverflowData();
        }

        // Use a timeout here because if set focus immediately, page might scroll unexpectedly.
        const id = setTimeout(() => {
            // We are seeing the old isOpen value when closure was created
            // However it should not be a issue since the timeout is cleared whenever states change
            // Don't set focus when menu is closed, otherwise focus will be lost
            // and onBlur event will be fired with relatedTarget setting as null.
            // If focus has already been set to a children element, don't set focus on the menu;
            // this happens in some edge cases because of the timeout delay.
            if (!isOpen || !menuRef.current || menuRef.current.contains(document.activeElement)) return;
            if (captureFocus) menuRef.current.focus();
            if (menuItemFocus.position === FocusPositions.FIRST) {
                dispatch({ type: HoverIndexActionTypes.FIRST });
            } else if (menuItemFocus.position === FocusPositions.LAST) {
                dispatch({ type: HoverIndexActionTypes.LAST });
            }
        }, openTransition ? 170 : 100);

        return () => clearTimeout(id);
    }, [openTransition, closeTransition, captureFocus, isOpen, menuItemFocus]);

    const isSubmenuOpen = openSubmenuCount > 0;
    const itemContext = useMemo(() => ({
        parentMenuRef: menuRef,
        parentOverflow: overflow,
        isParentOpen: isOpen,
        isSubmenuOpen,
        dispatch
    }), [isOpen, isSubmenuOpen, overflow]);

    let maxHeight, overflowAmt;
    if (overflowData) {
        descendOverflowRef.current
            ? (overflowAmt = overflowData.overflowAmt)
            : (maxHeight = overflowData.height);
    }

    const listContext = useMemo(() => ({
        reposSubmenu,
        overflow,
        overflowAmt
    }), [reposSubmenu, overflow, overflowAmt]);
    const overflowStyles = maxHeight >= 0 ? { maxHeight, overflow } : undefined;

    // Modifier object are shared between this project and client code,
    // freeze them to prevent client code from accidentally altering them.
    const modifiers = useMemo(() => ({
        state: menuState,
        dir: expandedDirection
    }), [menuState, expandedDirection]);
    const arrowModifiers = useMemo(() => Object.freeze({ dir: expandedDirection }), [expandedDirection]);
    const _arrowClass = useBEM({
        block: menuClass, element: menuArrowClass,
        modifiers: arrowModifiers, className: arrowClassName
    });
    const _arrowStyles = useFlatStyles(arrowStyles, arrowModifiers);

    const handlers = attachHandlerProps({
        onKeyDown: handleKeyDown,
        onAnimationEnd: handleAnimationEnd
    }, restProps);

    return (
        <ul role="menu"
            tabIndex="-1"
            aria-disabled={isDisabled || undefined}
            aria-label={ariaLabel}
            {...restProps}
            {...handlers}
            ref={useCombinedRef(externalRef, menuRef)}
            className={useBEM({ block: menuClass, modifiers, className: menuClassName })}
            style={{
                ...useFlatStyles(menuStyles, modifiers),
                ...overflowStyles,
                left: `${menuPosition.x}px`,
                top: `${menuPosition.y}px`
            }}>

            {arrow &&
                <div className={_arrowClass}
                    style={{
                        ..._arrowStyles,
                        left: arrowPosition.x && `${arrowPosition.x}px`,
                        top: arrowPosition.y && `${arrowPosition.y}px`,
                    }}
                    ref={arrowRef} />
            }

            <MenuListContext.Provider value={listContext}>
                <MenuListItemContext.Provider value={itemContext}>
                    <HoverIndexContext.Provider value={hoverIndex}>
                        {menuItems}
                    </HoverIndexContext.Provider>
                </MenuListItemContext.Provider>
            </MenuListContext.Provider>
        </ul>
    );
};

function submenuCountReducer(state, { type }) {
    switch (type) {
        case SubmenuActionTypes.OPEN:
            return state + 1;
        case SubmenuActionTypes.CLOSE:
            return Math.max(state - 1, 0);
        default:
            return state;
    }
}
