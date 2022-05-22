import { extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { useState } from 'react';
import { useMenuState } from './useMenuState.js';

var useMenuStateAndFocus = function useMenuStateAndFocus(options) {
  var _useMenuState = useMenuState(options),
      menuProps = _useMenuState[0],
      toggleMenu = _useMenuState[1];

  var _useState = useState(),
      menuItemFocus = _useState[0],
      setMenuItemFocus = _useState[1];

  var openMenu = function openMenu(position, alwaysUpdate) {
    setMenuItemFocus({
      position: position,
      alwaysUpdate: alwaysUpdate
    });
    toggleMenu(true);
  };

  return [_extends({}, menuProps, {
    menuItemFocus: menuItemFocus
  }), toggleMenu, openMenu];
};

export { useMenuStateAndFocus };
