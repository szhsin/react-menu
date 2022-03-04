import React, { useRef, useContext, useEffect, useMemo, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { node, func, bool, shape, oneOf, oneOfType } from 'prop-types';
import {
  useBEM,
  useCombinedRef,
  useMenuChange,
  useMenuStateAndFocus,
  useItemEffect
} from '../hooks';
import { MenuList } from './MenuList';
import {
  attachHandlerProps,
  batchedUpdates,
  commonProps,
  safeCall,
  stylePropTypes,
  uncontrolledMenuPropTypes,
  menuPropTypes,
  menuDefaultProps,
  menuClass,
  subMenuClass,
  menuItemClass,
  isMenuOpen,
  withHovering,
  SettingsContext,
  ItemSettingsContext,
  MenuListItemContext,
  Keys,
  HoverActionTypes,
  FocusPositions
} from '../utils';

export const SubMenu = withHovering(
  'SubMenu',
  function SubMenu({
    'aria-label': ariaLabel,
    className,
    disabled,
    label,
    openTrigger,
    onMenuChange,
    isHovering,
    instanceRef,
    itemRef,
    captureFocus: _1,
    repositionFlag: _2,
    itemProps = {},
    ...restProps
  }) {
    const { initialMounted, unmountOnClose, transition, transitionTimeout, rootMenuRef } =
      useContext(SettingsContext);
    const { submenuOpenDelay, submenuCloseDelay } = useContext(ItemSettingsContext);
    const {
      parentMenuRef,
      parentOverflow,
      isParentOpen,
      isSubmenuOpen,
      setOpenSubmenuCount,
      dispatch,
      updateItems
    } = useContext(MenuListItemContext);
    const isPortal = parentOverflow !== 'visible';

    const [stateProps, toggleMenu, _openMenu] = useMenuStateAndFocus({
      initialMounted,
      unmountOnClose,
      transition,
      transitionTimeout
    });

    const { state } = stateProps;
    const isDisabled = !!disabled;
    const isOpen = isMenuOpen(state);
    const containerRef = useRef(null);
    const timeoutId = useRef(0);

    const stopTimer = () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = 0;
      }
    };

    const openMenu = (...args) => {
      stopTimer();
      !isDisabled && _openMenu(...args);
    };

    const setHover = () =>
      !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);

    const delayOpen = (delay) => {
      setHover();
      if (!openTrigger)
        timeoutId.current = setTimeout(() => batchedUpdates(openMenu), Math.max(delay, 0));
    };

    const handleMouseMove = () => {
      if (timeoutId.current || isOpen || isDisabled) return;

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
      stopTimer();
      if (!isOpen) dispatch(HoverActionTypes.UNSET, itemRef.current);
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

    const handleItemKeyDown = (e) => {
      if (!isHovering) return;

      switch (e.key) {
        case Keys.ENTER:
        case Keys.SPACE:
        case Keys.RIGHT:
          openTrigger !== 'none' && openMenu(FocusPositions.FIRST);
          break;
      }
    };

    useItemEffect(isDisabled, itemRef, updateItems);
    useMenuChange(onMenuChange, isOpen);

    useEffect(() => () => clearTimeout(timeoutId.current), []);
    useEffect(() => {
      // Don't set focus when parent menu is closed, otherwise focus will be lost
      // and onBlur event will be fired with relatedTarget setting as null.
      if (isHovering && isParentOpen) {
        itemRef.current.focus();
      } else {
        toggleMenu(false);
      }
    }, [isHovering, isParentOpen, toggleMenu, itemRef]);

    useEffect(() => {
      setOpenSubmenuCount((count) => (isOpen ? count + 1 : Math.max(count - 1, 0)));
    }, [setOpenSubmenuCount, isOpen]);

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
          disabled: isDisabled,
          submenu: true
        }),
      [isOpen, isHovering, isDisabled]
    );

    const { ref: externalItemRef, className: itemClassName, ...restItemProps } = itemProps;

    const itemHandlers = attachHandlerProps(
      {
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
        onMouseDown: setHover,
        onKeyDown: handleItemKeyDown,
        onClick: () => openTrigger !== 'none' && openMenu()
      },
      restItemProps
    );

    const getMenuList = () => {
      const menuList = (
        <MenuList
          {...restProps}
          {...stateProps}
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
          aria-haspopup
          aria-expanded={isOpen}
          {...commonProps(isDisabled, isHovering)}
          {...restItemProps}
          {...itemHandlers}
          ref={useCombinedRef(externalItemRef, itemRef)}
          className={useBEM({
            block: menuClass,
            element: menuItemClass,
            modifiers,
            className: itemClassName
          })}
        >
          {useMemo(() => safeCall(label, modifiers), [label, modifiers])}
        </div>

        {state && getMenuList()}
      </li>
    );
  }
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
