
import { useState } from 'react';
import { useMenuState } from './useMenuState';

export const useMenuStateAndFocus = (options) => {
    const menuState = useMenuState(options);
    const [menuItemFocus, setMenuItemFocus] = useState({});

    const openMenu = (position, alwaysUpdate) => {
        setMenuItemFocus({ position, alwaysUpdate });
        menuState.toggleMenu(true);
    }

    return { ...menuState, openMenu, menuItemFocus };
}
