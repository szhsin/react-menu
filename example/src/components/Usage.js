import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import { codeExamples } from '../data/codeExamples';
import { Example } from './Example';


export const Usage = React.memo(function Usage() {

    return (
        <main id="usage">
            <h1>Usage</h1>
            <Example
                initialFullSource={true}
                data={codeExamples.basicMenu} >
                <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                    <MenuItem>New File</MenuItem>
                    <MenuItem>Save</MenuItem>
                    <MenuItem>Close Window</MenuItem>
                </Menu>
            </Example>

            <Example
                data={codeExamples.subMenu} >
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

        </main >
    );
});
