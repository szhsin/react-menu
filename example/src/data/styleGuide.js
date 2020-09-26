import React from 'react';
import { LibName } from '../components/LibName';
import { HashLink as Link } from 'react-router-hash-link';


const bem = block => element => modifier => {
    let className = block;
    if (element) className += `__${element}`;
    if (modifier) className += `--${modifier}`;
    return className;
}

const menuClass = bem('.rc-menu');
const menuItemClass = menuClass('item');

const stylesheet = {
    id: 'stylesheets',
    title: 'Stylesheets',
    desc:
        <>
            <p><LibName /> uses regular stylesheets to style components. It follows
         the <a href="http://getbem.com/naming/" target="_blank" rel="noopener noreferrer">BEM methodology</a> to name CSS selectors.
         You are able to overwrite the default styles by placing your stylesheets after its own. All default styles use CSS selectors
         with the lowest possible specificity, and you could always precede your selectors
         with <code>.rc-menu-container</code> in case a specific style cannot be overwritten.</p>
            <p><em>Using stylesheets is the most efficient and recommended approach to style</em> <LibName />.</p>
        </>,
    list: [
        {
            id: 'menu',
            title: 'Menu and ControlledMenu',
            rows: [
                {
                    name: '.rc-menu-container',
                    desc: 'Root element that contains the menu.'
                },
                {
                    name: menuClass()(),
                    desc: 'Menu element.'
                },
                {
                    name: menuClass()('open'),
                    desc: 'Menu is open.'
                },
                {
                    name: menuClass()('animation'),
                    desc: 'Animation is enabled.'
                },
                {
                    name:
                        <ul>
                            <li>{menuClass()('dir-left')}</li>
                            <li>{menuClass()('dir-right')}</li>
                            <li>{menuClass()('dir-top')}</li>
                            <li>{menuClass()('dir-bottom')}</li>
                        </ul>,
                    desc: 'Direction in which the menu expands.'
                }
            ]
        },

        {
            id: 'menu-item',
            title: 'MenuItem',
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
                }
            ]
        },

        {
            id: 'others',
            title: 'Other components',
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
                    name: menuClass('radio-group')(),
                    desc: 'MenuRadioGroup element.'
                }
            ]
        }
    ]
};

const classNameProp = {
    id: 'class-name',
    title: 'className prop',
    desc:
        <>
            <p>This approach can be used to style a specific menu in the page differently.</p>
            <p>Every component accepts a <code>className</code> prop which allows you to supply a custom CSS class.</p>
            <p>Optionally, you may pass a function to the prop and receive additional states about the component.</p>
            <p>For more details, please refer to the <code>className</code> prop under
                each <Link to={'/documentation#menu'}>component</Link>, or see
                an <Link to={'/#classname-prop'}>example</Link> for its usage.</p>
        </>
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
    desc:
        <>
            <p>This is another approach that can be used to style a specific menu in the page differently.</p>
            <p>Every component accepts a <code>styles</code> prop as an object which allows you to add inline styles.
            Regular styles are put in the object directly just like React's <code>style</code> prop, and styles which
            are only applied to specific component states are written in nested objects under corresponding keys.</p>
            <p>E.g. <code>{stylesSample}</code>. </p>
            <p><LibName /> will flatten the styles object by applying the properties from top to bottom,
            with latter properties overriding former ones of the same name.</p>
            <p>Optionally, you may pass a function to the prop and receive states about the component.</p>
            <p>For more details, please refer to the <code>styles</code> prop under
                each <Link to={'/documentation#menu'}>component</Link>, or see
                an <Link to={'/#styles-prop'}>example</Link> for its usage.</p>
        </>
}

export default [stylesheet, classNameProp, stylesProp];
