# React-Menu

> An accessible and keyboard-friendly React menu library.

**[Live examples and docs](https://szhsin.github.io/react-menu/)**

[![NPM](https://img.shields.io/npm/v/@szhsin/react-menu.svg)](https://www.npmjs.com/package/@szhsin/react-menu)
[![NPM](https://img.shields.io/npm/dm/@szhsin/react-menu)](https://www.npmjs.com/package/@szhsin/react-menu)
[![TypeScript](https://img.shields.io/badge/TypeScript-.d.ts-blue.svg)](https://github.com/szhsin/react-menu/blob/master/types/index.d.ts)
[![Known Vulnerabilities](https://snyk.io/test/github/szhsin/react-menu/badge.svg)](https://snyk.io/test/github/szhsin/react-menu)

## Features

- Unstyled and lightweight [(8kB)](https://bundlephobia.com/package/@szhsin/react-menu) React menu components
- Unlimited levels of submenu
- Supports dropdown, hover, and context menu
- Supports radio and checkbox menu items
- Flexible menu positioning
- Comprehensive keyboard interactions
- Customisable [styling](https://szhsin.github.io/react-menu/#styling)
- [Level 3 support](https://github.com/reactwg/react-18/discussions/70) of React 18 concurrent rendering
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
