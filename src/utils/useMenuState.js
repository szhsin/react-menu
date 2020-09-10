import { useReducer, useCallback } from 'react';

export const MenuStates = Object.freeze({
    'UNMOUNTED': 0, // remove DOM elements when menu is closed
    'CLOSED': 1, // keep elements in DOM but hide them using CSS style when menu is closed
    'OPEN': 2 // menu is open
});

const MenuStateActionType = Object.freeze({
    'OPEN': 0,
    'CLOSE': 1,
    'TOGGLE': 2
});

const menuStateReducer = (state, { type, isPersistent }) => {
    switch (type) {
        case MenuStateActionType.OPEN:
            return MenuStates.OPEN;

        case MenuStateActionType.CLOSE:
            if (state === MenuStates.OPEN) {
                return isPersistent ? MenuStates.CLOSED : MenuStates.UNMOUNTED;
            } else {
                return state;
            }

        case MenuStateActionType.TOGGLE:
            if (state === MenuStates.OPEN) {
                return isPersistent ? MenuStates.CLOSED : MenuStates.UNMOUNTED;
            } else {
                return MenuStates.OPEN;
            }

        default:
            throw new Error('menuStateReducer: unknown action type');
    }
}

// Setting isPersistent as true will keep elements in DOM but hide them using CSS style when menu is closed
export const useMenuState = (isPersistent = true) => {
    const [menuState, dispatch] = useReducer(menuStateReducer, MenuStates.UNMOUNTED);

    return {
        menuState,

        isMounted: menuState !== MenuStates.UNMOUNTED,

        isOpen: menuState === MenuStates.OPEN,

        openMenu: useCallback(() =>
            dispatch({ type: MenuStateActionType.OPEN }), []),

        closeMenu: useCallback(() =>
            dispatch({ type: MenuStateActionType.CLOSE, isPersistent }), [isPersistent]),

        toggleMenu: useCallback(() =>
            dispatch({ type: MenuStateActionType.TOGGLE, isPersistent }), [isPersistent])
    }
}
