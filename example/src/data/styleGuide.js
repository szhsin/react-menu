/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { LibName } from '../components/LibName';
import { ExternalLink } from '../components/ExternalLink';
import { StyleExamples } from '../components/StyleExamples';

const bem = (block) => (element) => (modifier) => {
  let className = block;
  if (element) className += `__${element}`;
  if (modifier) className += `--${modifier}`;
  return className;
};

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
      value: 'Selector name'
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
    <p>
      <LibName /> comes with the following CSS files in the <code>dist</code> folder:
    </p>,
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
          name: 'core.css',
          desc: (
            <>
              <p>
                Includes only necessary styles that make menu functional (positioning, arrow
                display). This is usually a starting point for customising styles.
              </p>
              <p>
                If you still think that's too much and contains things you don't need (e.g. the
                arrows), feel free to copy the stuff you just need into your code, and don't import
                any css file from <LibName />.
              </p>
            </>
          )
        },
        {
          name: 'index.css',
          desc: 'Default styles.'
        },
        {
          name: 'theme-dark.css',
          desc: (
            <>
              <p>
                Includes dark theme styles, working in conjunction with <code>index.css</code>.
              </p>
              <p>
                Please see a{' '}
                <ExternalLink href="https://codesandbox.io/s/react-menu-dark-theme-nmn2d">
                  CodeSandbox example
                </ExternalLink>{' '}
                for how to enable dark theme for menu.
              </p>
            </>
          )
        },
        {
          name: 'transitions/*.css',
          desc: (
            <>
              <p>
                Different transition animations when menu opens or closes. Currently there is only
                one as <code>slide.css</code>.
              </p>
            </>
          )
        }
      ]
    },
    <p>The following CodeSandbox examples help you get started with customising styles:</p>,
    <StyleExamples />
  ]
};

const selectors = {
  id: 'selectors',
  title: 'CSS selectors',
  contents: [
    <p>
      <LibName /> follows the{' '}
      <ExternalLink href="http://getbem.com/naming/">BEM methodology</ExternalLink> to name CSS
      selectors. All default styles use CSS selectors with the lowest possible specificity.
    </p>
  ],
  list: [
    {
      id: 'menu',
      title: 'Menu and ControlledMenu',
      contents: [
        {
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
              name: (
                <ul>
                  {menuStates.map((state, i) => (
                    <li key={i}>{menuClass()(`state-${state}`)}</li>
                  ))}
                </ul>
              ),
              desc: 'Menu state.'
            },
            {
              name: (
                <ul>
                  {directions.map((dir, i) => (
                    <li key={i}>{menuClass()(`dir-${dir}`)}</li>
                  ))}
                </ul>
              ),
              desc: 'Direction in which the menu expands.'
            },
            {
              name: menuArrowClass(),
              desc: 'Menu arrow element.'
            },
            {
              name: (
                <ul>
                  {directions.map((dir, i) => (
                    <li key={i}>{menuArrowClass(`dir-${dir}`)}</li>
                  ))}
                </ul>
              ),
              desc: 'Direction in which the menu expands (arrow points to the opposite direction).'
            }
          ]
        }
      ]
    },

    {
      id: 'menu-item',
      title: 'MenuItem',
      contents: [
        {
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
              name: (
                <ul>
                  <li>{menuItemClass('type-radio')}</li>
                  <li>{menuItemClass('type-checkbox')}</li>
                </ul>
              ),
              desc: 'Menu item is a radio or checkbox item.'
            },
            {
              name: menuItemClass('focusable'),
              desc: (
                <p>
                  Always present on a <code>FocusableItem</code>.
                </p>
              )
            }
          ]
        }
      ]
    },

    {
      id: 'others',
      title: 'Other components',
      contents: [
        {
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
        }
      ]
    }
  ]
};

const styleUtils = {
  id: 'style-utils',
  title: 'style-utils',
  contents: [
    <p>
      <code>style-utils</code> helps you write CSS selectors more easily with CSS-in-JS. Using it is
      optional but highly recommended. There are{' '}
      <Link to={'/#customised-style'}>some examples</Link> demonstrating its usage.
    </p>
  ]
};

const zIndex = {
  id: 'z-index',
  title: 'z-index',
  contents: [
    <>
      <p>
        <LibName /> has a default <code>z-index</code> of 100 for positioned menu. If this value is
        not appropriate for your app, you could adjust it by overriding the{' '}
        <code>{menuClass()()}</code> selector.
      </p>
      <p>
        E.g., set <code>z-index</code> to 1000:
      </p>
      <pre>
        <code className="hljs">
          {`${menuClass()()} {
  z-index: 1000;
}`}
        </code>
      </pre>
    </>
  ]
};

const styleGuide = [stylesheet, selectors, styleUtils, zIndex];
export default styleGuide;
