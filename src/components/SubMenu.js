import { useState, useRef, useContext, useEffect, useMemo, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import {
  useBEM,
  useCombinedRef,
  useMenuChange,
  useMenuStateAndFocus,
  useItemEffect
} from '../hooks';
import { MenuList } from './MenuList';
import {
  mergeProps,
  batchedUpdates,
  commonProps,
  roleNone,
  roleMenuitem,
  safeCall,
  menuClass,
  subMenuClass,
  menuItemClass,
  isMenuOpen,
  withHovering,
  SettingsContext,
  MenuListContext,
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
    direction,
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
    const settings = useContext(SettingsContext);
    const { rootMenuRef, submenuOpenDelay, submenuCloseDelay } = settings;
    const { parentMenuRef, parentDir, overflow: parentOverflow } = useContext(MenuListContext);
    const { isParentOpen, submenuCtx, dispatch, updateItems } = useContext(MenuListItemContext);
    const isPortal = parentOverflow !== 'visible';
    const [stateProps, toggleMenu, _openMenu] = useMenuStateAndFocus(settings);
    const { state } = stateProps;
    const isDisabled = !!disabled;
    const isOpen = isMenuOpen(state);
    const containerRef = useRef(null);
    const [timerId] = useState({ v: 0 });

    const stopTimer = () => {
      submenuCtx.off();
      if (timerId.v) {
        clearTimeout(timerId.v);
        timerId.v = 0;
      }
    };

    const openMenu = (...args) => {
      stopTimer();
      setHover();
      !isDisabled && _openMenu(...args);
    };

    const setHover = () =>
      !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);

    const delayOpen = (delay) => {
      setHover();
      if (!openTrigger) timerId.v = setTimeout(() => batchedUpdates(openMenu), Math.max(delay, 0));
    };

    const onPointerMove = (e) => {
      if (isDisabled) return;
      e.stopPropagation();
      if (timerId.v || isOpen) return;
      submenuCtx.on(
        submenuCloseDelay,
        () => delayOpen(submenuOpenDelay - submenuCloseDelay),
        () => delayOpen(submenuOpenDelay)
      );
    };

    const onPointerLeave = () => {
      stopTimer();
      if (!isOpen) dispatch(HoverActionTypes.UNSET, itemRef.current);
    };

    const onKeyDown = (e) => {
      if (!isHovering) return;

      switch (e.key) {
        case Keys.ENTER:
          e.preventDefault(); // eslint-disable-next-line no-fallthrough
        case Keys.SPACE:
        case Keys.RIGHT:
          openTrigger !== 'none' && openMenu(FocusPositions.FIRST);
      }
    };

    const onKeyDownOfRoot = (e) => {
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

    useItemEffect(isDisabled, itemRef, updateItems);
    useMenuChange(onMenuChange, isOpen);

    useEffect(() => submenuCtx.toggle(isOpen), [submenuCtx, isOpen]);
    useEffect(() => () => clearTimeout(timerId.v), [timerId]);
    useEffect(() => {
      // Don't set focus when parent menu is closed, otherwise focus will be lost
      // and onBlur event will be fired with relatedTarget setting as null.
      if (isHovering && isParentOpen) {
        itemRef.current.focus();
      } else {
        toggleMenu(false);
      }
    }, [isHovering, isParentOpen, toggleMenu, itemRef]);

    useImperativeHandle(instanceRef, () => ({
      openMenu: (...args) => {
        isParentOpen && openMenu(...args);
      },
      closeMenu: () => {
        if (isOpen) {
          itemRef.current.focus();
          toggleMenu(false);
        }
      }
    }));

    const modifiers = useMemo(
      () => ({
        open: isOpen,
        hover: isHovering,
        disabled: isDisabled,
        submenu: true
      }),
      [isOpen, isHovering, isDisabled]
    );

    const { ref: externalItemRef, className: itemClassName, ...restItemProps } = itemProps;

    const mergedItemProps = mergeProps(
      {
        onPointerEnter: submenuCtx.off, // For moving mouse from submenu back to its anchor item
        onPointerMove,
        onPointerLeave,
        onKeyDown,
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
          direction={
            direction || (parentDir === 'right' || parentDir === 'left' ? parentDir : 'right')
          }
          parentScrollingRef={isPortal && parentMenuRef}
          isDisabled={isDisabled}
        />
      );
      const container = rootMenuRef.current;
      return isPortal && container ? createPortal(menuList, container) : menuList;
    };

    return (
      <li
        className={useBEM({ block: menuClass, element: subMenuClass, className })}
        style={{ position: 'relative' }}
        role={roleNone}
        ref={containerRef}
        onKeyDown={onKeyDownOfRoot}
      >
        <div
          role={roleMenuitem}
          aria-haspopup
          aria-expanded={isOpen}
          {...commonProps(isDisabled, isHovering)}
          {...mergedItemProps}
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
