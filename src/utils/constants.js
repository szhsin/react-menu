import { createContext } from 'react';

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

export const HoverItemContext = createContext();
export const MenuListItemContext = createContext({});
export const MenuListContext = createContext({});
export const EventHandlersContext = createContext({});
export const RadioGroupContext = createContext({});
export const SettingsContext = createContext({});
export const ItemSettingsContext = createContext({});

export const Keys = Object.freeze({
  ENTER: 'Enter',
  ESC: 'Escape',
  SPACE: ' ',
  HOME: 'Home',
  END: 'End',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown'
});

export const HoverActionTypes = Object.freeze({
  RESET: 'RESET',
  SET: 'SET',
  UNSET: 'UNSET',
  INCREASE: 'INCREASE',
  DECREASE: 'DECREASE',
  FIRST: 'FIRST',
  LAST: 'LAST',
  SET_INDEX: 'SET_INDEX'
});

export const CloseReason = Object.freeze({
  CLICK: 'click',
  CANCEL: 'cancel',
  BLUR: 'blur',
  SCROLL: 'scroll'
});

export const FocusPositions = Object.freeze({
  FIRST: 'first',
  LAST: 'last'
});

export const MenuStateMap = Object.freeze({
  entering: 'opening',
  entered: 'open',
  exiting: 'closing',
  exited: 'closed'
});
