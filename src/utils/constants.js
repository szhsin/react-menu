import React from 'react';
import PropTypes from 'prop-types';

export const menuContainerClass = 'rc-menu-container';
export const menuClass = 'rc-menu';
export const menuButtonClass = 'rc-menu-button';
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

export const KeyCodes = Object.freeze({
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

export const HoverIndexActionTypes = Object.freeze({
    'RESET': 0,
    'SET': 1,
    'UNSET': 2,
    'INCREASE': 3,
    'DECREASE': 4,
    'FIRST': 5,
    'LAST': 6
});

export const stylePropTypes = {
    className: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func
    ]),
    styles: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]),
};

export const menuPropTypesBase = {
    ...stylePropTypes,
    'aria-label': PropTypes.string,
    animation: PropTypes.bool,
    debugging: PropTypes.bool,
    align: PropTypes.oneOf(['start', 'center', 'end']),
    direction: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    onClick: PropTypes.func
};
