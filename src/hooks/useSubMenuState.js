import { useContext, useEffect, useState } from 'react';
import { useMenuChange } from './useMenuChange';
import { useMenuStateAndFocus } from './useMenuStateAndFocus';
import { useItemEffect } from './useItemEffect';
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
  const [openDelayTimer] = useState({ v: 0 });

  const clearOpeningDelayPhase = () => {
    submenuCtx.off();
    if (openDelayTimer.v) {
      clearTimeout(openDelayTimer.v);
      openDelayTimer.v = 0;
    }
  };

  const setHover = () =>
    !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);

  const openMenu = (...args) => {
    clearOpeningDelayPhase();
    setHover();
    !isDisabled && _openMenu(...args);
  };

  const delayOpen = (delay) => {
    setHover();
    if (!openTrigger) openDelayTimer.v = setTimeout(() => batchedUpdates(openMenu), Math.max(delay, 0));
  };

  const invokeMenuOpen = () => {
    if (openDelayTimer.v || isOpen) return;
    submenuCtx.on(
      submenuCloseDelay,
      () => delayOpen(submenuOpenDelay - submenuCloseDelay),
      () => delayOpen(submenuOpenDelay)
    );
  };

  const stopMenuInvocation = () => {
    clearOpeningDelayPhase();
    if (!isOpen) dispatch(HoverActionTypes.UNSET, itemRef.current);
  }

  useItemEffect(isDisabled, itemRef, updateItems);
  useMenuChange(onMenuChange, isOpen);

  useEffect(() => submenuCtx.toggle(isOpen), [submenuCtx, isOpen]);
  useEffect(() => () => clearTimeout(openDelayTimer.v), [openDelayTimer]);
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
