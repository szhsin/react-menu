import { extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { useState } from 'react';
import { useMenuState } from './useMenuState.js';

var useMenuStateAndFocus = function useMenuStateAndFocus(options) {
  var menuState = useMenuState(options);

  var _useState = useState(),
      menuItemFocus = _useState[0],
      setMenuItemFocus = _useState[1];

  var openMenu = function openMenu(position, alwaysUpdate) {
    setMenuItemFocus({
      position: position,
      alwaysUpdate: alwaysUpdate
    });
    menuState.toggleMenu(true);
  };

  return _extends({}, menuState, {
    openMenu: openMenu,
    menuItemFocus: menuItemFocus
  });
};

export { useMenuStateAndFocus };
