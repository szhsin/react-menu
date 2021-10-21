import { createContext } from 'react';

var menuContainerClass = 'szh-menu-container';
var menuClass = 'szh-menu';
var menuButtonClass = 'szh-menu-button';
var menuArrowClass = 'arrow';
var menuItemClass = 'item';
var menuDividerClass = 'divider';
var menuHeaderClass = 'header';
var menuGroupClass = 'group';
var subMenuClass = 'submenu';
var radioGroupClass = 'radio-group';
var initialHoverIndex = -1;
var HoverIndexContext = /*#__PURE__*/createContext(initialHoverIndex);
var MenuListItemContext = /*#__PURE__*/createContext({});
var MenuListContext = /*#__PURE__*/createContext({});
var EventHandlersContext = /*#__PURE__*/createContext({});
var RadioGroupContext = /*#__PURE__*/createContext({});
var SettingsContext = /*#__PURE__*/createContext({});
var ItemSettingsContext = /*#__PURE__*/createContext({});
var Keys = /*#__PURE__*/Object.freeze({
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
var HoverIndexActionTypes = /*#__PURE__*/Object.freeze({
  RESET: 'HOVER_RESET',
  SET: 'HOVER_SET',
  UNSET: 'HOVER_UNSET',
  INCREASE: 'HOVER_INCREASE',
  DECREASE: 'HOVER_DECREASE',
  FIRST: 'HOVER_FIRST',
  LAST: 'HOVER_LAST'
});
var SubmenuActionTypes = /*#__PURE__*/Object.freeze({
  OPEN: 'SUBMENU_OPEN',
  CLOSE: 'SUBMENU_CLOSE'
});
var CloseReason = /*#__PURE__*/Object.freeze({
  CLICK: 'click',
  CANCEL: 'cancel',
  BLUR: 'blur',
  SCROLL: 'scroll'
});
var FocusPositions = /*#__PURE__*/Object.freeze({
  INITIAL: 'initial',
  FIRST: 'first',
  LAST: 'last'
});
var MenuStateMap = /*#__PURE__*/Object.freeze({
  entering: 'opening',
  entered: 'open',
  exiting: 'closing',
  exited: 'closed'
});

export { CloseReason, EventHandlersContext, FocusPositions, HoverIndexActionTypes, HoverIndexContext, ItemSettingsContext, Keys, MenuListContext, MenuListItemContext, MenuStateMap, RadioGroupContext, SettingsContext, SubmenuActionTypes, initialHoverIndex, menuArrowClass, menuButtonClass, menuClass, menuContainerClass, menuDividerClass, menuGroupClass, menuHeaderClass, menuItemClass, radioGroupClass, subMenuClass };
