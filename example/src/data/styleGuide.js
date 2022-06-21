/* eslint-disable react/no-unescaped-entities, react/jsx-key */
import Link from 'next/link';
import {
  menuContainerSelector,
  menuButtonSelector,
  menuSelector,
  menuArrowSelector,
  menuItemSelector,
  menuDividerSelector,
  menuHeaderSelector,
  menuGroupSelector,
  radioGroupSelector,
  submenuSelector
} from '@szhsin/react-menu/style-utils';
import { LibName } from '../components/LibName';
import { ExternalLink } from '../components/ExternalLink';
import { StyleExamples } from '../components/StyleExamples';

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
                Includes minimal and mostly functional styles (positioning, arrow, reset). This is
                usually a starting point for customising styles.
              </p>
              <p>
                You may import this file or copy the CSS into your own stylesheets or CSS-in-JS
                solution, and optionally remove styles you don't use (e.g. the arrows).
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
              name: menuContainerSelector.name,
              desc: 'Root element that contains the menu.'
            },
            {
              name: menuSelector.name,
              desc: 'Menu element.'
            },
            {
              name: (
                <ul>
                  <li>{menuSelector.stateOpening}</li>
                  <li>{menuSelector.stateOpen}</li>
                  <li>{menuSelector.stateClosing}</li>
                  <li>{menuSelector.stateClosed}</li>
                </ul>
              ),
              desc: 'Menu state.'
            },
            {
              name: (
                <ul>
                  <li>{menuSelector.dirLeft}</li>
                  <li>{menuSelector.dirRight}</li>
                  <li>{menuSelector.dirTop}</li>
                  <li>{menuSelector.dirBottom}</li>
                </ul>
              ),
              desc: 'Direction in which the menu expands.'
            },
            {
              name: menuArrowSelector.name,
              desc: 'Menu arrow element.'
            },
            {
              name: (
                <ul>
                  <li>{menuArrowSelector.dirLeft}</li>
                  <li>{menuArrowSelector.dirRight}</li>
                  <li>{menuArrowSelector.dirTop}</li>
                  <li>{menuArrowSelector.dirBottom}</li>
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
              name: menuItemSelector.name,
              desc: 'Menu item element.'
            },
            {
              name: menuItemSelector.hover,
              desc: 'Menu item is hovered and focused.'
            },
            {
              name: menuItemSelector.disabled,
              desc: 'Menu item is disabled.'
            },
            {
              name: menuItemSelector.anchor,
              desc: 'Menu item is a URL link.'
            },
            {
              name: menuItemSelector.checked,
              desc: 'Menu item is checked (only for a radio or checkbox item).'
            },
            {
              name: (
                <ul>
                  <li>{menuItemSelector.typeRadio}</li>
                  <li>{menuItemSelector.typeCheckbox}</li>
                </ul>
              ),
              desc: 'Menu item is a radio or checkbox item.'
            },
            {
              name: menuItemSelector.focusable,
              desc: (
                <p>
                  Always present on a <code>FocusableItem</code>.
                </p>
              )
            },
            {
              name: menuItemSelector.submenu,
              desc: (
                <p>
                  Always present on a submenu item, which is set by the <code>label</code> prop on
                  SubMenu component.
                </p>
              )
            },
            {
              name: menuItemSelector.open,
              desc: "Present on a submenu item when it's submenu is open."
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
              name: submenuSelector.name,
              desc: 'SubMenu container element.'
            },
            {
              name: menuDividerSelector.name,
              desc: 'MenuDivider element.'
            },
            {
              name: menuHeaderSelector.name,
              desc: 'MenuHeader element.'
            },
            {
              name: menuGroupSelector.name,
              desc: 'MenuGroup element.'
            },
            {
              name: radioGroupSelector.name,
              desc: 'MenuRadioGroup element.'
            },
            {
              name: menuButtonSelector.name,
              desc: 'MenuButton element.'
            },
            {
              name: menuButtonSelector.open,
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
      optional but highly recommended. There are <Link href={'/#styling'}>some examples</Link>{' '}
      demonstrating its usage.
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
        <code>{menuSelector.name}</code> selector.
      </p>
      <p>
        E.g., set <code>z-index</code> to 1000:
      </p>
      <pre>
        <code className="hljs">
          {`${menuSelector.name} {
  z-index: 1000;
}`}
        </code>
      </pre>
    </>
  ]
};

const styleGuide = [stylesheet, selectors, styleUtils, zIndex];
export default styleGuide;
