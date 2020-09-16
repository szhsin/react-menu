import React, { useEffect } from 'react';
import hljs from 'highlight.js';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';


export const Usage = React.memo(function Usage() {

    useEffect(() => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }, []);

    return (
        <div id="usage">
            <h1>Usage</h1>
            <section>
                <h2>Basic menu</h2>
                <p>The Basic menu</p>
                <div className="example">
                    <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                        <MenuItem>Open File</MenuItem>
                        <MenuItem>Save</MenuItem>
                        <MenuItem>Close Window</MenuItem>
                    </Menu>
                </div>

                <pre>
                    <code className="lang-jsx">
                        {`import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
    <MenuItem>Open File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuItem>Close Window</MenuItem>
</Menu>`}
                    </code>
                </pre>
            </section>

        </div>
    );
});
