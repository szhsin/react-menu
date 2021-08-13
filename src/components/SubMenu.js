import React, {
    memo,
    forwardRef,
    useRef,
    useContext,
    useEffect,
    useMemo
} from 'react';
import PropTypes from 'prop-types';
import {
    useBEM,
    useFlatStyles,
    useActiveState,
    useMenuChange,
    useMenuStateAndFocus,
    useCombinedRef
} from '../hooks';
import { MenuList } from './MenuList';
import {
    attachHandlerProps,
    defineName,
    safeCall,
    stylePropTypes,
    sharedMenuPropTypes,
    sharedMenuDefaultProp,
    menuClass,
    subMenuClass,
    menuItemClass,
    SettingsContext,
    MenuListItemContext,
    ItemSettingsContext,
    Keys,
    HoverIndexActionTypes,
    SubmenuActionTypes,
    FocusPositions,
    isMenuOpen
} from '../utils';


export const SubMenu = defineName(memo(forwardRef(function SubMenu({
    'aria-label': ariaLabel,
    className,
    styles,
    menuClassName,
    menuStyles,
    disabled,
    label,
    index,
    onChange,
    captureFocus: _1,
    repositionFlag: _2,
    itemProps = {},
    ...restProps
}, externalRef) {

    const { initialMounted, unmountOnClose, transition, transitionTimeout } = useContext(SettingsContext);
    const { submenuOpenDelay, submenuCloseDelay } = useContext(ItemSettingsContext);
    const { isParentOpen, hoverIndex, isSubmenuOpen, dispatch } = useContext(MenuListItemContext);

    const {
        openMenu,
        toggleMenu,
        state,
        ...otherStateProps
    } = useMenuStateAndFocus({ initialMounted, unmountOnClose, transition, transitionTimeout });

    const isOpen = isMenuOpen(state);
    const isHovering = hoverIndex === index;
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

    const handleBlur = e => {
        const relatedTarget = e.relatedTarget || document.activeElement;
        // Check if something which is not in the subtree get focus.
        // It handles situation such as clicking on a sibling disabled menu item
        if (!e.currentTarget.contains(relatedTarget)) {
            toggleMenu(false);
            dispatch({ type: HoverIndexActionTypes.UNSET, index });
        }
    }

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
    useMenuChange(onChange, isOpen);

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

    return (
        <li className={useBEM({ block: menuClass, element: subMenuClass, className })}
            role="presentation" ref={containerRef}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}>

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

            {state && <MenuList
                {...restProps}
                {...otherStateProps}
                state={state}
                ariaLabel={ariaLabel || (typeof label === 'string' ? label : 'Submenu')}
                anchorRef={itemRef}
                containerRef={containerRef}
                externalRef={externalRef}
                isDisabled={isDisabled}
                className={menuClassName}
                styles={menuStyles || styles} />}
        </li>
    );
})), 'SubMenu');

SubMenu.propTypes = {
    ...sharedMenuPropTypes,
    ...stylePropTypes('menu'),
    disabled: PropTypes.bool,
    label: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.func
    ]).isRequired,
    itemProps: PropTypes.shape({
        ...stylePropTypes()
    }),
    onChange: PropTypes.func
};

SubMenu.defaultProps = {
    ...sharedMenuDefaultProp,
    direction: 'right'
};
