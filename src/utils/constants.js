import React from 'react';

export const menuContainerClass = 'rc-menu-container';
export const menuClass = 'rc-menu';
export const menuButtonClass = 'rc-menu-button';
export const menuArrowClass = 'arrow';
export const menuItemClass = 'item';
export const menuDividerClass = 'divider';
export const menuHeaderClass = 'header';
export const subMenuClass = 'submenu';
export const radioGroupClass = 'radio-group';

export const initialHoverIndex = -1;
export const MenuListContext = React.createContext({ hoverIndex: initialHoverIndex });
export const EventHandlersContext = React.createContext({});
export const RadioGroupContext = React.createContext({});
export const SettingsContext = React.createContext({});

export const Keys = Object.freeze({
    'ENTER': 'Enter',
    'ESC': 'Escape',
    'SPACE': ' ',
    'HOME': 'Home',
    'END': 'End',
    'LEFT': 'ArrowLeft',
    'RIGHT': 'ArrowRight',
    'UP': 'ArrowUp',
    'DOWN': 'ArrowDown'
});

export const HoverIndexActionTypes = Object.freeze({
    'RESET': 0,
    'SET': 1,
    'UNSET': 2,
    'INCREASE': 3,
    'DECREASE': 4,
    'FIRST': 5,
    'LAST': 6
});

export const CloseReason = Object.freeze({
    'CLICK': 'click',
    'CANCEL': 'cancel',
    'BLUR': 'blur',
    'SCROLL':'scroll'
});
