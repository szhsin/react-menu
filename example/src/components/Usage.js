import React, { useRef, useState, useLayoutEffect } from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu,
    MenuRadioGroup,
    MenuHeader,
    MenuDivider,
    ControlledMenu,
    useMenuState
} from '@szhsin/react-menu';
import { TableContents } from './TableContents';
import { Example } from './Example';
import { codeExamples } from '../data/codeExamples';


export const Usage = React.memo(function Usage() {

    const getExampleList = (examples) => {
        return Object.keys(examples).map(key => {
            const example = examples[key];
            let list = null;
            if (example.list) {
                list = getExampleList(example.list);
            }

            return {
                id: example.id,
                title: example.title,
                list
            };
        });
    }

    const tableContents = [
        {
            id: 'installation',
            title: 'Installation'
        },

        {
            id: 'usage',
            title: 'Usage',
            list: getExampleList(codeExamples)
        }
    ];

    return (
        <React.Fragment>
            <TableContents>
                {tableContents}
            </TableContents>

            <main id="usage">
                <h1>Usage</h1>
                <BasicMenuExample />
                <SubmenuExample />
                <EventHandlingExample />
                <RadioGroupExample />
                <CheckBoxExample />
                <HeaderAndDividerExample />
                <CombinedExample />
                <LinkAndDisabledExample />
                <IconAndImageExample />
                <HoverAndActiveExample />
                <OpenStateExample />
                <CustomisedButtonExample />
                <MenuDirectionExample />
                <MenuAlignmentExample />
                <ControlledMenuExample />
                <ContextMenuExample />
                <MenuStateHookExample />
                <CustomisedStylingExample />
            </main >

            <div className="place-holder" role="presentation" />
        </React.Fragment>
    );
});

function BasicMenuExample() {

    return (
        <Example initialFullSource={true} data={codeExamples.menu.list.basicMenu} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
            </Menu>
        </Example>
    );
}

function SubmenuExample() {

    return (
        <Example data={codeExamples.menu.list.subMenu} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                <MenuItem>New File</MenuItem>
                <SubMenu label={'Open Recent'}>
                    <MenuItem>index.html</MenuItem>
                    <MenuItem>example.js</MenuItem>
                    <MenuItem>about.css</MenuItem>
                </SubMenu>
                <MenuItem>Save</MenuItem>
            </Menu>
        </Example>
    );
}


function EventHandlingExample() {
    const ref = useRef(null);
    const [text, setText] = useState('');

    const handleMenuClick = e => {
        setText(t => t + `[Menu] ${e.value} clicked\n\n`);
    };

    const handleFileClick = e => {
        setText(t => t + `[MenuItem] ${e.value} clicked\n`);
    };

    const handleSaveClick = e => {
        setText(t => t + `[MenuItem] ${e.value} clicked\n\n`);
        return false;
    };

    useLayoutEffect(() => {
        ref.current.scrollTop = ref.current.scrollHeight;
    }, [text]);

    return (
        <Example data={codeExamples.menu.list.eventHandling} >
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
        </Example>
    );
}

function RadioGroupExample() {
    const [textColor, setTextColor] = useState('red');

    return (
        <Example data={codeExamples.menu.list.radioGroup} >
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
        </Example>
    );
}

function CheckBoxExample() {
    const [isBold, setBold] = useState(true);
    const [isItalic, setItalic] = useState(false);
    const [isUnderline, setUnderline] = useState(false);

    return (
        <Example data={codeExamples.menu.list.checkBox} >
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
        </Example>
    );
}

function HeaderAndDividerExample() {

    return (
        <Example data={codeExamples.menu.list.headerAndDivider} >
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
        </Example>
    );
}

function CombinedExample() {
    const [textColor, setTextColor] = useState('red');
    const [isBold, setBold] = useState(true);
    const [isItalic, setItalic] = useState(false);
    const [isUnderline, setUnderline] = useState(false);

    return (
        <Example data={codeExamples.menu.list.combined} >
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
        </Example>
    );
}

function LinkAndDisabledExample() {

    return (
        <Example data={codeExamples.menuItem.list.linkAndDisabled} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                <MenuItem href="https://www.google.com/">Google</MenuItem>
                <MenuItem href="https://github.com/szhsin/react-menu/"
                    target="_blank">
                    GitHub (new window)
                </MenuItem>
                <MenuItem>Normal item</MenuItem>
                <MenuItem disabled>Disabled item</MenuItem>
            </Menu>
        </Example>
    );
}

function IconAndImageExample() {

    return (
        <Example data={codeExamples.menuItem.list.iconAndImage} >
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
        </Example>
    );
}

function HoverAndActiveExample() {

    return (
        <Example data={codeExamples.menuItem.list.hoverAndActive} >
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
        </Example>
    );
}

function OpenStateExample() {

    return (
        <Example data={codeExamples.menuButton.list.openState} >
            <Menu menuButton={({ open }) =>
                <MenuButton styles={{ minWidth: '5rem' }}>
                    {open ? 'Close' : 'Open'}
                </MenuButton>}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
            </Menu>
        </Example>
    );
}

function CustomisedButtonExample() {

    return (
        <Example data={codeExamples.menuButton.list.customised} >
            <Menu menuButton={<button className="btn btn-primary">Open menu</button>}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
            </Menu>
        </Example>
    );
}

function MenuDirectionExample() {

    const menus = ['top', 'left', 'right', 'bottom'].map(direction => (
        <Menu menuButton={<MenuButton>{direction}</MenuButton>}
            key={direction} direction={direction}>
            <MenuItem>New File</MenuItem>
            <MenuItem>Save</MenuItem>
            <MenuItem>Close Window</MenuItem>
        </Menu>
    ));

    return (
        <Example data={codeExamples.menuPlacement.list.direction} >
            {menus}
        </Example>
    );
}

function MenuAlignmentExample() {

    const menus = ['start', 'center', 'end'].map(align => (
        <Menu menuButton={<MenuButton>{align}</MenuButton>}
            key={align} align={align}>
            <MenuItem>New File</MenuItem>
            <MenuItem>Save</MenuItem>
            <MenuItem>Close Window</MenuItem>
        </Menu>
    ));

    return (
        <Example data={codeExamples.menuPlacement.list.alignment} >
            {menus}
        </Example>
    );
}

function ControlledMenuExample() {

    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);

    return (
        <Example data={codeExamples.controlled.list.controlledMenu}>
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
        </Example>
    );
}

function ContextMenuExample() {

    const [isOpen, setOpen] = useState(false);
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    return (
        <Example data={codeExamples.controlled.list.contextMenu}
            onContextMenu={e => {
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
        </Example >
    );
}

function MenuStateHookExample() {

    const { openMenu, closeMenu, toggleMenu,
        ...menuProps } = useMenuState();
    const ref = useRef(null);

    return (
        <Example data={codeExamples.controlled.list.useMenuState}>
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
        </Example>
    );
}

function CustomisedStylingExample() {

    return (
        <Example data={codeExamples.customStyle} >
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}
                styles={{
                    border: '2px dashed green',
                    boxShadow: 'none'
                }}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem styles={{
                    color: 'blue',
                    backgroundColor: '#ee1',
                    hover: {
                        color: '#ee1',
                        backgroundColor: '#bf4080'
                    },
                    active: {
                        backgroundColor: '#333'
                    }
                }}>
                    I'm special
                </MenuItem>
            </Menu>
        </Example>
    );
}