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
    },


    radioGroup: {
        title: 'Radio group',

        desc: 'The Basic menu',

        source:
            `const [fontColor, setFontColor] = useState('red');

<Menu menuButton={<MenuButton>Font color</MenuButton>}>
    <MenuRadioGroup
        value={fontColor}
        onChange={e => setFontColor(e.value)}>
        <MenuItem value={'red'}>Red</MenuItem>
        <MenuItem value={'green'}>Green</MenuItem>
        <MenuItem value={'blue'}>Blue</MenuItem>
    </MenuRadioGroup>
</Menu>`,

        fullSource:
            `import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    MenuRadioGroup
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    const [fontColor, setFontColor] = useState('red');

    return (
        <>
            <Menu menuButton={<MenuButton>Font color</MenuButton>}>
                <MenuRadioGroup
                    value={fontColor}
                    onChange={e => setFontColor(e.value)}>
                    <MenuItem value={'red'}>Red</MenuItem>
                    <MenuItem value={'green'}>Green</MenuItem>
                    <MenuItem value={'blue'}>Blue</MenuItem>
                </MenuRadioGroup>
            </Menu>

            <div className="sample-text" style={{ color: fontColor }}>
                    Sample text
            </div>
        </>
    );
}`
    },

    checkBox: {
        title: 'Menu item checkbox',

        desc: 'The Basic menu',

        source:
            `const [isBold, setBold] = useState(true);
const [isItalic, setItalic] = useState(false);
const [isUnderline, setUnderline] = useState(false);

<Menu menuButton={<MenuButton>Font style</MenuButton>}>
    <MenuItem type="checkbox" checked={isBold} 
        onClick={e => setBold(e.checked)}>
        Bold
    </MenuItem>
    <MenuItem type="checkbox" checked={isItalic} 
        onClick={e => setItalic(e.checked)}>
        Italic
    </MenuItem>
    <MenuItem type="checkbox" checked={isUnderline} 
        onClick={e => setUnderline(e.checked)}>
        Underline
    </MenuItem>
</Menu>`,

        fullSource:
            `import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    const [isBold, setBold] = useState(true);
    const [isItalic, setItalic] = useState(false);
    const [isUnderline, setUnderline] = useState(false);

    return (
        <>
            <Menu menuButton={<MenuButton>Font style</MenuButton>}>
                <MenuItem type="checkbox" checked={isBold}
                    onClick={e => setBold(e.checked)}>
                    Bold
                </MenuItem>
                <MenuItem type="checkbox" checked={isItalic}
                    onClick={e => setItalic(e.checked)}>
                    Italic
                </MenuItem>
                <MenuItem type="checkbox" checked={isUnderline}
                    onClick={e => setUnderline(e.checked)}>
                    Underline
                </MenuItem>
            </Menu>

            <div className="sample-text" style={{
                fontWeight: isBold ? 'bold' : 'initial',
                fontStyle: isItalic ? 'italic' : 'initial',
                textDecoration: isUnderline ? 'underline' : 'initial'
            }}>Sample text</div>
        </>
    );
}`

    },
};
