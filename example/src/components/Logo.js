import React from 'react';
import { Menu, MenuItem, MenuDivider, MenuHeader } from '@szhsin/react-menu';
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
      className="version-menu"
    >
      <MenuHeader>Version history</MenuHeader>
      <MenuItem href="https://szhsin.github.io/react-menu-v2">v2.3.x</MenuItem>
      <MenuItem href="https://szhsin.github.io/react-menu-v1">v1.11.x</MenuItem>
      <MenuDivider />
      <MenuHeader>Migration guide</MenuHeader>
      <MenuItem href="https://github.com/szhsin/react-menu/wiki/Migration-from-v2-to-v3">
        v2 to v3
      </MenuItem>
      <MenuItem href="https://github.com/szhsin/react-menu/wiki/Migration-from-v1-to-v2">
        v1 to v2
      </MenuItem>
    </Menu>
  );
});
