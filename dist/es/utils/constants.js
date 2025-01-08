import { createContext } from 'react';

const menuContainerClass = 'szh-menu-container';
const menuClass = 'szh-menu';
const menuButtonClass = 'szh-menu-button';
const menuArrowClass = 'arrow';
const menuItemClass = 'item';
const menuDividerClass = 'divider';
const menuHeaderClass = 'header';
const menuGroupClass = 'group';
const subMenuClass = 'submenu';
const radioGroupClass = 'radio-group';
const HoverItemContext = /*#__PURE__*/createContext();
const MenuListItemContext = /*#__PURE__*/createContext({});
const MenuListContext = /*#__PURE__*/createContext({});
const EventHandlersContext = /*#__PURE__*/createContext({});
const RadioGroupContext = /*#__PURE__*/createContext({});
const SettingsContext = /*#__PURE__*/createContext({});
const Keys = /*#__PURE__*/Object.freeze({
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
const HoverActionTypes = /*#__PURE__*/Object.freeze({
  RESET: 0,
  SET: 1,
  UNSET: 2,
  INCREASE: 3,
  DECREASE: 4,
  FIRST: 5,
  LAST: 6,
  SET_INDEX: 7
});
const CloseReason = /*#__PURE__*/Object.freeze({
  CLICK: 'click',
  CANCEL: 'cancel',
  BLUR: 'blur',
  SCROLL: 'scroll'
});
const FocusPositions = /*#__PURE__*/Object.freeze({
  FIRST: 'first',
  LAST: 'last'
});
const MenuStateMap = /*#__PURE__*/Object.freeze({
  entering: 'opening',
  entered: 'open',
  exiting: 'closing',
  exited: 'closed'
});
const positionAbsolute = 'absolute';
const roleNone = 'none';
const roleMenuitem = 'menuitem';
const noScrollFocus = {
  preventScroll: true
};

export { CloseReason, EventHandlersContext, FocusPositions, HoverActionTypes, HoverItemContext, Keys, MenuListContext, MenuListItemContext, MenuStateMap, RadioGroupContext, SettingsContext, menuArrowClass, menuButtonClass, menuClass, menuContainerClass, menuDividerClass, menuGroupClass, menuHeaderClass, menuItemClass, noScrollFocus, positionAbsolute, radioGroupClass, roleMenuitem, roleNone, subMenuClass };
