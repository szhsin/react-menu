
import { useState } from 'react';
import { useMenuState } from './useMenuState';
import { FocusPositions } from '../utils';

export const useMenuStateAndFocus = (options) => {
    const menuState = useMenuState(options);
    const [menuItemFocus, setMenuItemFocus] = useState({ position: FocusPositions.INITIAL });

    const openMenu = (position = FocusPositions.INITIAL) => {
        setMenuItemFocus({ position });
        menuState.toggleMenu(true);
    }

    return { ...menuState, openMenu, menuItemFocus };
}
