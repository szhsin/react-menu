import React from 'react';
import { LibName } from '../components/LibName';
import { HashLink as Link } from 'react-router-hash-link';
import { ARIAPracticesLink } from '../components/ARIAPracticesLink';


const RETURN_KEY = '13(Return)';
const SPACE_KEY = '32(Space)';
const ESC_KEY = '27(Esc)';

const menuLink = <Link to={'#menu'}>Menu</Link>;
const menuButtonLink = <Link to={'#menu-button'}>MenuButton</Link>;
const controlledMenuLink = <Link to={'#controlled-menu'}>ControlledMenu</Link>;
const radioGroupLink = <Link to={'#radio-group'}>MenuRadioGroup</Link>;
const menuHeaderLink = <Link to={'#menu-header'}>MenuHeader</Link>;
const menuStateHookLink = <Link to={'#use-menu-state'}>useMenuState</Link>;

const menuModifiers = (
    <ul>
        <li><code>open: bool</code> indicates if the menu is open.</li>
        <li><code>animation: bool</code> indicates if animation is enabled.</li>
        <li><code>dir: string</code> direction in which the menu expands. Can be 'left', 'right', 'top', or 'bottom'.</li>
    </ul>
);

const submenuModifiers = (
    <ul>
        <li><code>open: bool</code> indicates if the submenu is open.</li>
        <li><code>hover: bool</code> indicates if the submenu item is being hovered and has focus.</li>
        <li><code>active: bool</code> indicates if the submenu item is active (pressed).</li>
        <li><code>disabled: bool</code> indicates if the submenu item is disabled.</li>
    </ul>
);

const menuItemModifiers = (
    <ul>
        <li><code>hover: bool</code> indicates if the menu item is being hovered and has focus.</li>
        <li><code>active: bool</code> indicates if the menu item is active (pressed).</li>
        <li><code>checked: bool</code> indicates if the menu item is checked if it's a radio or checkbox item.</li>
        <li><code>disabled: bool</code> indicates if the menu item is disabled.</li>
        <li><code>anchor: bool</code> indicates if the menu item has a URL link.</li>
        <li><code>type: string</code> 'radio' in radio item, 'checkbox' in checkbox item,
        or <code>undefined</code> in other items.</li>
    </ul>
);

const onClickEventObject = (
    <>
        <p>Event object properties:</p>
        <ul>
            <li><code>value: any</code> the value prop passed to the <code>MenuItem</code> being
                clicked. It's useful for helping identify which menu item is clicked.</li>
            <li><code>keyCode: number</code> indicates the key code if click is triggered by keyboard.
                Can be <code>{RETURN_KEY}</code> or <code>{SPACE_KEY}</code>.</li>
            <li><code>checked: bool</code> indicates if the menu item is checked, only
                 for <code>MenuItem type="checkbox"</code>.</li>
        </ul>
    </>
);

const keepMountedProp = {
    name: 'keepMounted',
    type: 'boolean',
    defaultVal: 'true',
    desc: <>
        <p>If <code>true</code>, menu keeps mounted in the DOM and is hidden by CSS
        when it's closed. Otherwise, menu is unmounted from DOM when closed.</p>
        <p>Please note menu won't be created and mounted into DOM until it's opened for the first time,
            even if <code>keepMounted</code> is <code>true</code>.</p>
    </>
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
                <li><code>open: bool</code> indicates if the menu is open.</li>
            </ul>
        </>
};

const styleProps = (target, modifiers, className, styles) => [
    {
        name: className || 'className',
        type: `string${modifiers ? ' | function' : ''}`,
        desc:
            <>
                <p>A string that will be appended to the <code>class</code> of <strong>{target}</strong> DOM element.</p>
                {
                    modifiers &&
                    <>
                        <p>When a function is provided, it will be called by passing an object with the
                        following properties and should return a CSS class name.</p>
                        {modifiers}
                    </>
                }
            </>
    },
    {
        name: styles || 'styles',
        type: `object${modifiers ? ' | function' : ''}`,
        desc:
            <>
                <p>A style object that will be applied to the inline style of <strong>{target}</strong> DOM element.</p>
                {
                    modifiers &&
                    <>
                        <p>Styles targeting specific component state should be supplied as nested objects
                            under each key.</p>
                        {modifiers}
                        <p>When a function is provided, it will be called by passing an object with the
                            above properties and should return a <em>flattened</em> style object.</p>
                    </>
                }
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
                <p>It sets alignment of menu with menu button.
                    It has effect <strong>only</strong> when <code>direction</code> is
                    set to 'top' or 'bottom'.</p>
                <p>The alignment of menu is subject to the available viewport space and
                menu position can be adjusted in order to have it contained within viewport.</p>
            </>
    },
    {
        name: 'direction',
        type: 'string',
        defaultVal: "'bottom'",
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

const menu = {
    id: 'menu',
    title: 'Menu',
    desc:
        <>
            <p><code>Menu</code> is a top-level component that contains menu items and other lower level submenus.</p>
            <p>Working with a {menuButtonLink} or a compatible button component, <code>Menu</code> manages states
            which controls the display of its contents and maintains focus among its descendants.</p>
            <p>It should be able to serve the majority of use cases. If you need more controls on how and
                when a menu is open or closed, you might use a {controlledMenuLink}.</p>
        </>,
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
                        menu button, or the default 'Menu'.</p>
                </>
        },
        {
            name: 'menuButton',
            type: 'element | function',
            desc:
                <>
                    <p>Can be a {menuButtonLink}, a <code>button</code> element, or a React component.</p>
                    <p>It also accepts a function that returns one of the above.
                        The function will be called by passing an object with the following properties:</p>
                    <ul>
                        <li><code>open: bool</code> indicates if the menu is open.</li>
                    </ul>
                    <p>If a React component is provided, it needs to implement the following requirements:</p>
                    <ul>
                        <li><span>Accepts a </span><code>ref</code> prop that is forwarded to the element to which
                        menu will be positioned. The element should be able to receive focus.</li>
                        <li><span>Accepts </span><code>onClick</code> and <code>onKeyDown</code> event props.</li>
                    </ul>
                    <p>Please note {menuButtonLink} has one additional benefit that it has
                    managed <code>aria-haspopup</code> and <code>aria-expanded</code> attributes.
                    When using a <code>button</code> element or your own React component, it's your job
                    to set these <code>aria</code> attributes if you need correct accessibility support.</p>
                </>
        }
    ]
};

const menuItem = {
    id: 'menu-item',
    title: 'MenuItem',
    desc:
        <>
            <p><code>MenuItem</code> represents an item under a menu which can be activated.</p>
            <p>It can a regular menu item, a checkbox item (<code>type="checkbox"</code>),
            or a radio item (direct child of {radioGroupLink}).</p>
        </>,
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
                        menu component. To stop bubbling, return <code>false</code> from the event handler.</p>
                    {onClickEventObject}
                    <p>Please note there is no <code>onClick</code> event on menu items under
                    a {radioGroupLink}. Use <code>onChange</code> event on the group instead.</p>
                </>
        }
    ]
};

const submenu = {
    id: 'submenu',
    title: 'SubMenu',
    desc:
        <>
            <p><code>SubMenu</code> is a menu container under other menu or submenu components.</p>
            <p>It consists of a menu item and a sub-level menu contains submenu items.
             Use <code>label</code> prop to set its own contents,
             and place the submenu items it contains in the <code>children</code> prop.</p>
        </>,
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
                        of <code>label</code> prop, or the default 'Submenu'.</p>
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
};

const menuButton = {
    id: 'menu-button',
    title: 'MenuButton',
    desc: <p><code>MenuButton</code> works with a {menuLink} and controls its open and close.</p>,
    rows: [
        ...styleProps('menu button', <ul><li><code>open: bool</code> indicates if the menu is open.</li></ul>),
        {
            name: 'disabled',
            type: 'boolean',
            desc: <p>Set <code>true</code> to disabled the menu button.</p>
        },
        {
            name: 'children',
            type: 'node',
            desc: 'Contents of the menu button.'
        },
    ]
};

const menuHeader = {
    id: 'menu-header',
    title: 'MenuHeader',
    desc: <p><code>MenuHeader</code> can be used to provide a presentational information for a group of related menu items.</p>,
    rows: [
        ...styleProps('menu header'),
        {
            name: 'children',
            type: 'node',
            desc: 'Contents of the menu header. Can be anything that is usually for presentational purpose and not supposed to receive focus.'
        },
    ]
};

const menuDivider = {
    id: 'menu-divider',
    title: 'MenuDivider',
    desc: <p><code>MenuDivider</code> can be used to make a group of related menu items visually separated from other items.
    It has <code>aria</code> roles that can be recognised by assistive technologies. If you need to put
    something presentational in a menu, use a {menuHeaderLink} instead.</p>,
    rows: [
        ...styleProps('menu divider')
    ]
};

const menuRadioGroup = {
    id: 'radio-group',
    title: 'MenuRadioGroup',
    desc:
        <>
            <p><code>MenuRadioGroup</code> is a container of menu items which are similar to radio buttons.</p>
            <p>All menu items under a <code>MenuRadioGroup</code> are in the same radio group and
            have <code>type="radio"</code>. It's <strong>unnecessary</strong> to manually set the property. </p>
        </>,
    rows: [
        ...styleProps('radio group'),
        {
            name: 'aria-label',
            type: 'string',
            desc:
                <>
                    <p>Sets <code>aria-label</code> attribute on the radio group DOM element.</p>
                    <p>If not provided, it will be set as the value of <code>name</code> prop, or the default 'Radio group'.</p>
                </>
        },
        {
            name: 'name',
            type: 'string',
            desc:
                <>
                    <p>Sets the radio group name (optional).</p>
                    <p>The name will be passed to the <code>onChange</code> event. It's useful for
                    identifying radio groups if you attach the same event handler to multiple groups.</p>
                </>
        },
        {
            name: 'value',
            type: 'any',
            desc:
                <>
                    <p>Sets value of the radio group.</p>
                    <p>The children menu item which has the same value (strict equality ===)
                        as the radio group is marked as checked.</p>
                </>
        },
        {
            name: 'children',
            type: 'node',
            desc: <p>The only permitted children is <code>MenuItem</code>.</p>
        },
        {
            name: 'onChange',
            type: 'function',
            desc:
                <>
                    <p>Event fired when a children menu item is clicked (selected).</p>
                    <p>Event object properties:</p>
                    <ul>
                        <li><code>name: string</code> the name prop passed to the <code>MenuRadioGroup</code> on which this event occurred.</li>
                        <li><code>value: any</code> the value prop passed to the <code>MenuItem</code> being clicked.</li>
                        <li><code>keyCode: number</code> indicates the key code if click is triggered by keyboard.
                        Can be <code>{RETURN_KEY}</code> or <code>{SPACE_KEY}</code>.</li>
                    </ul>
                </>
        }
    ]
};

const controlledMenu = {
    id: 'controlled-menu',
    title: 'ControlledMenu',
    desc:
        <>
            <p><code>ControlledMenu</code> is a top-level component that contains menu items and other lower level submenus.</p>
            <p>It's different from a {menuLink} that <code>ControlledMenu</code> allows you to control how and when
            a menu is open or closed, rather than controlled by a menu button.</p>
            <p>For example, you might need to open a menu when something on the page is hovered by a mouse, or
            you need to position the menu to something other than the menu button. <code>ControlledMenu</code> can
            be also use to implement a <Link to={'/#context-menu'}>context menu</Link>.</p>
            <p>When using <code>ControlledMenu</code>, it's your job to set focus to the desirable item after menu opens
            and move focus back to your menu button after it closes, which can be done by setting <code>menuItemFocus</code>, and in
            the <code>onClose</code> event, respectively. However, depending on your requirements, both of them might be optional.</p>
        </>,
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
                    <p><em>Use this prop only for context menu.</em> See an <Link to={'/#context-menu'}>example</Link>.</p>
                    <p>An object describes viewport coordinates to which context menu will be positioned.</p>
                    <p>It's an object with the shape of <code>{'{ x: number, y: number }'}</code>.</p>
                </>
        },
        {
            name: 'anchorRef',
            type: 'object',
            desc:
                <>
                    <p>A ref object attached to a DOM element to which menu will be positioned. <em>Not needed for context menu.</em></p>
                    <p>Supports ref created by <code>React.createRef</code> or <code>useRef</code> Hook.
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
                        Recommend using this prop with {menuStateHookLink}.</p>
                </>
        },
        {
            name: 'menuItemFocus',
            type: 'object',
            desc:
                <>
                    <p>Sets which menu item receives focus (hover) when menu opens.</p>
                    <p>You will usually set this prop when the menu is opened by keyboard events.
                        Recommend using this prop with {menuStateHookLink}.</p>
                    <p>It's an object with the shape of <code>{'{ position: string }'}</code>. The <code>position</code> can be one of the following values:</p>
                    <ul>
                        <li><code>'initial'</code> don't set focus.</li>
                        <li><code>'first'</code> focus the first item in the menu.</li>
                        <li><code>'last'</code> focus the last item in the menu.</li>
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
                        <li><code>reason: string</code> The reason that causes the close event.
                        Can be 'click', 'cancel', or 'blur'.</li>
                        <li><code>keyCode: number</code> indicates the key code if event is triggered by keyboard.
                        Can be <code>{RETURN_KEY}, {SPACE_KEY}</code> or <code>{ESC_KEY}</code>.</li>
                    </ul>
                </>
        }
    ]
};

const menuStateHook = {
    id: 'use-menu-state',
    title: 'useMenuState',
    desc:
        <>
            <p><code>useMenuState</code> is a custom Hook that helps manage the states of {controlledMenuLink}.</p>
            <p>The Hook returns several states which are used by <code>ControlledMenu</code> and can be spread to its props. See an <Link to={'/#use-menu-state'}>example</Link>.</p>
            <p>It accepts a boolean parameter <code>keepMounted</code>. If <code>true</code>, menu keeps
            mounted in the DOM and is hidden by CSS when it's closed. Otherwise, menu is unmounted from DOM when closed. The default value is <code>true</code>.</p>
            <p>It returns an object with the following properties:</p>
            <ul>
                <li><code>isMounted: bool</code></li>
                <li><code>isOpen: bool</code></li>
                <li><code>menuItemFocus: bool</code> see {controlledMenuLink} for more details of these properties.</li>
                <li><code>openMenu: function</code> accepts 'initial', 'first', or 'last'.
                <br />E.g. <code>openMenu('first')</code> will open menu and set focus to the first menu item.</li>
                <li><code>closeMenu: function</code></li>
                <li><code>toggleMenu: function</code> accepts the same parameter as <code>openMenu</code>.</li>
            </ul>
            <p>Using this Hook can take advantage of lazily creating menu and its descendent items, which means menu is
            not created and mounted into DOM until it's opened for the first time.
            The {menuLink} component uses this hook internally to manage its states.</p>
        </>
};

const keyboard = {
    id: 'keyboard',
    title: 'Keyboard',
    desc:
        <>
            <p><LibName /> supports the following keyboard interactions:</p>
            <h3>Menu</h3>
            <ul className="keyboard">
                <li><span>Return</span> activates a menu item and closes the menu.</li>
                <li><span>Space</span> activates a menu item and closes the menu; for radio and checkbox item, activates the menu item without closing the menu.</li>
                <li><span>Down Arrow</span> moves focus to the next item, wrapping from the last to the first.</li>
                <li><span>Up Arrow</span> moves focus to the previous item, wrapping from the first to the last.</li>
                <li><span>Right Arrow</span> When focus is in a submenu item, opens the submenu.</li>
                <li><span>Left Arrow</span> Closes a submenu if it is open.</li>
                <li><span>Esc</span> Closes a menu and move focus to its associated menu button.</li>
            </ul>
            <h3>MenuButton</h3>
            <ul className="keyboard">
                <li><span>Return | Space</span> opens the associated menu.</li>
                <li><span>Down Arrow</span> opens the associated menu and moves focus to the first menu item.</li>
                <li><span>Up Arrow</span> opens the associated menu and moves focus to the last menu item.</li>
            </ul>
        </>
}

const components = {
    id: 'components',
    title: 'Components',
    list: [
        menu,
        menuItem,
        menuButton,
        submenu,
        menuRadioGroup,
        menuHeader,
        menuDivider,
        controlledMenu
    ]
};

const hooks = {
    id: 'hooks',
    title: 'Hooks',
    list: [
        menuStateHook,
    ]
};

const accessibility = {
    id: 'accessibility',
    title: 'Accessibility',
    desc:
        <p><LibName /> supports <code>aria</code> roles, states, and properties which aims to fully comply with
            the <ARIAPracticesLink />. For more details, please refer to the website.</p>,
    list: [
        keyboard
    ]
};

export default [components, hooks, accessibility];
