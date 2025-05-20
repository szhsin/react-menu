# React-Menu

> An accessible, keyboard-friendly React menu library

**[Live examples and docs](https://szhsin.github.io/react-menu/)**

[![NPM](https://img.shields.io/npm/v/@szhsin/react-menu.svg)](https://www.npmjs.com/package/@szhsin/react-menu)
[![NPM](https://img.shields.io/npm/dm/@szhsin/react-menu)](https://www.npmjs.com/package/@szhsin/react-menu)
[![bundlephobia](https://img.shields.io/bundlephobia/minzip/@szhsin/react-menu)](https://bundlephobia.com/package/@szhsin/react-menu)
[![Known Vulnerabilities](https://snyk.io/test/github/szhsin/react-menu/badge.svg)](https://snyk.io/test/github/szhsin/react-menu)

## Features

- [Lightweight](https://bundlephobia.com/package/@szhsin/react-menu), unstyled React menu components
- Unlimited submenu nesting
- Supports dropdown, hover, and context menus
- Radio and checkbox menu items
- Flexible positioning options
- Full keyboard interaction support
- Compatible with React 18+ concurrent rendering
- Supports server-side rendering
- Implements [WAI-ARIA menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu/) pattern

## Install

with npm

```bash
npm install @szhsin/react-menu
```

or with Yarn

```bash
yarn add @szhsin/react-menu
```

## Usage

```jsx
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';

export default function App() {
  return (
    <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
      <MenuItem>New File</MenuItem>
      <MenuItem>Save</MenuItem>
      <SubMenu label="Edit">
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </SubMenu>
      <MenuItem>Print...</MenuItem>
    </Menu>
  );
}
```

**[Edit on CodeSandbox](https://codesandbox.io/s/react-menu-starter-3ez3c)**<br><br>
**[Visit more examples and docs](https://szhsin.github.io/react-menu/)**<br><br>
**[FAQs](docs/FAQs.md)**<br><br>
Still on an old version? Please checkout our [migration guides](docs/migration/index.md).

## License

[MIT](https://github.com/szhsin/react-menu/blob/master/LICENSE) Licensed.
