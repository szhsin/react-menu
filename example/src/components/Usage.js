import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import { codeExamples } from '../data/codeExamples';
import { Example } from './Example';


export const Usage = React.memo(function Usage() {

    return (
        <main id="usage">
            <h1>Usage</h1>
            <Example
                data={codeExamples[0]} >
                <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                    <MenuItem>Open File</MenuItem>
                    <MenuItem>Save</MenuItem>
                    <MenuItem>Close Window</MenuItem>
                </Menu>
            </Example>

        </main >
    );
});
