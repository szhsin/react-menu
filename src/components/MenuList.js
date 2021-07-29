import React, {
    memo,
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
    attachHandlerProps,
    batchedUpdates,
    cloneChildren,
    floatEqual,
    getScrollAncestor,
    safeCall,
    isProd,
    parsePadding,
    menuClass,
    menuArrowClass,
    SettingsContext,
    MenuListContext,
    MenuListItemContext,
    initialHoverIndex,
    CloseReason,
    Keys,
    FocusPositions,
    HoverIndexActionTypes,
    SubmenuActionTypes
} from '../utils';


export const MenuList = memo(function MenuList({
    ariaLabel,
    className,
    styles,
    arrowClassName,
    arrowStyles,
    anchorPoint,
    anchorRef,
    containerRef,
    externalRef,
    arrow,
    align,
    direction,
    position,
    overflow,
    repositionFlag,
    captureFocus = true,
    isOpen,
    isDisabled,
    menuItemFocus,
    offsetX,
    offsetY,
    children,
    onClose,
    ...restProps
}) {
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [arrowPosition, setArrowPosition] = useState({});
    const [overflowData, setOverflowData] = useState();
    const [isClosing, setClosing] = useState(false);
    const [expandedDirection, setExpandedDirection] = useState(direction);
    const {
        animation,
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
    const latestOpen = useRef(isOpen);
    const latestMenuSize = useRef({ width: 0, height: 0 });
    const latestHandlePosition = useRef(() => { });
    const descendOverflowRef = useRef(false);
    const reposFlag = useContext(MenuListContext).reposSubmenu || repositionFlag;
    const [reposSubmenu, forceReposSubmenu] = useReducer(c => c + 1, 1);
    const [{ hoverIndex, openSubmenuCount }, dispatch] = useReducer(reducer, {
        hoverIndex: initialHoverIndex,
        openSubmenuCount: 0
    });

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
        const { items, endIndex, descendOverflow } = cloneChildren(children);
        // Store results in refs rather than local states
        // to avoid updating state during render
        menuItemsCount.current = endIndex;
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
        // Check before changing state to avoid triggering unnecessary re-render
        if (isClosing) {
            setClosing(false);
            setOverflowData(); // reset overflowData after closing
        }
    }

    const positionHelpers = useCallback(() => {
        const menuRect = menuRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const boundingRect = scrollingRef.current === window ? {
            left: 0,
            top: 0,
            right: document.documentElement.clientWidth,
            bottom: window.innerHeight
        } : scrollingRef.current.getBoundingClientRect();
        const padding = parsePadding(boundingBoxPadding);

        // For left and top, overflows are negative value.
        // For right and bottom, overflows are positive value.
        const getLeftOverflow = x => x + containerRect.left - boundingRect.left - padding.left;
        const getRightOverflow = x => x + containerRect.left + menuRect.width - boundingRect.right + padding.right;
        const getTopOverflow = y => y + containerRect.top - boundingRect.top - padding.top;
        const getBottomOverflow = y => y + containerRect.top + menuRect.height - boundingRect.bottom + padding.bottom;

        const confineHorizontally = x => {
            // If menu overflows to the left side, adjust x to have the menu contained within the viewport
            // and there is no need to check the right side;
            // if it doesn't overflow to the left, then check the right side
            let leftOverflow = getLeftOverflow(x);
            if (leftOverflow < 0) {
                x -= leftOverflow;
            } else {
                const rightOverflow = getRightOverflow(x);
                if (rightOverflow > 0) {
                    x -= rightOverflow;
                    // Check again to make sure menu doesn't overflow to the left 
                    // because it may go off screen and cannot be scroll into view.
                    leftOverflow = getLeftOverflow(x);
                    if (leftOverflow < 0) x -= leftOverflow;
                }
            }

            return x;
        }

        const confineVertically = y => {
            // Similar logic to confineHorizontally above
            let topOverflow = getTopOverflow(y);
            if (topOverflow < 0) {
                y -= topOverflow;
            } else {
                const bottomOverflow = getBottomOverflow(y);
                if (bottomOverflow > 0) {
                    y -= bottomOverflow;
                    // Check again to make sure menu doesn't overflow to the bottom
                    // because it may go off screen and cannot be scroll into view.
                    topOverflow = getTopOverflow(y);
                    if (topOverflow < 0) y -= topOverflow;
                }
            }

            return y;
        }

        return {
            menuRect,
            containerRect,
            getLeftOverflow,
            getRightOverflow,
            getTopOverflow,
            getBottomOverflow,
            confineHorizontally,
            confineVertically
        };
    }, [containerRef, scrollingRef, boundingBoxPadding]);

    const placeArrowX = useCallback((
        menuX,
        anchorRect,
        containerRect,
        menuRect
    ) => {
        let x = anchorRect.left - containerRect.left - menuX + anchorRect.width / 2;
        const offset = arrowRef.current.offsetWidth * 1.25;
        x = Math.max(offset, x);
        x = Math.min(x, menuRect.width - offset);
        return x;
    }, []);

    const placeArrowY = useCallback((
        menuY,
        anchorRect,
        containerRect,
        menuRect
    ) => {
        let y = anchorRect.top - containerRect.top - menuY + anchorRect.height / 2;
        const offset = arrowRef.current.offsetHeight * 1.25;
        y = Math.max(offset, y);
        y = Math.min(y, menuRect.height - offset);
        return y;
    }, []);

    const placeLeftorRight = useCallback(({
        anchorRect,
        containerRect,
        menuRect
    }, {
        placeLeftorRightY,
        placeLeftX,
        placeRightX
    }, {
        getLeftOverflow,
        getRightOverflow,
        confineHorizontally,
        confineVertically
    }) => {
        let computedDirection = direction;
        let y = placeLeftorRightY;
        if (position !== 'initial') {
            y = confineVertically(y);
            if (position === 'anchor') {
                // restrict menu to the edge of anchor element
                y = Math.min(y, anchorRect.bottom - containerRect.top);
                y = Math.max(y, anchorRect.top - containerRect.top - menuRect.height);
            }
        }

        let x, leftOverflow, rightOverflow;
        if (computedDirection === 'left') {
            x = placeLeftX;

            if (position !== 'initial') {
                // if menu overflows to the left, 
                // try to reposition it to the right of the anchor.
                leftOverflow = getLeftOverflow(x);
                if (leftOverflow < 0) {
                    // if menu overflows to the right after repositioning,
                    // choose a side which has less overflow
                    rightOverflow = getRightOverflow(placeRightX);
                    if (rightOverflow <= 0 || -leftOverflow > rightOverflow) {
                        x = placeRightX;
                        computedDirection = 'right';
                    }
                }
            }
        } else {
            // Opposite logic to the 'left' direction above
            x = placeRightX;

            if (position !== 'initial') {
                rightOverflow = getRightOverflow(x);
                if (rightOverflow > 0) {
                    leftOverflow = getLeftOverflow(placeLeftX);
                    if (leftOverflow >= 0 || -leftOverflow < rightOverflow) {
                        x = placeLeftX;
                        computedDirection = 'left';
                    }
                }
            }
        }

        if (position === 'auto') x = confineHorizontally(x);
        const arrowY = arrow ? placeArrowY(y, anchorRect, containerRect, menuRect) : undefined;
        return { arrowY, x, y, computedDirection };
    }, [placeArrowY, arrow, direction, position]);

    const placeToporBottom = useCallback(({
        anchorRect,
        containerRect,
        menuRect
    }, {
        placeToporBottomX,
        placeTopY,
        placeBottomY
    }, {
        getTopOverflow,
        getBottomOverflow,
        confineHorizontally,
        confineVertically
    }) => {
        // make sure invalid direction is treated as 'bottom'
        let computedDirection = direction === 'top' ? 'top' : 'bottom';
        let x = placeToporBottomX;
        if (position !== 'initial') {
            x = confineHorizontally(x);
            if (position === 'anchor') {
                // restrict menu to the edge of anchor element
                x = Math.min(x, anchorRect.right - containerRect.left);
                x = Math.max(x, anchorRect.left - containerRect.left - menuRect.width);
            }
        }

        let y, topOverflow, bottomOverflow;
        if (computedDirection === 'top') {
            y = placeTopY;

            if (position !== 'initial') {
                // if menu overflows to the top, 
                // try to reposition it to the bottom of the anchor.
                topOverflow = getTopOverflow(y);
                if (topOverflow < 0) {
                    // if menu overflows to the bottom after repositioning,
                    // choose a side which has less overflow
                    bottomOverflow = getBottomOverflow(placeBottomY);
                    if (bottomOverflow <= 0 || -topOverflow > bottomOverflow) {
                        y = placeBottomY;
                        computedDirection = 'bottom';
                    }
                }
            }
        } else {
            // Opposite logic to the 'top' direction above
            y = placeBottomY;

            if (position !== 'initial') {
                bottomOverflow = getBottomOverflow(y);
                if (bottomOverflow > 0) {
                    topOverflow = getTopOverflow(placeTopY);
                    if (topOverflow >= 0 || -topOverflow < bottomOverflow) {
                        y = placeTopY;
                        computedDirection = 'top';
                    }
                }
            }
        }

        if (position === 'auto') y = confineVertically(y);
        const arrowX = arrow ? placeArrowX(x, anchorRect, containerRect, menuRect) : undefined;
        return { arrowX, x, y, computedDirection };
    }, [placeArrowX, arrow, direction, position]);

    // handle menu positioning
    const positionMenu = useCallback((positionHelpers, anchorRef) => {
        const {
            menuRect,
            containerRect,
            ...helpers
        } = positionHelpers;

        let horizontalOffset = offsetX;
        let verticalOffset = offsetY;
        if (arrow) {
            if (direction === 'left' || direction === 'right') {
                horizontalOffset += arrowRef.current.offsetWidth;
            } else {
                verticalOffset += arrowRef.current.offsetHeight;
            }
        }

        const anchorRect = anchorRef.current.getBoundingClientRect();
        const placeLeftX = anchorRect.left - containerRect.left - menuRect.width - horizontalOffset;
        const placeRightX = anchorRect.right - containerRect.left + horizontalOffset;
        const placeTopY = anchorRect.top - containerRect.top - menuRect.height - verticalOffset;
        const placeBottomY = anchorRect.bottom - containerRect.top + verticalOffset;

        let placeToporBottomX, placeLeftorRightY;
        if (align === 'end') {
            placeToporBottomX = anchorRect.right - containerRect.left - menuRect.width;
            placeLeftorRightY = anchorRect.bottom - containerRect.top - menuRect.height;
        } else if (align === 'center') {
            placeToporBottomX = anchorRect.left - containerRect.left
                - (menuRect.width - anchorRect.width) / 2;
            placeLeftorRightY = anchorRect.top - containerRect.top
                - (menuRect.height - anchorRect.height) / 2;
        } else {
            placeToporBottomX = anchorRect.left - containerRect.left;
            placeLeftorRightY = anchorRect.top - containerRect.top;
        }
        placeToporBottomX += horizontalOffset;
        placeLeftorRightY += verticalOffset;

        const rects = { anchorRect, containerRect, menuRect };
        const placements = {
            placeLeftX,
            placeRightX,
            placeLeftorRightY,
            placeTopY,
            placeBottomY,
            placeToporBottomX
        };

        switch (direction) {
            case 'left':
            case 'right':
                return placeLeftorRight(rects, placements, helpers);

            case 'top':
            case 'bottom':
            default:
                return placeToporBottom(rects, placements, helpers);
        }
    }, [
        arrow, align, direction, offsetX, offsetY,
        placeLeftorRight, placeToporBottom
    ]);

    // handle context menu positioning
    const positionContextMenu = useCallback((positionHelpers, anchorPoint) => {
        const {
            menuRect,
            containerRect,
            getLeftOverflow,
            getRightOverflow,
            getTopOverflow,
            getBottomOverflow,
            confineHorizontally,
            confineVertically,
        } = positionHelpers;

        let x, y;

        // position the menu with cursor pointing to its top-left corner
        x = anchorPoint.x - containerRect.left;
        y = anchorPoint.y - containerRect.top;

        // If menu overflows to the right of viewport,
        // try to reposition it on the left side of cursor.
        // If menu overflows to the left of viewport after repositioning,
        // choose a side which has less overflow
        // and adjust x to have it contained within the viewport.
        const rightOverflow = getRightOverflow(x);
        if (rightOverflow > 0) {
            const adjustedX = x - menuRect.width;
            const leftOverflow = getLeftOverflow(adjustedX);
            if (leftOverflow >= 0 || -leftOverflow < rightOverflow) {
                x = adjustedX;
            }
            x = confineHorizontally(x);
        }

        // Similar logic to the left and right side above.
        let computedDirection = 'bottom';
        const bottomOverflow = getBottomOverflow(y);
        if (bottomOverflow > 0) {
            const adjustedY = y - menuRect.height;
            const topOverflow = getTopOverflow(adjustedY);
            if (topOverflow >= 0 || -topOverflow < bottomOverflow) {
                y = adjustedY;
                computedDirection = 'top';
            }
            y = confineVertically(y);
        }

        return { x, y, computedDirection };
    }, []);

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

        const helpers = positionHelpers();
        const { menuRect } = helpers;
        let results = { computedDirection: 'bottom' };
        if (anchorPoint) {
            results = positionContextMenu(helpers, anchorPoint);
        } else if (anchorRef) {
            results = positionMenu(helpers, anchorRef);
        }
        let { arrowX, arrowY, x, y, computedDirection } = results;
        let menuHeight = menuRect.height;

        if (overflow !== 'visible') {
            const {
                getTopOverflow,
                getBottomOverflow
            } = helpers;

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
        arrow, anchorPoint, anchorRef, containerRef, boundingBoxRef, rootMenuRef, scrollingRef,
        overflow, positionHelpers, positionMenu, positionContextMenu
    ]);

    useLayoutEffect(() => {
        if (isOpen) {
            handlePosition();
            // Reposition submenu whenever deps(except isOpen) have changed
            // NOTE: this effect must come BEFORE the effect which updates latestOpen
            if (latestOpen.current) forceReposSubmenu();
        }
        latestHandlePosition.current = handlePosition;
    }, [isOpen, handlePosition, reposFlag]);

    useLayoutEffect(() => {
        if (overflowData && !descendOverflowRef.current) menuRef.current.scrollTop = 0;
    }, [overflowData]);

    useLayoutEffect(() => {
        if (animation) {
            if (isOpen) {
                setClosing(false)
            } else if (isOpen !== latestOpen.current) { // Skip the first effect run in which isOpen is false
                setClosing(true);
            }
        }

        latestOpen.current = isOpen;
    }, [animation, isOpen]);

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
            if (!animation) setOverflowData();
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
        }, animation ? 170 : 100);

        return () => clearTimeout(id);
    }, [animation, captureFocus, isOpen, menuItemFocus]);

    const isSubmenuOpen = openSubmenuCount > 0;
    const itemContext = useMemo(() => ({
        isParentOpen: isOpen,
        hoverIndex,
        isSubmenuOpen,
        dispatch
    }), [isOpen, hoverIndex, isSubmenuOpen]);

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

    const modifiers = useMemo(() => ({
        open: isOpen,
        closing: isClosing,
        animation,
        dir: animation && expandedDirection
    }), [isOpen, isClosing, animation, expandedDirection]);

    // Modifier object are shared between this project and client code,
    // freeze them to prevent client code from accidentally altering them.
    const externalModifiers = useMemo(() => Object.freeze({ ...modifiers, dir: expandedDirection }), [modifiers, expandedDirection]);
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
            className={useBEM({ block: menuClass, modifiers, className, externalModifiers })}
            style={{
                ...useFlatStyles(styles, externalModifiers),
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
                    {menuItems}
                </MenuListItemContext.Provider>
            </MenuListContext.Provider>
        </ul>
    );
});

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
