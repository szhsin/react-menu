# React-Menu

> A customisable, responsive, and optimised React menu library with accessibility.

**[Live examples and documentation](https://szhsin.github.io/react-menu/)**

[![NPM](https://img.shields.io/npm/v/@szhsin/react-menu.svg)](https://www.npmjs.com/package/@szhsin/react-menu) 

## Features

- React menu components for easy and fast web development.
- Unlimited levels of submenu.
- Supports radio and checkbox menu items.
- Supports context menu.
- Flexible menu positioning.
- Customisable styling.
- Comprehensive keyboard interactions.
- Adheres to [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/#menu).

## Installation

```bash
# with npm
npm install @szhsin/react-menu

# with Yarn
yarn add @szhsin/react-menu
```
No peer dependency is required except React 16.8+.

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

MIT Licensed. Copyright (c) 2020 Zheng Song.