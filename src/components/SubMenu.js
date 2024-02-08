import { useRef, useContext, useMemo, useImperativeHandle } from 'react';
import { createPortal } from 'react-dom';
import { node, func, bool, shape, oneOf, oneOfType } from 'prop-types';
import {
  useBEM,
  useCombinedRef,
  useSubMenuState
} from '../hooks';
import { MenuList } from './MenuList';
import {
  mergeProps,
  commonProps,
  roleNone,
  roleMenuitem,
  safeCall,
  stylePropTypes,
  uncontrolledMenuPropTypes,
  menuPropTypes,
  menuClass,
  subMenuClass,
  menuItemClass,
  withHovering,
  SettingsContext,
  MenuListContext,
  MenuListItemContext,
  Keys,
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
    const { rootMenuRef } = settings;
    const { parentMenuRef, parentDir, overflow: parentOverflow } = useContext(MenuListContext);
    const { isParentOpen, submenuCtx } = useContext(MenuListItemContext);
    const isPortal = parentOverflow !== 'visible';
    const { 
      isDisabled, 
      isMounted,
      isOpen, 
      invokeMenuOpen, 
      openMenu, 
      stateProps, 
      stopMenuInvocation 
    } = useSubMenuState(itemRef, disabled, isHovering, openTrigger, onMenuChange);
    const containerRef = useRef(null);

    const onPointerMove = (e) => {
      if (isDisabled) return;
      e.stopPropagation();
      invokeMenuOpen();
    };

    const onPointerLeave = () => {
      stopMenuInvocation();      
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

        {isMounted && getMenuList()}
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
