
import { useState, useCallback } from 'react';
import { useMenuState } from './useMenuState';
import { FocusPositions } from '../utils';

export const useMenuStateAndFocus = (options) => {
    const menuState = useMenuState(options);
    const [menuItemFocus, setMenuItemFocus] = useState({ position: FocusPositions.INITIAL });

    const { toggleMenu } = menuState;
    const openMenu = useCallback((position = FocusPositions.INITIAL) => {
        setMenuItemFocus({ position });
        toggleMenu(true);
    }, [toggleMenu]);

    return { ...menuState, openMenu, menuItemFocus };
}
