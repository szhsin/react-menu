'use strict';

var react = require('react');
var useMenuState = require('./useMenuState.cjs');

const useMenuStateAndFocus = options => {
  const [menuProps, toggleMenu] = useMenuState.useMenuState(options);
  const [menuItemFocus, setMenuItemFocus] = react.useState();
  const openMenu = (position, alwaysUpdate) => {
    setMenuItemFocus({
      position,
      alwaysUpdate
    });
    toggleMenu(true);
  };
  return [{
    menuItemFocus,
    ...menuProps
  }, toggleMenu, openMenu];
};

exports.useMenuStateAndFocus = useMenuStateAndFocus;
