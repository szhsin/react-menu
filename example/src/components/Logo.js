import React from 'react';
import { Menu, MenuItem } from '@szhsin/react-menu';
import { version, SettingContext } from '../utils';

export const Logo = React.memo(function Logo() {
  const menuButton = (
    <div className="app-logo">
      React-Menu
      <div className="version">v{version}</div>
      <i className="material-icons drop-down">arrow_drop_down</i>
    </div>
  );

  return (
    <Menu
      initialMounted
      menuButton={menuButton}
      offsetY={10}
      theming={React.useContext(SettingContext).theme}
    >
      <MenuItem href="https://szhsin.github.io/react-menu-v1">v1.11.x</MenuItem>
    </Menu>
  );
});
