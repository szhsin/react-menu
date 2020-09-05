import { useReducer, useCallback } from 'react';

export const menuStates = Object.freeze({
    'UNMOUNTED': 0, // remove DOM elements when menu is closed
    'CLOSED': 1, // keep elements in DOM but hide them using CSS style when menu is closed
    'OPEN': 2 // menu is open
});

const menuStateActionType = Object.freeze({
    'OPEN': 0,
    'CLOSE': 1,
    'TOGGLE': 2
});

const menuStateReducer = (state, { type, isPersistent }) => {
    switch (type) {
        case menuStateActionType.OPEN:
            return menuStates.OPEN;

        case menuStateActionType.CLOSE:
            if (state === menuStates.OPEN) {
                return isPersistent ? menuStates.CLOSED : menuStates.UNMOUNTED;
            } else {
                return state;
            }

        case menuStateActionType.TOGGLE:
            if (state === menuStates.OPEN) {
                return isPersistent ? menuStates.CLOSED : menuStates.UNMOUNTED;
            } else {
                return menuStates.OPEN;
            }

        default:
            throw new Error('menuStateReducer: unknown action type');
    }
}

// Setting isPersistent as true will keep elements in DOM but hide them using CSS style when menu is closed
export const useMenuState = (isPersistent = true) => {
    const [menuState, dispatch] = useReducer(menuStateReducer, menuStates.UNMOUNTED);

    return {
        menuState,

        isMounted: menuState !== menuStates.UNMOUNTED,

        isOpen: menuState === menuStates.OPEN,

        openMenu: useCallback(() =>
            dispatch({ type: menuStateActionType.OPEN }), []),

        closeMenu: useCallback(() =>
            dispatch({ type: menuStateActionType.CLOSE, isPersistent }), [isPersistent]),

        toggleMenu: useCallback(() =>
            dispatch({ type: menuStateActionType.TOGGLE, isPersistent }), [isPersistent])
    }
}
