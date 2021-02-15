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

export const SUBMENU_CLOSE_DELAY = 160;
export const SUBMENU_OPEN_DELAY = 160;

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
    'RESET': 'HOVER_INDEX_RESET',
    'SET': 'HOVER_INDEX_SET',
    'UNSET': 'HOVER_INDEX_UNSET',
    'INCREASE': 'HOVER_INDEX_INCREASE',
    'DECREASE': 'HOVER_INDEX_DECREASE',
    'FIRST': 'HOVER_INDEX_FIRST',
    'LAST': 'HOVER_INDEX_LAST'
});

export const SubmenuActionTypes = Object.freeze({
    'OPEN': 'SUBMENU_OPEN',
    'CLOSE': 'SUBMENU_CLOSE'
});

export const CloseReason = Object.freeze({
    'CLICK': 'click',
    'CANCEL': 'cancel',
    'BLUR': 'blur',
    'SCROLL': 'scroll'
});
