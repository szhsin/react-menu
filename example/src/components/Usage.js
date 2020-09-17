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
import { codeExamples } from '../data/codeExamples';
import { Example } from './Example';


export const Usage = React.memo(function Usage() {

    const [textColor, setTextColor] = useState('red');
    const [isBold, setBold] = useState(true);
    const [isItalic, setItalic] = useState(false);
    const [isUnderline, setUnderline] = useState(false);

    const tableContents = [
        {
            id: 'installation',
            title: 'Installation'
        },

        {
            id: 'usage',
            title: 'Usage',
            list: Object.keys(codeExamples).map(key => {
                const example = codeExamples[key];
                return {
                    id: example.id,
                    title: example.title
                };
            })
        }
    ];

    return (
        <React.Fragment>
            <TableContents list={tableContents} />

            <main id="usage">
                <h1>Usage</h1>
                <Example initialFullSource={true} data={codeExamples.basicMenu} >
                    <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                        <MenuItem>New File</MenuItem>
                        <MenuItem>Save</MenuItem>
                        <MenuItem>Close Window</MenuItem>
                    </Menu>
                </Example>

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

            </main >

        </React.Fragment>
    );
});
