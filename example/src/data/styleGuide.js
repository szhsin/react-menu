import React from 'react';


const bem = block => element => modifier => {
    let className = block;
    if (element) className += `__${element}`;
    if (modifier) className += `--${modifier}`;
    return className;
}

const menuClass = bem('.rc-menu');
const menuItemClass = menuClass('item');

export const stylesheet = {
    id: 'stylesheets',
    title: 'Stylesheets',
    desc:
        <p><b>rc-menu</b> uses regular stylesheets to style components. It follows
         the <a href="http://getbem.com/naming/" target="_blank" rel="noopener noreferrer">BEM methodology</a> to name CSS selectors.
         You are able to overwrite the default styles by placing your stylesheets after its own. All default styles use CSS selectors
         with the lowest possible specificity, and you could always precede your selectors
         with <code>.rc-menu-container</code> in case a specific style cannot be overwritten.</p>,
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
