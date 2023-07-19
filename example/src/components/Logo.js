import React from 'react';
import { Menu, MenuItem, MenuDivider, MenuHeader } from '@szhsin/react-menu';
import { useTheme } from '../store';
import { version } from '../utils';

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
      gap={10}
      theming={useTheme().theme}
      className="version-menu"
    >
      <MenuHeader>Version history</MenuHeader>
      <MenuItem href="https://szhsin.github.io/react-menu-v3">v3.5.x</MenuItem>
      <MenuItem href="https://szhsin.github.io/react-menu-v2">v2.3.x</MenuItem>
      <MenuItem href="https://szhsin.github.io/react-menu-v1">v1.11.x</MenuItem>
      <MenuDivider />
      <MenuHeader>Migration guide</MenuHeader>
      <MenuItem href="https://github.com/szhsin/react-menu/blob/master/docs/migration/v4.md">
        migrating to v4
      </MenuItem>
      <MenuItem href="https://github.com/szhsin/react-menu/blob/master/docs/migration/v3.md">
        migrating to v3
      </MenuItem>
      <MenuItem href="https://github.com/szhsin/react-menu/blob/master/docs/migration/v2.md">
        migrating to v2
      </MenuItem>
    </Menu>
  );
});
