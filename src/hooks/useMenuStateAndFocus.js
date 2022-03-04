import { useState } from 'react';
import { useMenuState } from './useMenuState';

export const useMenuStateAndFocus = (options) => {
  const [menuProps, toggleMenu] = useMenuState(options);
  const [menuItemFocus, setMenuItemFocus] = useState();

  const openMenu = (position, alwaysUpdate) => {
    setMenuItemFocus({ position, alwaysUpdate });
    toggleMenu(true);
  };

  return [{ ...menuProps, menuItemFocus }, toggleMenu, openMenu];
};
