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
            `const [textColor, setTextColor] = useState('red');

<Menu menuButton={<MenuButton>Text color</MenuButton>}>
    <MenuRadioGroup
        value={textColor}
        onChange={e => setTextColor(e.value)}>
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
    const [textColor, setTextColor] = useState('red');

    return (
        <>
            <Menu menuButton={<MenuButton>Text color</MenuButton>}>
                <MenuRadioGroup
                    value={textColor}
                    onChange={e => setTextColor(e.value)}>
                    <MenuItem value={'red'}>Red</MenuItem>
                    <MenuItem value={'green'}>Green</MenuItem>
                    <MenuItem value={'blue'}>Blue</MenuItem>
                </MenuRadioGroup>
            </Menu>

            <div className="sample-text" style={{ color: textColor }}>
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

<Menu menuButton={<MenuButton>Text style</MenuButton>}>
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
            <Menu menuButton={<MenuButton>Text style</MenuButton>}>
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

    headerAndDivider: {
        title: 'Menu header and divider',

        desc: 'The Basic menu',

        source:
            `<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuItem>Close Window</MenuItem>
    <MenuDivider />
    <MenuHeader>Edit</MenuHeader>
    <MenuItem>Cut</MenuItem>
    <MenuItem>Copy</MenuItem>
    <MenuItem>Paste</MenuItem>
    <MenuDivider />
    <MenuItem>Print</MenuItem>
</Menu>`,

        fullSource:
            `import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    MenuHeader,
    MenuDivider
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {

    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
            <MenuItem>New File</MenuItem>
            <MenuItem>Save</MenuItem>
            <MenuItem>Close Window</MenuItem>
            <MenuDivider />
            <MenuHeader>Edit</MenuHeader>
            <MenuItem>Cut</MenuItem>
            <MenuItem>Copy</MenuItem>
            <MenuItem>Paste</MenuItem>
            <MenuDivider />
            <MenuItem>Print</MenuItem>
        </Menu>
    );
}`
    },

    combined: {
        title: 'All combined',

        desc: 'The Basic menu',

        source:
            `<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuDivider />
    <MenuHeader>Text settings</MenuHeader>

    <SubMenu label="Text color">
    <MenuRadioGroup
        value={textColor}
        onChange={e => setTextColor(e.value)}>
        <MenuItem value={'red'}>Red</MenuItem>
        <MenuItem value={'green'}>Green</MenuItem>
        <MenuItem value={'blue'}>Blue</MenuItem>
    </MenuRadioGroup>
    </SubMenu>

    <SubMenu label="Text style">
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
    </SubMenu>
</Menu>`,

        fullSource:
            `import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu,
    MenuHeader,
    MenuDivider,
    MenuRadioGroup
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {

    const [textColor, setTextColor] = useState('red');
    const [isBold, setBold] = useState(true);
    const [isItalic, setItalic] = useState(false);
    const [isUnderline, setUnderline] = useState(false);

    return (
        <>
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuDivider />
                <MenuHeader>Text settings</MenuHeader>

                <SubMenu label="Text color">
                    <MenuRadioGroup
                        value={textColor}
                        onChange={e => setTextColor(e.value)}>
                        <MenuItem value={'red'}>Red</MenuItem>
                        <MenuItem value={'green'}>Green</MenuItem>
                        <MenuItem value={'blue'}>Blue</MenuItem>
                    </MenuRadioGroup>
                </SubMenu>

                <SubMenu label="Text style">
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
                </SubMenu>
            </Menu>

            <div className="sample-text" style={{
                color: textColor,
                fontWeight: isBold ? 'bold' : 'initial',
                fontStyle: isItalic ? 'italic' : 'initial',
                textDecoration: isUnderline ? 'underline' : 'initial'                
            }}>Sample text</div>
        </>
    );
}`
    },
};
