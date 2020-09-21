import React from 'react';

const menuModifiers = (
    <ul>
        <li><code>open</code> indicates if the menu is open.</li>
        <li><code>animation</code> indicates if animation is enabled.</li>
        <li><code>dir</code> direction in which the menu expands.</li>
    </ul>
);

const submenuModifiers = (
    <ul>
        <li><code>open</code> indicates if the submenu is open.</li>
        <li><code>hover</code> indicates if the submenu item is being hovered and has focus.</li>
        <li><code>active</code> indicates if the submenu item is active(pressed).</li>
        <li><code>disabled</code> indicates if the submenu item is disabled.</li>
    </ul>
);

const menuItemModifiers = (
    <ul>
        <li><code>hover</code> indicates if the menu item is being hovered and has focus.</li>
        <li><code>active</code> indicates if the menu item is active(pressed).</li>
        <li><code>checked</code> indicates if the menu item is checked in both radio and checkbox item.</li>
        <li><code>disabled</code> indicates if the menu item is disabled.</li>
        <li><code>anchor</code> indicates if the menu item has a URL link.</li>
        <li><code>type</code> string value that is 'radio' in radio item and 'checkbox' in checkbox item.</li>
    </ul>
);

const onClickEventObject = (
    <>
        <p>Event object properties:</p>
        <ul>
            <li><code>value</code> the value prop passed to the <code>MenuItem</code> being
                clicked. It's useful for helping identify which menu item is clicked.</li>
            <li><code>keyCode</code> indicates the key code if click is triggered by keyboard.
                Can be <code>Return(13)</code> or <code>Space(32)</code>.</li>
            <li><code>checked</code> indicates if the menu item is checked, only
                 for <code>MenuItem type="checkbox"</code>.</li>
        </ul>
    </>
);

const keepMountedProp = {
    name: 'keepMounted',
    type: 'boolean',
    defaultVal: 'true',
    desc: <p>If <code>true</code>, menu keeps mounted in the DOM and is hidden by CSS
    when it's closed. Otherwise, menu is unmounted from DOM when closed.</p>
};

const menuChildrenProp = {
    name: 'children',
    type: 'node',
    desc: <p>Can be <code>MenuDivider, MenuHeader, MenuItem,
    MenuRadioGroup, SubMenu</code> or any of their combinations.</p>
};

const onChangeProp = {
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
};

const styleProps = (target, modifiers, className, styles) => [
    {
        name: className || 'className',
        type: 'string | function',
        desc:
            <>
                <p>A string that will be appended to the <code>class</code> of <strong>{target}</strong> DOM element directly.</p>
                <p>When a function is provided, it will be called by passing an object with the
                following properties and should return a string.</p>
                {modifiers}
            </>
    },
    {
        name: styles || 'styles',
        type: 'object | function',
        desc:
            <>
                <p>A style object that will be applied to the inline style of <strong>{target}</strong> DOM element.</p>
                <p>Styles targeting modifier properties should be supplied as nested objects.
                    For more details, please see the style guide.</p>
                <p>When a function is provided, it will be called by passing an object with the
                    following properties and should return a style object.</p>
                {modifiers}
            </>
    }
];

const menuPropsBase = [
    ...styleProps('menu', menuModifiers),
    menuChildrenProp,
    {
        name: 'id',
        type: 'string | number',
        desc:
            <>
                <p>Sets ID attribute on the root DOM element containing the menu.</p>
                <p>It can be helpful when you need to style a specific menu differently
                and use ID in your CSS selectors.</p>
                <p>It also helps increase selector specificity when overwriting the default style.</p>
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
        name: 'onClick',
        type: 'function',
        desc:
            <>
                <p>Event fired when descendent menu items are clicked.</p>
                {onClickEventObject}
            </>
    }
];

export const components = [
    {
        id: 'menu',
        title: 'Menu',
        rows: [
            ...menuPropsBase,
            keepMountedProp,
            onChangeProp,
            {
                name: 'aria-label',
                type: 'string',
                desc:
                    <>
                        <p>Sets <code>aria-label</code> attribute on the menu DOM element.</p>
                        <p>If not provided, one will be generated from the string content of
                            menu button or the default 'Menu'.</p>
                    </>
            },
            {
                name: 'menuButton',
                type: 'element | function',
                desc:
                    <>
                        <p>Can be a <code>MenuButton</code>, a <code>button</code> element, or a React component.</p>
                        <p>It also accepts a function that returns one of the above.
                            The function will be called by passing an object with the following properties:</p>
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
            }
        ]
    },

    {
        id: 'controlled-menu',
        title: 'ControlledMenu',
        rows: [
            ...menuPropsBase,
            {
                name: 'aria-label',
                type: 'string',
                desc:
                    <>
                        <p>Sets <code>aria-label</code> attribute on the menu DOM element.</p>
                        <p>If not provided, it will be set as 'Menu'.</p>
                    </>
            },
            {
                name: 'anchorPoint',
                type: 'object',
                desc:
                    <>
                        <p><em>Use this prop only for context menu.</em></p>
                        <p>An object describes viewport coordinates against which context menu will be positioned.</p>
                        <p>It has the shape of <code>{'{ x: number, y: number }'}</code>.</p>
                    </>
            },
            {
                name: 'anchorRef',
                type: 'object',
                desc:
                    <>
                        <p>A ref object attached to a DOM element against which menu will be positioned.</p>
                        <p>Supports ref created by <code>React.createRef</code> or <code>useRef</code> hook.
                         Doesn't support callback ref.</p>
                    </>
            },
            {
                name: 'isOpen',
                type: 'boolean',
                desc: 'Controls whether the menu is open or not.'
            },
            {
                name: 'isMounted',
                type: 'boolean',
                defaultVal: 'true',
                desc:
                    <>
                        <p>Controls whether the menu is mounted or not.</p>
                        <p>Can be used to unmount menu when it's closed.
                            Recommend using this prop with <code>useMenuState</code>.</p>
                    </>
            },
            {
                name: 'menuItemFocus',
                type: 'object',
                desc:
                    <>
                        <p>Sets which menu item receives focus(hover) when menu opens.</p>
                        <p>Usually you will set this prop when the menu is opened by keyboard events.
                            Recommend using this prop with <code>useMenuState</code>.</p>
                        <p>It has the shape of <code>{'{ position: string }'}</code>. The <code>position</code> can be one of the following:</p>
                        <ul>
                            <li><code>initial</code> don't set focus.</li>
                            <li><code>first</code> focus the first item in the menu.</li>
                            <li><code>last</code> focus the last item in the menu.</li>
                        </ul>
                    </>
            },
            {
                name: 'onClose',
                type: 'function',
                desc:
                    <>
                        <p>Event fired when menu is about to close.</p>
                        <p>Event object properties:</p>
                        <ul>
                            <li><code>reason</code> The reason that causes the close event.
                            Can be 'click', 'cancel', or 'blur'.</li>
                            <li><code>keyCode</code> indicates the key code if event is triggered by keyboard.
                            Can be <code>Return(13), Space(32)</code> or <code>Esc(27)</code>.</li>
                        </ul>
                    </>
            }
        ]
    },

    {
        id: 'menu-item',
        title: 'MenuItem',
        rows: [
            ...styleProps('menu item', menuItemModifiers),
            {
                name: 'value',
                type: 'any',
                desc:
                    <>
                        <p>Any value provided to this prop will be included in the event object
                            of the <code>onClick</code> event.</p>
                        <p>It's useful for helping identify which menu item is clicked
                            when you listen the event on <code>Menu</code> component.</p>
                    </>
            },
            {
                name: 'href',
                type: 'string',
                desc: 'The URL that the menu item points to. If provided, a HTML <a> element will be used.'
            },
            {
                name: 'type',
                type: 'string',
                desc: "Set this prop to 'checkbox' to make it a checkbox menu item. Other values are ignored. Please note radio menu item doesn't use this prop."
            },
            {
                name: 'checked',
                type: 'boolean',
                desc: <p>Set <code>true</code> if a checkbox menu item is checked. Please note radio menu item doesn't use this prop.</p>
            },
            {
                name: 'disabled',
                type: 'boolean',
                desc: <p>Set <code>true</code> to disabled the menu item.</p>
            },
            {
                name: 'children',
                type: 'node | function',
                desc:
                    <>
                        <p>Contents of the menu item, or a function that returns it.
                            The function will be called by passing an object with the following properties:</p>
                        {menuItemModifiers}
                    </>
            },
            {
                name: 'onClick',
                type: 'function',
                desc:
                    <>
                        <p>Event fired when the menu item is clicked. The event will then bubble up to the root
                            menu component. To stop bubbling, return <code>false</code> from the event handler.
                        </p>
                        {onClickEventObject}
                    </>
            }
        ]
    },

    {
        id: 'submenu',
        title: 'SubMenu',
        rows: [
            ...styleProps('submenu item', submenuModifiers),
            ...styleProps('submenu', menuModifiers, 'menuClassName', 'menuStyles'),
            keepMountedProp,
            menuChildrenProp,
            onChangeProp,
            {
                name: 'aria-label',
                type: 'string',
                desc:
                    <>
                        <p>Sets <code>aria-label</code> attribute on the submenu DOM element.</p>
                        <p>If not provided, one will be generated from the string content
                            of <code>label</code> prop or the default 'Submenu'.</p>
                    </>
            },
            {
                name: 'disabled',
                type: 'boolean',
                desc: <p>Set <code>true</code> to disabled the submenu item.</p>
            },
            {
                name: 'label',
                type: 'node | function',
                desc:
                    <>
                        <p>Contents of the submenu item, or a function that returns it.
                            The function will be called by passing an object with the following properties:</p>
                        {submenuModifiers}
                    </>
            },
        ]
    }
];
