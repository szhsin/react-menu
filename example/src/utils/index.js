import React from 'react';

export const version = '2.2.0';
export const build = '0';
export const DomInfoContext = React.createContext({});
export const SettingContext = React.createContext({ theme: 'dark' });
export const TocContext = React.createContext({}); // Table of contents
export const ToastContext = React.createContext(() => {});

export const bem = (block, element, modifiers = {}) => {
  let blockElement = element ? `${block}__${element}` : block;
  let className = blockElement;
  for (const name of Object.keys(modifiers)) {
    const value = modifiers[name];
    if (value) {
      className += ` ${blockElement}--`;
      className += value === true ? name : `${name}-${value}`;
    }
  }

  return className;
};

export const withPresetProps = (MenuComponent) => (props) =>
  <MenuComponent {...props} transition theming={React.useContext(SettingContext).theme} />;
