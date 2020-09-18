import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu,
    MenuRadioGroup,
    MenuHeader,
    MenuDivider
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
                <RadioGroupExample />
                <CheckBoxExample />
                <HeaderAndDividerExample />
                <CombinedExample />
                <LinkAndDisabledExample />
                <IconAndImageExample />
            </main >

            <div className="place-holder" role="presentation" />

        </React.Fragment>
    );
});

function BasicMenuExample() {

    return (
        <Example initialFullSource={true} data={codeExamples.basicMenu} >
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
        <Example data={codeExamples.subMenu} >
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

function RadioGroupExample() {
    const [textColor, setTextColor] = useState('red');

    return (
        <Example data={codeExamples.radioGroup} >
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
        <Example data={codeExamples.checkBox} >
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
        <Example data={codeExamples.headerAndDivider} >
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
        <Example data={codeExamples.combined} >
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

