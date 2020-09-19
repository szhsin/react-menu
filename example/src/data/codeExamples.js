export const codeExamples = {
    menu: {
        id: 'basic-menu',

        title: 'Menu',

        list: {
            basicMenu: {
                id: 'basic-menu',

                title: 'Basic menu',

                desc: '',

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

            eventHandling: {
                id: 'event-handling',

                title: 'Event handling',

                desc: 'The Basic menu',

                source:
                    `const [text, setText] = useState('');
        
const handleMenuClick = e => {
    setText(t => t + \`[Menu] \${e.value} clicked\\n\\n\`);
};

const handleFileClick = e => {
    setText(t => t + \`[MenuItem] \${e.value} clicked\\n\`);
};

const handleSaveClick = e => {
    setText(t => t + \`[MenuItem] \${e.value} clicked\\n\\n\`);
    return false;
};

<div className="buttons">
    <Menu menuButton={<MenuButton>Open menu</MenuButton>}
        onClick={handleMenuClick}>

        <MenuItem value={'File'} onClick={handleFileClick}>
            New File
        </MenuItem>

        <MenuItem value={'Save'} onClick={handleSaveClick}>
            Save
        </MenuItem>

        <MenuItem value={'Close'}>Close Window</MenuItem>
    </Menu>

    <button className="btn btn btn-dark"
        onClick={() => setText('')}>
        Clear
    </button>
</div>

<textarea readOnly value={text} />`,

                fullSource:
                    `import React, { useRef, useState, useLayoutEffect } from 'react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    const ref = useRef(null);
    const [text, setText] = useState('');

    const handleMenuClick = e => {
        setText(t => t + \`[Menu] \${e.value} clicked\\n\\n\`);
    };

    const handleFileClick = e => {
        setText(t => t + \`[MenuItem] \${e.value} clicked\\n\`);
    };

    const handleSaveClick = e => {
        setText(t => t + \`[MenuItem] \${e.value} clicked\\n\\n\`);
        return false;
    };

    useLayoutEffect(() => {
        ref.current.scrollTop = ref.current.scrollHeight;
    }, [text]);

    return (
        <>
            <div className="buttons">
                <Menu menuButton={<MenuButton>Open menu</MenuButton>}
                    onClick={handleMenuClick}>

                    <MenuItem value={'File'} onClick={handleFileClick}>
                        New File
                    </MenuItem>

                    <MenuItem value={'Save'} onClick={handleSaveClick}>
                        Save
                    </MenuItem>

                    <MenuItem value={'Close'}>Close Window</MenuItem>
                </Menu>

                <button className="btn btn btn-dark"
                    onClick={() => setText('')}>
                    Clear
                </button>
            </div>

            <textarea readOnly ref={ref} value={text} />
        </>
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

                title: 'Combined example',

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
        }
    },

    menuItem: {
        id: 'link-disabled',

        title: 'Menu item',

        list: {
            linkAndDisabled: {
                id: 'link-disabled',

                title: 'Link and disabled',

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

                title: 'Hover and active',

                desc: 'The Basic menu',

                source:
                    `<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
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
        id: 'open-state',

        title: 'Menu button',

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
        <Menu menuButton={({ open }) =>
            <MenuButton>{open ? 'Close' : 'Open'}</MenuButton>}>
            <MenuItem>New File</MenuItem>
            <MenuItem>Save</MenuItem>
            <MenuItem>Close Window</MenuItem>
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
    <MenuItem>Close Window</MenuItem>
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
            <MenuItem>Close Window</MenuItem>
        </Menu>
    );
}`
            },
        }
    },

    menuPlacement: {
        id: 'menu-direction',

        title: 'Menu placement',

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
    <MenuItem>Close Window</MenuItem>
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
                <MenuItem>Close Window</MenuItem>
            </Menu>)
    );
}`
            },

            alignment: {
                id: 'menu-alignment',

                title: 'Alignment',

                desc: 'The Basic menu',

                source:
                    `['start', 'center', 'end'].map(align =>
<Menu menuButton={<MenuButton>{align}</MenuButton>}
    key={align} align={align}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuItem>Close Window</MenuItem>
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
        ['start', 'center', 'end'].map(align =>
            <Menu menuButton={<MenuButton>{align}</MenuButton>}
                key={align} align={align}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
            </Menu>)
    );
}`
            },
        }
    },

    controlled: {
        id: 'controlled-menu',

        title: 'Controlled menu',

        list: {
            controlledMenu: {
                id: 'controlled-menu',

                title: 'Managing state',

                desc: 'The Basic menu',

                source:
                    `const [isOpen, setOpen] = useState(false);
const ref = useRef(null);

<button ref={ref} className="btn btn-dark"
    onClick={() => setOpen(true)}>
    Open menu
</button>

<ControlledMenu anchorRef={ref} isOpen={isOpen}
    onClose={() => setOpen(false)}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuItem>Close Window</MenuItem>
</ControlledMenu>`,

                fullSource:
                    `import React, { useState, useRef } from 'react';
import {
    ControlledMenu,
    MenuItem
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);

    return (
        <>
            <button ref={ref} className="btn btn-dark"
                onClick={() => setOpen(true)}>
                Open menu
            </button>

            <ControlledMenu anchorRef={ref} isOpen={isOpen}
                onClose={() => setOpen(false)}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
            </ControlledMenu>
        </>
    );
}`
            },

            contextMenu: {
                id: 'context-menu',

                title: 'Context menu',

                desc: 'The Basic menu',

                source:
                    `const [isOpen, setOpen] = useState(false);
const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

<div onContextMenu={e => {
    e.preventDefault();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    setOpen(true);
}}>
    Right click to open context menu

    <ControlledMenu anchorPoint={anchorPoint} isOpen={isOpen}
        onClose={() => setOpen(false)}>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
    </ControlledMenu>
</div >`,

                fullSource:
                    `import React, { useState } from 'react';
import {
    ControlledMenu,
    MenuItem
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    return (
        <div onContextMenu={e => {
            e.preventDefault();
            setAnchorPoint({ x: e.clientX, y: e.clientY });
            setOpen(true);
        }}>
            Right click to open context menu

            <ControlledMenu anchorPoint={anchorPoint} isOpen={isOpen}
                onClose={() => setOpen(false)}>
                <MenuItem>Cut</MenuItem>
                <MenuItem>Copy</MenuItem>
                <MenuItem>Paste</MenuItem>
            </ControlledMenu>
        </div >
    );
}`
            },

            useMenuState: {
                id: 'use-menu-state',

                title: 'useMenuState',

                desc: 'The Basic menu',

                source:
                    `const { openMenu, closeMenu, toggleMenu,
    ...menuProps } = useMenuState();
const ref = useRef(null);

<button ref={ref} className="btn btn-dark"
    onClick={() => openMenu()}>
    Open menu
</button>

<ControlledMenu {...menuProps} anchorRef={ref}
    onClose={() => closeMenu()}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuItem>Close Window</MenuItem>
</ControlledMenu>`,

                fullSource:
                    `import React, { useRef } from 'react';
import {
    ControlledMenu,
    MenuItem,
    useMenuState
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    const { openMenu, closeMenu, toggleMenu,
        ...menuProps } = useMenuState();
    const ref = useRef(null);

    return (
        <>
            <button ref={ref} className="btn btn-dark"
                onClick={() => openMenu()}>
                Open menu
            </button>

            <ControlledMenu {...menuProps} anchorRef={ref}
                onClose={() => closeMenu()}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
            </ControlledMenu>
        </>
    );
}`
            },
        }
    }

};
