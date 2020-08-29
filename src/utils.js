import React from 'react';

export const menuContainerClass = 'rc-menu-container';
export const menuClass = 'rc-menu';
export const menuButtonClass = 'rc-menu-button';
export const menuItemClass = 'item';
export const subMenuClass = 'submenu';

export const ActiveIndexContext = React.createContext(-1);
export const KeyEventContext = React.createContext({ keyCode: '' });

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
