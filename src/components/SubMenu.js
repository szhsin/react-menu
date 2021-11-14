import React, { memo, useRef, useContext, useEffect, useMemo, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { node, func, bool, shape, oneOf, oneOfType } from 'prop-types';
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
  safeCall,
  stylePropTypes,
  uncontrolledMenuPropTypes,
  menuPropTypes,
  menuDefaultProps,
  menuClass,
  subMenuClass,
  menuItemClass,
  isMenuOpen,
  validateIndex,
  withHovering,
  SettingsContext,
  ItemSettingsContext,
  MenuListItemContext,
  Keys,
  HoverIndexActionTypes,
  SubmenuActionTypes,
  FocusPositions
} from '../utils';

export const SubMenu = withHovering(
  memo(function SubMenu({
    'aria-label': ariaLabel,
    className,
    disabled,
    label,
    index,
    openTrigger,
    onMenuChange,
    isHovering,
    instanceRef,
    captureFocus: _1,
    repositionFlag: _2,
    itemProps = {},
    ...restProps
  }) {
    const isDisabled = !!disabled;
    validateIndex(index, isDisabled, label);

    const { initialMounted, unmountOnClose, transition, transitionTimeout, rootMenuRef } =
      useContext(SettingsContext);
    const { submenuOpenDelay, submenuCloseDelay } = useContext(ItemSettingsContext);
    const { parentMenuRef, parentOverflow, isParentOpen, isSubmenuOpen, dispatch } =
      useContext(MenuListItemContext);
    const isPortal = parentOverflow !== 'visible';

    const {
      openMenu: _openMenu,
      toggleMenu,
      state,
      ...otherStateProps
    } = useMenuStateAndFocus({
      initialMounted,
      unmountOnClose,
      transition,
      transitionTimeout
    });

    const isOpen = isMenuOpen(state);
    const { isActive, onKeyUp, ...activeStateHandlers } = useActiveState(
      isHovering,
      isDisabled,
      Keys.RIGHT
    );
    const containerRef = useRef(null);
    const itemRef = useRef(null);
    const timeoutId = useRef();

    const openMenu = (...args) => {
      clearTimeout(timeoutId.current);
      !isDisabled && _openMenu(...args);
    };

    const setHover = () =>
      !isDisabled && !isHovering && dispatch({ type: HoverIndexActionTypes.SET, index });

    const delayOpen = (delay) => {
      setHover();
      if (!openTrigger) timeoutId.current = setTimeout(openMenu, Math.max(delay, 0));
    };

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
    };

    const handleMouseLeave = () => {
      clearTimeout(timeoutId.current);
      if (!isOpen) dispatch({ type: HoverIndexActionTypes.UNSET, index });
    };

    const handleKeyDown = (e) => {
      let handled = false;

      switch (e.key) {
        // LEFT key is bubbled up from submenu items
        case Keys.LEFT:
          if (isOpen) {
            itemRef.current.focus();
            toggleMenu(false);
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
    };

    const handleKeyUp = (e) => {
      // Check 'isActive' to skip KeyUp when corresponding KeyDown was initiated in another menu item
      if (!isActive) return;

      onKeyUp(e);
      switch (e.key) {
        case Keys.ENTER:
        case Keys.SPACE:
        case Keys.RIGHT:
          openTrigger !== 'none' && openMenu(FocusPositions.FIRST);
          break;
      }
    };

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

    useImperativeHandle(instanceRef, () => ({
      openMenu: (...args) => {
        if (isParentOpen) {
          setHover();
          openMenu(...args);
        }
      },
      closeMenu: () => {
        if (isOpen) {
          itemRef.current.focus();
          toggleMenu(false);
        }
      }
    }));

    const modifiers = useMemo(
      () =>
        Object.freeze({
          open: isOpen,
          hover: isHovering,
          active: isActive,
          disabled: isDisabled,
          submenu: true
        }),
      [isOpen, isHovering, isActive, isDisabled]
    );

    const {
      ref: externaItemlRef,
      className: itemClassName,
      styles: itemStyles,
      ...restItemProps
    } = itemProps;

    const itemHandlers = attachHandlerProps(
      {
        ...activeStateHandlers,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onMouseDown: setHover,
        onClick: () => openTrigger !== 'none' && openMenu(),
        onKeyUp: handleKeyUp
      },
      restItemProps
    );

    const getMenuList = () => {
      const menuList = (
        <MenuList
          {...restProps}
          {...otherStateProps}
          state={state}
          ariaLabel={ariaLabel || (typeof label === 'string' ? label : 'Submenu')}
          anchorRef={itemRef}
          containerRef={isPortal ? rootMenuRef : containerRef}
          parentScrollingRef={isPortal && parentMenuRef}
          isDisabled={isDisabled}
        />
      );
      return isPortal ? createPortal(menuList, rootMenuRef.current) : menuList;
    };

    return (
      <li
        className={useBEM({ block: menuClass, element: subMenuClass, className })}
        role="presentation"
        ref={containerRef}
        onKeyDown={handleKeyDown}
      >
        <div
          role="menuitem"
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
  }),
  'SubMenu'
);

SubMenu.propTypes = {
  ...menuPropTypes,
  ...uncontrolledMenuPropTypes,
  disabled: bool,
  openTrigger: oneOf(['none', 'clickOnly']),
  label: oneOfType([node, func]),
  itemProps: shape({
    ...stylePropTypes()
  })
};

SubMenu.defaultProps = {
  ...menuDefaultProps,
  direction: 'right'
};
