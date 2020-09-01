import React, { useReducer, useCallback } from 'react';

export const menuContainerClass = 'rc-menu-container';
export const menuClass = 'rc-menu';
export const menuButtonClass = 'rc-menu-button';
export const menuItemClass = 'item';
export const subMenuClass = 'submenu';

export const ActiveIndexContext = React.createContext(-1);
export const EventHandlersContext = React.createContext({});

export const keyCodes = Object.freeze({
    'RETURN': 13,
    'ESC': 27,
    'SPACE': 32,
    'END': 35,
    'HOME': 36,
    'LEFT': 37,
    'UP': 38,
    'RIGHT': 39,
    'DOWN': 40
});

export const classSet = (classes) => {
    let className = '';
    for (const c of Object.keys(classes)) {
        if (classes[c]) className += `${c} `;
    }

    return className.trim();
}

export const bem = (block, element, ...modifiers) => {
    let blockElement = element ? `${block}__${element}` : block;
    let className = blockElement;
    for (const [name, value] of modifiers) {
        if (value) {
            className += ` ${blockElement}--`;
            className += (value === true ? name : `${name}-${value}`);
        }
    }

    return className;
}

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
export const useMenuState = (isPersistent = false) => {
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
