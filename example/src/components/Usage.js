import React, { useEffect } from 'react';
import hljs from 'highlight.js';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import { Example } from './Example';


export const Usage = React.memo(function Usage() {

    useEffect(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }, []);

    return (
        <main id="usage">
            <h1>Usage</h1>
            <Example
                codeSnippet={`import {
                    Menu,
                    MenuItem,
                    MenuButton
                } from '@szhsin/react-menu';
                <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                    <MenuItem>Open File</MenuItem>
                    <MenuItem>Save</MenuItem>
                    <MenuItem>Close Window</MenuItem>
                </Menu>`} >
                <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                    <MenuItem>Open File</MenuItem>
                    <MenuItem>Save</MenuItem>
                    <MenuItem>Close Window</MenuItem>
                </Menu>
            </Example>

        </main >
    );
});
