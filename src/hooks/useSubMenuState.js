import { useContext, useEffect, useState } from 'react';
import { useMenuChange, useMenuStateAndFocus, useItemEffect } from '../hooks';
import {
  batchedUpdates,
  isMenuOpen,
  SettingsContext,
  MenuListItemContext,
  HoverActionTypes
} from '../utils';

export const useSubMenuState = (itemRef, disabled, isHovering, openTrigger, onMenuChange) => {
  const settings = useContext(SettingsContext);
  const { submenuOpenDelay, submenuCloseDelay } = settings;
  const { isParentOpen, submenuCtx, dispatch, updateItems } = useContext(MenuListItemContext);
  const [stateProps, toggleMenu, _openMenu] = useMenuStateAndFocus(settings);
  const { state } = stateProps;
  const isDisabled = !!disabled;
  const isOpen = isMenuOpen(state);
  const [timerId] = useState({ v: 0 });

  const stopTimer = () => {
    submenuCtx.off();
    if (timerId.v) {
      clearTimeout(timerId.v);
      timerId.v = 0;
    }
  };

  const setHover = () =>
    !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);

  const openMenu = (...args) => {
    stopTimer();
    setHover();
    !isDisabled && _openMenu(...args);
  };

  const delayOpen = (delay) => {
    setHover();
    if (!openTrigger) timerId.v = setTimeout(() => batchedUpdates(openMenu), Math.max(delay, 0));
  };

  const invokeMenuOpen = () => {
    if (timerId.v || isOpen) return;
    // B.m. first it will see if in the list another sibling SubMenu's menuList is open.
    // if so, delay it by first closing the other
    // The second parameter delays the opening of this SubMenu MenuList by the submenuCloseDelay
    // and then executes the function which delays again by the chosen difference (see below)
    // The third parameter will get executed immediately (But due to its function (see delayOpen) it delays again)
    submenuCtx.on(
      submenuCloseDelay,
      () => delayOpen(submenuOpenDelay - submenuCloseDelay),
      () => delayOpen(submenuOpenDelay)
    );
  };

  const stopMenuInvocation = () => {
    stopTimer();
    if (!isOpen) dispatch(HoverActionTypes.UNSET, itemRef.current);
  }

  useItemEffect(isDisabled, itemRef, updateItems);
  useMenuChange(onMenuChange, isOpen);

  useEffect(() => submenuCtx.toggle(isOpen), [submenuCtx, isOpen]);
  useEffect(() => () => clearTimeout(timerId.v), [timerId]); // b.m.: Maybe for unmounting component, clear the timeout
  useEffect(() => {
    // Don't set focus when parent menu is closed, otherwise focus will be lost
    // and onBlur event will be fired with relatedTarget setting as null.
    if (isHovering && isParentOpen) {
      itemRef.current.focus();
    } else {
      toggleMenu(false);
    }
  }, [isHovering, isParentOpen, toggleMenu, itemRef]);

  return {
    isDisabled,
    isMounted: Boolean(state),
    isOpen,
    invokeMenuOpen,
    openMenu,
    stateProps,
    stopMenuInvocation,
    toggleMenu
  };
};
