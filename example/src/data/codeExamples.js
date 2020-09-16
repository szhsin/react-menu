export const codeExamples = {
    basicMenu: {
        title: 'Basic menu',

        desc: 'The Basic menu',

        source:
            `<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
        <MenuItem>New File</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuItem>Close Window</MenuItem>
</Menu>`,

        fullSource:
            `import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
            <MenuItem>New File</MenuItem>
            <MenuItem>Save</MenuItem>
            <MenuItem>Close Window</MenuItem>
        </Menu>
    );
}`
    },

    subMenu: {
        title: 'Submenu',

        desc: 'The Basic menu',

        source:
            `<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
<MenuItem>New File</MenuItem>
    <SubMenu label={'Open Recent'}>
        <MenuItem>index.html</MenuItem>
        <MenuItem>example.js</MenuItem>
        <MenuItem>about.css</MenuItem>
    </SubMenu>
    <MenuItem>Save</MenuItem>
</Menu>`,

        fullSource:
            `import React from 'react';
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
            <SubMenu label={'Open Recent'}>
                <MenuItem>index.html</MenuItem>
                <MenuItem>example.js</MenuItem>
                <MenuItem>about.css</MenuItem>
            </SubMenu>
            <MenuItem>Save</MenuItem>
        </Menu>
    );
}`
    }
};
