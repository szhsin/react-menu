import React, { useEffect, useLayoutEffect } from 'react';

export const version = '2.3.4';
export const build = '102';
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

// Get around a warning when using useLayoutEffect on the server.
// https://github.com/reduxjs/react-redux/blob/b48d087d76f666e1c6c5a9713bbec112a1631841/src/utils/useIsomorphicLayoutEffect.js#L12
// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
// https://github.com/facebook/react/issues/14927#issuecomment-549457471
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'
    ? useLayoutEffect
    : useEffect;

export { useIsomorphicLayoutEffect as useLayoutEffect };
