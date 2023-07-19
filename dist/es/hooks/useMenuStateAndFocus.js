import { useState } from 'react';
import { useMenuState } from './useMenuState.js';

const useMenuStateAndFocus = options => {
  const [menuProps, toggleMenu] = useMenuState(options);
  const [menuItemFocus, setMenuItemFocus] = useState();
  const openMenu = (position, alwaysUpdate) => {
    setMenuItemFocus({
      position,
      alwaysUpdate
    });
    toggleMenu(true);
  };
  return [{
    menuItemFocus,
    ...menuProps
  }, toggleMenu, openMenu];
};

export { useMenuStateAndFocus };
