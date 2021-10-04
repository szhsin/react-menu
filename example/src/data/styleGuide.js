/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { LibName } from '../components/LibName';
import { HashLink as Link } from 'react-router-hash-link';


const bem = block => element => modifier => {
    let className = block;
    if (element) className += `__${element}`;
    if (modifier) className += `--${modifier}`;
    return className;
}

const menuClass = bem('.szh-menu');
const menuArrowClass = menuClass('arrow');
const menuItemClass = menuClass('item');
const menuButtonClass = bem('.szh-menu-button');
const directions = ['left', 'right', 'top', 'bottom'];
const menuStates = ['opening', 'open', 'closing', 'closed'];

const selectorsTable = {
    contentType: 'table',
    head: [
        {
            key: 'name',
            value: 'CSS selectors'
        },
        {
            key: 'desc',
            value: 'Description'
        }
    ]
};

const stylesheet = {
    id: 'stylesheets',
    title: 'Style Sheets',
    contents: [
        <>
            <p><LibName /> uses regular CSS to style components. It follows
                the <a href="http://getbem.com/naming/" target="_blank" rel="noopener noreferrer">BEM methodology</a> to name CSS selectors.
                You are able to override the default styles by placing your style sheets after its own. All default styles use CSS selectors
                with the lowest possible specificity, and you could always precede your selectors
                with <code>.szh-menu-container</code> in case a specific style cannot be overridden.</p>
            <p><LibName /> comes with the following CSS files:</p>
        </>,
        {
            contentType: 'table',
            head: [
                {
                    key: 'name',
                    value: 'File'
                },
                {
                    key: 'desc',
                    value: 'Description'
                }
            ],
            rows: [
                {
                    name: 'index.css',
                    desc: 'Default styles.'
                },
                {
                    name: 'theme-dark.css',
                    desc:
                        <>
                            <p>Includes dark theme styles, working in conjunction with <code>index.css</code>.</p>
                            <p>Please see a <a href="https://codesandbox.io/s/react-menu-dark-theme-nmn2d" target="_blank" rel="noopener noreferrer">Codesandbox example</a> for how to enable dark theme for menu.</p>
                        </>
                },
                {
                    name: 'core.css',
                    desc:
                        <>
                            <p>Includes only essential styles that make menu functional (positioning, arrow display).
                                This is a good starting point for adding your own styles.</p>
                        </>
                },
                {
                    name: 'transitions/*.css',
                    desc:
                        <>
                            <p>Different transition animations when menu opens or closes. Currently there is only one as <code>slide.css</code>.</p>
                        </>
                }
            ]
        }
    ],

    list: [
        {
            id: 'menu',
            title: 'Menu and ControlledMenu',
            contents: [{
                ...selectorsTable,
                rows: [
                    {
                        name: '.szh-menu-container',
                        desc: 'Root element that contains the menu.'
                    },
                    {
                        name: menuClass()(),
                        desc: 'Menu element.'
                    },
                    {
                        name: <ul>
                            {
                                menuStates.map((state, i) =>
                                    <li key={i}>{menuClass()(`state-${state}`)}</li>)
                            }
                        </ul>,
                        desc: 'Menu state.'
                    },
                    {
                        name:
                            <ul>
                                {
                                    directions.map((dir, i) =>
                                        <li key={i}>{menuClass()(`dir-${dir}`)}</li>)
                                }
                            </ul>,
                        desc: 'Direction in which the menu expands.'
                    },
                    {
                        name: menuArrowClass(),
                        desc: 'Menu arrow element.'
                    },
                    {
                        name:
                            <ul>
                                {
                                    directions.map((dir, i) =>
                                        <li key={i}>{menuArrowClass(`dir-${dir}`)}</li>)
                                }
                            </ul>,
                        desc: 'Direction in which the menu expands (arrow points to the opposite direction).'
                    }
                ]
            }]
        },

        {
            id: 'menu-item',
            title: 'MenuItem',
            contents: [{
                ...selectorsTable,
                rows: [
                    {
                        name: menuItemClass(),
                        desc: 'Menu item element.'
                    },
                    {
                        name: menuItemClass('hover'),
                        desc: 'Menu item is hovered and focused.'
                    },
                    {
                        name: menuItemClass('active'),
                        desc: 'Menu item is active (pressed).'
                    },
                    {
                        name: menuItemClass('disabled'),
                        desc: 'Menu item is disabled.'
                    },
                    {
                        name: menuItemClass('anchor'),
                        desc: 'Menu item is a URL link.'
                    },
                    {
                        name: menuItemClass('checked'),
                        desc: 'Menu item is checked (only for a radio or checkbox item).'
                    },
                    {
                        name:
                            <ul>
                                <li>{menuItemClass('type-radio')}</li>
                                <li>{menuItemClass('type-checkbox')}</li>
                            </ul>,
                        desc: 'Menu item is a radio or checkbox item.'
                    },
                    {
                        name: menuItemClass('focusable'),
                        desc: <p>Always present on a <code>FocusableItem</code>.</p>
                    }
                ]
            }]
        },

        {
            id: 'others',
            title: 'Other components',
            contents: [{
                ...selectorsTable,
                rows: [
                    {
                        name: menuClass('submenu')(),
                        desc: 'SubMenu container element.'
                    },
                    {
                        name: menuItemClass('open'),
                        desc: 'SubMenu (item) is open.'
                    },
                    {
                        name: menuClass('divider')(),
                        desc: 'MenuDivider element.'
                    },
                    {
                        name: menuClass('header')(),
                        desc: 'MenuHeader element.'
                    },
                    {
                        name: menuClass('group')(),
                        desc: 'MenuGroup element.'
                    },
                    {
                        name: menuClass('radio-group')(),
                        desc: 'MenuRadioGroup element.'
                    },
                    {
                        name: menuButtonClass()(),
                        desc: 'MenuButton element.'
                    },
                    {
                        name: menuButtonClass()('open'),
                        desc: 'Menu controlled by the button is open.'
                    }
                ]
            }]
        },

        {
            id: 'z-index',
            title: 'z-index',
            contents: [
                <>
                    <p><LibName /> has a default <code>z-index</code> of 100 for positioned menu.
                        If this value is not appropriate for your app, you could adjust it by overriding
                        the <code>{menuClass()()}</code> selector.</p>
                    <p>E.g., set <code>z-index</code> to 1000:</p>
                    <pre><code className="hljs">
                        {`${menuClass()()} {
    z-index: 1000;
}`}
                    </code></pre>
                </>
            ]
        }
    ]
};

const classNameProp = {
    id: 'class-name',
    title: 'className prop',
    contents: [
        <>
            <p>This prop can be used to style a specific menu in the page differently. Also, projects
                using <b>CSS Module</b> can use this prop to add locally scoped class names.
            </p>
            <p>Every component accepts <code>className</code> props which allow you to supply a custom CSS class.</p>
            <p>Optionally, you may pass a function to the prop and receive additional states about the component.</p>
            <p>For more details, please refer to the <code>className</code> prop under
                each <Link to={'/docs#menu'}>component</Link>, or see
                an <Link to={'/#classname-prop'}>example</Link> for its usage.</p>
        </>
    ]
}

const stylesSample = `{
    color: 'green',
    hover: {
        color: 'red'
    },
    type: {
        radio: {
            color: 'blue'
        },
        checkbox: {
            color: 'black'
        }
    }
}`;

const stylesProp = {
    id: 'styles',
    title: 'styles prop',
    contents: [
        <>
            <p>This is another prop that can be used to style a specific menu in the page differently.</p>
            <p>Every component accepts <code>styles</code> props as an object which allow you to add inline styles.
                Regular styles are put in the object directly just like React's <code>style</code> prop, and styles which
                are only applied to specific component states are written in nested objects under corresponding keys.</p>
            <p>For example:</p>
            <pre><code className="hljs">{stylesSample}</code></pre>
            <p><LibName /> will flatten the styles object by applying the properties from top to bottom,
                with later properties overriding earlier ones of the same name.</p>
            <p>Optionally, you may pass a function to the prop and receive states about the component.</p>
            <p>For more details, please refer to the <code>styles</code> prop under
                each <Link to={'/docs#menu'}>component</Link>, or see
                an <Link to={'/#styles-prop'}>example</Link> for its usage.</p>
        </>
    ]
}

const styleGuide = [stylesheet, classNameProp, stylesProp];
export default styleGuide;
