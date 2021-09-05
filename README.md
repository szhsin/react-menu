# React-Menu

> An accessible, responsive, and customisable React menu library.

**[Live examples and documentation](https://szhsin.github.io/react-menu/)**

[![NPM](https://img.shields.io/npm/v/@szhsin/react-menu.svg)](https://www.npmjs.com/package/@szhsin/react-menu)
[![TypeScript](https://img.shields.io/badge/TypeScript-.d.ts-blue.svg)](https://github.com/szhsin/react-menu/blob/master/types/index.d.ts)
[![Known Vulnerabilities](https://snyk.io/test/github/szhsin/react-menu/badge.svg)](https://snyk.io/test/github/szhsin/react-menu)

## Features

- React menu components for easy and fast web development.
- Unlimited levels of submenu.
- Supports radio and checkbox menu items.
- Supports context menu.
- Flexible menu positioning.
- Customisable styling.
- Comprehensive keyboard interactions.
- Adheres to [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/#menu).

## Install

```bash
# with npm
npm install @szhsin/react-menu

# with Yarn
yarn add @szhsin/react-menu
```

## Usage

```jsx
import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
            <MenuItem>New File</MenuItem>
            <SubMenu label="Open">
                <MenuItem>index.html</MenuItem>
                <MenuItem>example.js</MenuItem>
                <MenuItem>about.css</MenuItem>
            </SubMenu>
            <MenuItem>Save</MenuItem>
        </Menu>
    );
}
```

[More examples and documentation](https://szhsin.github.io/react-menu/)

## License

[MIT](https://github.com/szhsin/react-menu/blob/master/LICENSE) Licensed.
