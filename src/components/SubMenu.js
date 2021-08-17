import React, {
    memo,
    useState,
    useRef,
    useContext,
    useEffect,
    useMemo
} from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {
    useBEM,
    useFlatStyles,
    useActiveState,
    useMenuChange,
    useMenuStateAndFocus,
    useCombinedRef,
    useLayoutEffect
} from '../hooks';
import { MenuList } from './MenuList';
import {
    attachHandlerProps,
    getScrollAncestor,
    safeCall,
    stylePropTypes,
    sharedMenuPropTypes,
    sharedMenuDefaultProp,
    menuClass,
    subMenuClass,
    menuItemClass,
    isMenuOpen,
    withHovering,
    SettingsContext,
    ItemSettingsContext,
    MenuListItemContext,
    Keys,
    HoverIndexActionTypes,
    SubmenuActionTypes,
    FocusPositions
} from '../utils';


export const SubMenu = withHovering(memo(function SubMenu({
    'aria-label': ariaLabel,
    className,
    disabled,
    label,
    index,
    onMenuChange,
    isHovering,
    captureFocus: _1,
    repositionFlag: _2,
    itemProps = {},
    ...restProps
}) {
    const {
        initialMounted, unmountOnClose, transition, transitionTimeout, rootMenuRef
    } = useContext(SettingsContext);
    const { submenuOpenDelay, submenuCloseDelay } = useContext(ItemSettingsContext);
    const { parentMenuRef, isParentOpen, isSubmenuOpen, dispatch } = useContext(MenuListItemContext);
    const [portal, setPortal] = useState(false);

    const {
        openMenu,
        toggleMenu,
        state,
        ...otherStateProps
    } = useMenuStateAndFocus({ initialMounted, unmountOnClose, transition, transitionTimeout });

    const isOpen = isMenuOpen(state);
    const isDisabled = Boolean(disabled);
    const {
        isActive, onKeyUp,
        ...activeStateHandlers
    } = useActiveState(isHovering, isDisabled, Keys.RIGHT);
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const timeoutId = useRef();

    const delayOpen = delay => {
        dispatch({ type: HoverIndexActionTypes.SET, index });
        timeoutId.current = setTimeout(openMenu, Math.max(delay, 0));
    }

    const handleMouseEnter = () => {
        if (isDisabled || isOpen) return;

        if (isSubmenuOpen) {
            timeoutId.current = setTimeout(
                () => delayOpen(submenuOpenDelay - submenuCloseDelay),
                submenuCloseDelay
            );
        } else {
            delayOpen(submenuOpenDelay);
        }
    }

    const handleMouseLeave = () => {
        clearTimeout(timeoutId.current);
        if (!isOpen) {
            dispatch({ type: HoverIndexActionTypes.UNSET, index });
        }
    }

    const handleClick = () => {
        if (isDisabled) return;
        clearTimeout(timeoutId.current);
        openMenu();
    }

    const handleKeyDown = e => {
        let handled = false;

        switch (e.key) {
            // LEFT key is bubbled up from submenu items
            case Keys.LEFT:
                if (isOpen) {
                    toggleMenu(false);
                    itemRef.current.focus();
                    handled = true;
                }
                break;

            // prevent browser from scrolling page to the right
            case Keys.RIGHT:
                if (!isOpen) handled = true;
                break;
        }

        if (handled) {
            e.preventDefault();
            e.stopPropagation();
        }
    }

    const handleKeyUp = e => {
        // Check 'isActive' to skip KeyUp when corresponding KeyDown was initiated in another menu item
        if (!isActive) return;

        onKeyUp(e);
        switch (e.key) {
            case Keys.SPACE:
            case Keys.ENTER:
            case Keys.RIGHT:
                openMenu(FocusPositions.FIRST);
                break;
        }
    }

    useLayoutEffect(() => {
        if (!isOpen) return;

        const scrollContainer = getScrollAncestor(containerRef.current, rootMenuRef.current);
        setPortal(rootMenuRef.current !== scrollContainer);
    }, [rootMenuRef, isOpen]);

    useEffect(() => () => clearTimeout(timeoutId.current), []);
    useEffect(() => {
        // Don't set focus when parent menu is closed, otherwise focus will be lost
        // and onBlur event will be fired with relatedTarget setting as null.
        if (isHovering && isParentOpen) {
            itemRef.current.focus();
        } else {
            toggleMenu(false);
        }
    }, [isHovering, isParentOpen, toggleMenu]);

    useEffect(() => {
        dispatch({ type: isOpen ? SubmenuActionTypes.OPEN : SubmenuActionTypes.CLOSE });
    }, [dispatch, isOpen]);

    useMenuChange(onMenuChange, isOpen);

    const modifiers = useMemo(() => Object.freeze({
        open: isOpen,
        hover: isHovering,
        active: isActive,
        disabled: isDisabled
    }), [isOpen, isHovering, isActive, isDisabled]);

    const {
        ref: externaItemlRef,
        className: itemClassName,
        styles: itemStyles,
        ...restItemProps
    } = itemProps;

    const itemHandlers = attachHandlerProps({
        ...activeStateHandlers,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: () => !isHovering && dispatch({ type: HoverIndexActionTypes.SET, index }),
        onClick: handleClick,
        onKeyUp: handleKeyUp
    }, restItemProps);

    const getMenuList = () => {
        const menuList = (
            <MenuList
                {...restProps}
                {...otherStateProps}
                state={state}
                ariaLabel={ariaLabel || (typeof label === 'string' ? label : 'Submenu')}
                anchorRef={itemRef}
                containerRef={portal ? rootMenuRef : containerRef}
                parentScrollingRef={portal && parentMenuRef}
                isDisabled={isDisabled} />
        );
        return portal ? createPortal(menuList, rootMenuRef.current) : menuList;
    }

    return (
        <li className={useBEM({ block: menuClass, element: subMenuClass, className })}
            role="presentation" ref={containerRef}
            onKeyDown={handleKeyDown}>

            <div role="menuitem"
                aria-haspopup={true}
                aria-expanded={isOpen}
                aria-disabled={isDisabled || undefined}
                tabIndex={isHovering && !isOpen ? 0 : -1}
                {...restItemProps}
                {...itemHandlers}
                ref={useCombinedRef(externaItemlRef, itemRef)}
                className={useBEM({
                    block: menuClass,
                    element: menuItemClass,
                    modifiers,
                    className: itemClassName
                })}
                style={useFlatStyles(itemStyles, modifiers)}
            >
                {useMemo(() => safeCall(label, modifiers), [label, modifiers])}
            </div>

            {state && getMenuList()}
        </li>
    );
}), 'SubMenu');

SubMenu.propTypes = {
    ...sharedMenuPropTypes,
    disabled: PropTypes.bool,
    label: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]).isRequired,
    itemProps: PropTypes.shape({
        ...stylePropTypes()
    }),
    onMenuChange: PropTypes.func
};

SubMenu.defaultProps = {
    ...sharedMenuDefaultProp,
    direction: 'right'
};
