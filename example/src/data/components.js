import React from 'react';

export const components = [
    {
        id: 'menu',
        title: 'Menu',
        rows: [
            {
                name: 'id',
                type: 'string | number',
                desc:
                    <>
                        <p>Set ID attribute on the root DOM element containing the menu.</p>
                        <p>It can be helpful when you need to style a specific menu differently
                        and use ID in your CSS selectors.</p>
                        <p>It also helps increase selector specificity when overwriting the default style.</p>
                    </>
            },
            {
                name: 'className',
                type: 'string | function',
                desc:
                    <>
                        <p>A string that will be appended to the <code>class</code> of menu DOM element directly.</p>
                        <p>When a function is provided, it will be called by passing an object with the
                        following modifiers and should return a string.</p>
                        <ul>
                            <li><code>open</code> indicates if the menu is open.</li>
                            <li><code>animation</code> indicates if animation is enabled.</li>
                            <li><code>dir</code> the direction in which menu expands.</li>
                        </ul>
                    </>
            },
            {
                name: 'styles',
                type: 'object | function',
                desc:
                    <>
                        <p>A style object that will be applied to the inline style of menu element.</p>
                        <p>Styles targeting modifiers should be supplied as nested objects.
                            For more details, please see the style guide.</p>
                        <p>When a function is provided, it will be called by passing an object with the
                            following modifiers and should return a style object.</p>
                        <ul>
                            <li><code>open</code> indicates if the menu is open.</li>
                            <li><code>animation</code> indicates if animation is enabled.</li>
                            <li><code>dir</code> direction in which the menu expands.</li>
                        </ul>
                    </>
            },
            {
                name: 'aria-label',
                type: 'string',
                desc:
                    <>
                        <p>Set <code>aria-label</code> attribute on the menu DOM element.</p>
                        <p>If not provided, one will be generated from the string content of
                            menu button or the default 'Menu'.</p>
                    </>
            },
            {
                name: 'animation',
                type: 'boolean',
                defaultVal: 'true',
                desc: <p>Enable or disable animation and transition effects in the <code>Menu</code>,
                <code> MenuItem</code>, and any descendent <code>SubMenu</code>.</p>
            },
            {
                name: 'debugging',
                type: 'boolean',
                desc:
                    <>
                        <p><em>Use this prop only when debugging.</em></p>
                        <p>If <code>true</code>, menu doesn't close when losing focus. It may be
                        helpful when you need to inspect and adjust styles in browser developer tools.</p>
                    </>
            },
            {
                name: 'keepMounted',
                type: 'boolean',
                defaultVal: 'true',
                desc: <p>If <code>true</code>, menu keeps mounted in the DOM and is hidden by CSS
                when it's closed. Otherwise, menu is unmounted from DOM when closed.</p>
            },
            {
                name: 'align',
                type: 'string',
                desc:
                    <>
                        <p>Can be 'start', 'center', or 'end'.</p>
                        <p>It sets alignment of menu against menu button.
                            It has effect <strong>only</strong> when <code>direction</code> is
                            set to 'top' or 'bottom'.</p>
                        <p>The alignment of menu is subject to the available viewport space and
                        menu position can be adjusted in order to have it contained within viewport.</p>
                    </>
            },
            {
                name: 'direction',
                type: 'string',
                desc:
                    <>
                        <p>Can be 'left', 'right', 'top', or 'bottom'.</p>
                        <p>It sets direction in which menu expands against menu button.</p>
                        <p>The actual direction in which menu expands is subject to the available viewport space.
                        If available space is not enough in the direction provided in this prop,
                        menu will attempt to expands in the opposite direction.
                        Menu position can also be adjusted in order to have it contained within viewport.</p>
                    </>
            },
            {
                name: 'menuButton',
                type: 'element | function',
                desc:
                    <>
                        <p>Can be a <code>MenuButton</code>, a <code>button</code> element, or a React component.</p>
                        <p>It also accepts a function that returns one of the above.
                            The function will be called by passing an object with the following modifiers.</p>
                        <ul>
                            <li><code>open</code> indicates if the menu is open.</li>
                        </ul>
                        <p>If a React component is provided, it needs to implement the following requirements:</p>
                        <ul>
                            <li><span>Accepts a </span><code>ref</code> prop that is forwarded to the element against which
                            menu will be positioned. The element should be able to receive focus.</li>
                            <li><span>Accepts </span><code>onClick</code> and <code>onKeyDown</code> event props.</li>
                        </ul>
                        <p>Please note <code>MenuButton</code> has one additional benefit that it has
                        managed <code>aria-haspopup</code> and <code>aria-expanded</code> attributes.
                        When using a <code>button</code> element or your own React component, it's your responsibility
                        to set these <code>aria</code> attributes if you need correct accessibility support.</p>
                    </>
            },
            {
                name: 'children',
                type: 'node',
                desc: <p>Can be <code>MenuDivider, MenuHeader, MenuItem,
                MenuRadioGroup, SubMenu</code> or any of their combination.</p>
            },
            {
                name: 'onClick',
                type: 'function',
                desc:
                    <>
                        <p>Event fired when descendent menu items are clicked.</p>
                        <p>Event object properties:</p>
                        <ul>
                            <li><code>value</code> the value prop passed to the <code>MenuItem</code> being
                            clicked. It's useful for helping identify which menu item is clicked.</li>
                            <li><code>keyCode</code> indicates the key code if click is initiated by keyboard.
                            Can be <code>Return(13)</code> or <code>Space(32)</code>.</li>
                            <li><code>checked</code> indicates if the menu item is checked, only
                             for <code>MenuItem type="checkbox"</code>.</li>
                        </ul>
                    </>
            }, {
                name: 'onChange',
                type: 'function',
                desc:
                    <>
                        <p>Event fired when menu open state has changed.</p>
                        <p>Event object properties:</p>
                        <ul>
                            <li><code>open</code> indicates if the menu is open.</li>
                        </ul>
                    </>
            },
        ]
    }
];
