export const codeExamples = {
    basicMenu: {
        id: 'basic-menu',

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
        id: 'submenu',

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
        id: 'radio-group',

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

            <div className="sample-text"
                style={{ color: textColor }}>
                Sample text
            </div>
        </>
    );
}`
    },

    checkBox: {
        id: 'checkbox',

        title: 'Checkbox',

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
        id: 'header-divider',

        title: 'Header and divider',

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
        id: 'combined',

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

    menuItem: {
        title: 'Menu item',
        id: 'link-disabled',

        list: {
            linkAndDisabled: {
                id: 'link-disabled',

                title: 'Link and disabled state',

                desc: 'The Basic menu',

                source:
                    `<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
    <MenuItem href="https://www.google.com/">Google</MenuItem>
    <MenuItem href="https://github.com/szhsin/react-menu/"
        target="_blank">
        GitHub (new window)
    </MenuItem>
    <MenuItem>Normal item</MenuItem>
    <MenuItem disabled>Disabled item</MenuItem>
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
            <MenuItem href="https://www.google.com/">Google</MenuItem>
            <MenuItem href="https://github.com/szhsin/react-menu/"
                target="_blank">
                GitHub (new window)
            </MenuItem>
            <MenuItem>Normal item</MenuItem>
            <MenuItem disabled>Disabled item</MenuItem>
        </Menu>
    );
}`
            },

            iconAndImage: {
                id: 'icon-image',

                title: 'Icon and image',

                desc: 'The Basic menu',

                source:
                    `<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
    <MenuItem>
        <i className="material-icons">content_cut</i>Cut
    </MenuItem>
    <MenuItem>
        <i className="material-icons">content_copy</i>Copy
    </MenuItem>
    <MenuItem>
        <i className="material-icons">content_paste</i>Paste
    </MenuItem>
    <MenuDivider />
    <MenuItem href="https://github.com/">
        <img src="octocat.png" alt="" role="presentation" />GitHub
    </MenuItem>
</Menu>`,

                fullSource:
                    `import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    MenuDivider
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
            <MenuItem>
                <i className="material-icons">content_cut</i>Cut
            </MenuItem>
            <MenuItem>
                <i className="material-icons">content_copy</i>Copy
            </MenuItem>
            <MenuItem>
                <i className="material-icons">content_paste</i>Paste
            </MenuItem>
            <MenuDivider />
            <MenuItem href="https://github.com/">
                <img src="octocat.png" alt="" role="presentation" />GitHub
            </MenuItem>
        </Menu>
    );
}`
            },

            hoverAndActive: {
                id: 'hover-active',

                title: 'Hover and active state',

                desc: 'The Basic menu',

                source:
                    `<MenuItem>
    {({ hover, active }) =>
        active ? 'Active' : hover ? 'Press me' : 'Hover me'
    }
    </MenuItem>
    <MenuDivider />
    <MenuItem styles={{ justifyContent: 'center' }}>
    {({ hover, active }) =>
        <i className="material-icons md-48">
            {active ? 'sentiment_very_satisfied'
                : hover ? 'sentiment_satisfied_alt'
                    : 'sentiment_very_dissatisfied'}
        </i>
    }
</MenuItem>`,

                fullSource:
                    `import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    MenuDivider
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
            <MenuItem>
                {({ hover, active }) =>
                    active ? 'Active' : hover ? 'Press me' : 'Hover me'
                }
            </MenuItem>
            <MenuDivider />
            <MenuItem styles={{ justifyContent: 'center' }}>
                {({ hover, active }) =>
                    <i className="material-icons md-48">
                        {active ? 'sentiment_very_satisfied'
                            : hover ? 'sentiment_satisfied_alt'
                                : 'sentiment_very_dissatisfied'}
                    </i>
                }
            </MenuItem>
        </Menu>
    );
}`
            },

        }
    },

    menuButton: {
        title: 'Menu button',
        id: 'open-state',

        list: {
            openState: {
                id: 'open-state',

                title: 'Menu open state',

                desc: 'The Basic menu',

                source:
                    `<Menu menuButton={({ open }) =>
    <MenuButton>{open ? 'Close' : 'Open'}</MenuButton>}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
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
        <Menu menuButton={({ open }) =>
            <MenuButton>{open ? 'Close' : 'Open'}</MenuButton>}>
            <MenuItem>New File</MenuItem>
            <MenuItem>Save</MenuItem>
        </Menu>
    );
}`
            },

            customised: {
                id: 'customised-btn',

                title: 'Customised button',

                desc: 'The Basic menu',

                source:
                    `<Menu menuButton={
    <button className="btn btn-primary">Open menu</button>}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
</Menu>`,

                fullSource:
                    `import React from 'react';
import {
    Menu,
    MenuItem
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    return (
        <Menu menuButton={
            <button className="btn btn-primary">Open menu</button>}>
            <MenuItem>New File</MenuItem>
            <MenuItem>Save</MenuItem>
        </Menu>
    );
}`
            },
        }
    },

    menuPlacement: {
        title: 'Menu placement',
        id: 'menu-direction',

        list: {
            direction: {
                id: 'menu-direction',

                title: 'Direction',

                desc: 'The Basic menu',

                source:
                    `['top', 'left', 'right', 'bottom'].map(direction =>
<Menu menuButton={<MenuButton>{direction}</MenuButton>}
    key={direction} direction={direction}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
</Menu>)`,

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
        ['top', 'left', 'right', 'bottom'].map(direction =>
            <Menu menuButton={<MenuButton>{direction}</MenuButton>}
                key={direction} direction={direction}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
            </Menu>)
    );
}`
            },
        }
    }




};
