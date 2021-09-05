import React from 'react';

export const menuContainerClass = 'szh-menu-container';
export const menuClass = 'szh-menu';
export const menuButtonClass = 'szh-menu-button';
export const menuArrowClass = 'arrow';
export const menuItemClass = 'item';
export const menuDividerClass = 'divider';
export const menuHeaderClass = 'header';
export const menuGroupClass = 'group';
export const subMenuClass = 'submenu';
export const radioGroupClass = 'radio-group';

export const initialHoverIndex = -1;
export const HoverIndexContext = React.createContext(initialHoverIndex);
export const MenuListItemContext = React.createContext({});
export const MenuListContext = React.createContext({});
export const EventHandlersContext = React.createContext({});
export const RadioGroupContext = React.createContext({});
export const SettingsContext = React.createContext({});
export const ItemSettingsContext = React.createContext({});

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
    'RESET': 'HOVER_RESET',
    'SET': 'HOVER_SET',
    'UNSET': 'HOVER_UNSET',
    'INCREASE': 'HOVER_INCREASE',
    'DECREASE': 'HOVER_DECREASE',
    'FIRST': 'HOVER_FIRST',
    'LAST': 'HOVER_LAST'
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

export const FocusPositions = Object.freeze({
    'INITIAL': 'initial',
    'FIRST': 'first',
    'LAST': 'last'
});

export const MenuStateMap = Object.freeze({
    entering: 'opening',
    entered: 'open',
    exiting: 'closing',
    exited: 'closed'
});
