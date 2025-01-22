/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { LibName } from '../components/LibName';
import { ExternalLink } from '../components/ExternalLink';

const ENTER_KEY = "'Enter'";
const SPACE_KEY = "' '(Space)";
const ESC_KEY = "'Escape'";

const menuLink = <Link href={'#menu'}>Menu</Link>;
const menuButtonLink = <Link href={'#menu-button'}>MenuButton</Link>;
const controlledMenuLink = <Link href={'#controlled-menu'}>ControlledMenu</Link>;

const propsTable = {
  heading: <h3>Props</h3>,
  contentType: 'table',
  sorting: {
    key: 'name'
  },
  head: [
    {
      key: 'name',
      value: 'Name'
    },
    {
      key: 'type',
      value: 'Type'
    },
    {
      key: 'defaultVal',
      value: 'Default'
    },
    {
      key: 'desc',
      value: 'Description'
    }
  ]
};

const dirModifier = (
  <li>
    <code>dir: string</code> computed direction in which the menu expands. Can be 'left', 'right',
    'top', or 'bottom'.
  </li>
);

const syntheticEventProp = (
  <li>
    <code>syntheticEvent: MouseEvent | KeyboardEvent</code> DOM event object (React synthetic event)
  </li>
);

const keepOpenEventProp = (
  <li>
    <code>keepOpen: bool</code> set this property on event object to control whether to keep menu
    open after menu item is activated. Leaving it <code>undefined</code> will behave in accordance
    with WAI-ARIA Authoring Practices. See a{' '}
    <ExternalLink href="https://codesandbox.io/s/react-menu-keepopen-dzscw">
      CodeSandbox example
    </ExternalLink>{' '}
    for its usage.
  </li>
);

const stopPropagationEventProp = (
  <li>
    <code>stopPropagation: bool</code> setting this property on event object to <code>true</code>{' '}
    will skip <code>onItemClick</code> event on root menu component.
  </li>
);

const refObjectDesc = (
  <p>
    Supports <code>ref</code> created by <code>React.createRef</code> or <code>useRef</code> Hook,
    or an object of <code>{'{ current: { getBoundingClientRect(): DOMRect } }'}</code>. Doesn't
    support callback ref.
  </p>
);

const menuModifiers = (
  <ul>
    <li>
      <code>state: string</code> indicates the state of menu. Can be 'opening', 'open', 'closing',
      'closed'.
    </li>
    <li>
      <code>align: string</code> alignment of menu with anchor element. Can be 'start', 'center', or
      'end'.
    </li>
    {dirModifier}
  </ul>
);

const submenuItemModifiers = (
  <ul>
    <li>
      <code>open: bool</code> indicates if the submenu is open.
    </li>
    <li>
      <code>hover: bool</code> indicates if the submenu item is being hovered and has focus.
    </li>
    <li>
      <code>disabled: bool</code> indicates if the submenu and item are disabled.
    </li>
  </ul>
);

const menuItemModifiers = (
  <ul>
    <li>
      <code>hover: bool</code> indicates if the menu item is being hovered and has focus.
    </li>
    <li>
      <code>checked: bool</code> indicates if the menu item is checked when it's a radio or checkbox
      item.
    </li>
    <li>
      <code>disabled: bool</code> indicates if the menu item is disabled.
    </li>
    <li>
      <code>anchor: bool</code> indicates if the menu item has a URL link.
    </li>
    <li>
      <code>type: string</code> 'radio' in radio item, 'checkbox' in checkbox item, or{' '}
      <code>undefined</code> in other items.
    </li>
  </ul>
);

const onClickEventObject = (
  <>
    <p>Event object properties:</p>
    <ul>
      <li>
        <code>value: any</code> the value prop passed to the <code>MenuItem</code> being clicked.
        It's useful for helping identify which menu item is clicked.
      </li>
      <li>
        <code>key: string</code> indicates the key if click is triggered by keyboard. Can be{' '}
        {ENTER_KEY} or {SPACE_KEY}.
      </li>
      <li>
        <code>checked: bool</code> indicates if the menu item is checked, only for{' '}
        <code>MenuItem</code> <code>type="checkbox"</code>.
      </li>
      <li>
        <code>name: string</code> the <code>name</code> prop passed to the{' '}
        <code>MenuRadioGroup</code> when the menu item is in a radio group.
      </li>
      {keepOpenEventProp}
      {stopPropagationEventProp}
      {syntheticEventProp}
    </ul>
  </>
);

const styleProps = (target, modifiers, className) => [
  {
    name: className || 'className',
    type: 'string | function',
    desc: (
      <>
        <p>
          A string that will be appended to the <code>class</code> of <strong>{target}</strong> DOM
          element.
        </p>
        <p>
          When a function is provided, it will be called by passing an object with the following
          properties and should return a CSS class name.
        </p>
        {modifiers}
      </>
    )
  }
];

// Menu, SubMenu and ControlledMenu
const sharedMenuProps = [
  ...styleProps('menu', menuModifiers, 'menuClassName'),
  ...styleProps('menu arrow', <ul>{dirModifier}</ul>, 'arrowProps.className'),
  {
    name: 'menuStyle',
    type: 'CSSProperties',
    desc: (
      <p>
        This value is forwarded to the <code>style</code> prop of <strong>menu</strong> DOM element.
      </p>
    )
  },
  {
    name: 'arrow',
    type: 'boolean',
    desc: (
      <p>
        Set <code>true</code> to display an arrow pointing to its anchor element.
      </p>
    )
  },
  {
    name: 'arrowProps',
    type: 'object',
    desc: (
      <p>
        Properties of this object are spread to the menu <strong>arrow</strong> DOM element.
      </p>
    )
  },
  {
    name: 'gap',
    type: 'number',
    defaultVal: 0,
    desc: (
      <p>
        Add a gap (gutter) between menu and its anchor element. The value (in pixels) can be
        negative.
      </p>
    )
  },
  {
    name: 'shift',
    type: 'number',
    defaultVal: 0,
    desc: (
      <p>
        Shift menu's position away from its anchor element. The value (in pixels) can be negative.
      </p>
    )
  },
  {
    name: 'align',
    type: 'string',
    defaultVal: "'start'",
    desc: (
      <>
        <p>Can be 'start', 'center', or 'end'.</p>
        <p>It sets alignment of menu with anchor element.</p>
      </>
    )
  },
  {
    name: 'direction',
    type: 'string',
    defaultVal: "'bottom' or 'right' for SubMenu",
    desc: (
      <>
        <p>Can be 'left', 'right', 'top', or 'bottom'.</p>
        <p>It sets direction in which menu expands against anchor element.</p>
      </>
    )
  },
  {
    name: 'position',
    type: 'string',
    defaultVal: "'auto'",
    desc: (
      <>
        <p>It sets the position of menu related to its anchor element.</p>
        <ul>
          <li>
            <code>'auto'</code> menu position is adjusted to have it contained within the viewport,
            even if it will be detached from the anchor element. This option allows to display menu
            in the viewport as much as possible.
          </li>
          <li>
            <code>'anchor'</code> menu position is adjusted to have it contained within the
            viewport, but it will be kept attached to the edges of anchor element.
          </li>
          <li>
            <code>'initial'</code> menu always stays at its initial position.
          </li>
        </ul>
      </>
    )
  },
  {
    name: 'overflow',
    type: 'string',
    defaultVal: "'visible'",
    desc: (
      <>
        <p>Can be 'visible', 'auto', or 'hidden'.</p>
        <p>
          It makes the menu list scrollable or hidden when there is not enough viewport space to
          display all menu items. The value is similar to the CSS <code>overflow</code> property.
        </p>
      </>
    )
  },
  {
    name: 'setDownOverflow',
    type: 'boolean',
    desc: (
      <p>
        Set computed overflow amount down to a child <code>MenuGroup</code>. The{' '}
        <code>MenuGroup</code> should have <code>takeOverflow</code> prop set as <code>true</code>{' '}
        accordingly.
      </p>
    )
  },
  {
    name: 'children',
    type: 'node | function',
    desc: (
      <>
        <p>
          Menu items underneath the menu, or a function that returns them. The function will be
          called by passing an object with the following properties:
        </p>
        {menuModifiers}
      </>
    )
  }
];

// Menu and SubMenu
const uncontrolledMenuProps = [
  {
    name: 'instanceRef',
    type: 'React.Ref <MenuInstance>',
    desc: (
      <>
        <p>A ref which attaches to menu component and provides the follow methods:</p>
        <ul>
          <li>
            <code>
              openMenu: (position?: 'first' | 'last' | number, alwaysUpdate?: boolean) =&gt; void
            </code>{' '}
            open menu, optional request which menu item will be hovered.
          </li>
          <li>
            <code>closeMenu: () =&gt; void</code> close menu
          </li>
        </ul>
      </>
    )
  },
  {
    name: 'onMenuChange',
    type: 'function',
    desc: (
      <>
        <p>Event fired when menu states have changed.</p>
        <p>Event object properties:</p>
        <ul>
          <li>
            <code>open: bool</code> indicates if the menu is open.
          </li>
        </ul>
      </>
    )
  }
];

// Menu and ControlledMenu
const rootMenuProps = [
  ...sharedMenuProps,
  {
    name: 'transition',
    type: (
      <pre>{`boolean |
{
  open?: boolean;
  close?: boolean;
  item?: boolean;
}`}</pre>
    ),
    desc: (
      <>
        <p>
          Enable or disable transition effects in the <code>Menu</code>,<code>MenuItem</code>, and
          any descendent <code>SubMenu</code>.
        </p>
        <p>
          You can set 'open', 'close', 'item' at the same time with one boolean value or separately
          with an object.
        </p>
        <p>
          <em className="block">
            If you enable transition on menu, make sure to add{' '}
            <code>import '@szhsin/react-menu/dist/transitions/slide.css'</code>, or add your own
            animation styles, otherwise menu cannot be closed or have visible delay when closed.
          </em>
        </p>
      </>
    )
  },
  {
    name: 'transitionTimeout',
    type: 'number',
    defaultVal: '500',
    desc: (
      <p>
        A fallback timeout to stop transition if <code>onAnimationEnd</code> events are not fired.
      </p>
    )
  },
  {
    name: 'initialMounted',
    type: 'boolean',
    desc: (
      <p>
        By default menu isn't mounted into DOM until it's opened for the first time. Setting the
        prop to <code>true</code> will change this behaviour, which also enables menu and its items
        to be server rendered.
      </p>
    )
  },
  {
    name: 'unmountOnClose',
    type: 'boolean',
    desc: (
      <p>
        By default menu remains in DOM when it's closed. Setting the prop to <code>true</code> will
        change this behaviour.
      </p>
    )
  },
  {
    name: 'boundingBoxRef',
    type: 'object',
    desc: (
      <>
        <p>
          A ref object attached to a DOM element within which menu will be positioned. If not
          provided, the nearest ancestor which has CSS <code>overflow</code> set to a value other
          than 'visible' or the browser viewport will serve as the bounding box.
        </p>
        {refObjectDesc}
      </>
    )
  },
  {
    name: 'boundingBoxPadding',
    type: 'string',
    desc: (
      <p>
        Specify bounding box padding in pixels. Use a syntax similar to the CSS <code>padding</code>{' '}
        property but sizing units are discarded.
      </p>
    )
  },
  {
    name: 'containerProps',
    type: 'object',
    desc: <p>Properties of this object are spread to the root DOM element containing the menu.</p>
  },
  {
    name: 'reposition',
    type: 'string',
    defaultVal: "'auto'",
    desc: (
      <>
        <p>It specifies when menu is repositioned.</p>
        <ul>
          <li>
            <code>'initial'</code> Don't automatically reposition menu. Set to this value when you
            want to explicitly reposition menu using the <code>repositionFlag</code> prop.
          </li>
          <li>
            <code>'auto'</code> Reposition menu whenever itself or the anchor has changed in size,
            using the <code>ResizeObserver</code> API.
          </li>
        </ul>
      </>
    )
  },
  {
    name: 'repositionFlag',
    type: 'number | string',
    desc: (
      <>
        <p>
          Use this prop to explicitly reposition menu. Whenever the prop has a new value, menu
          position will be recalculated and updated. You might use a counter and increase it every
          time.
        </p>
        <p>
          <em className="block">
            Warning: don't update this prop in rapid succession, which is inefficient and might
            cause infinite rendering of component. E.g., don't change the value of this prop in{' '}
            <code>window scroll</code> event.
          </em>
        </p>
      </>
    )
  },
  {
    name: 'submenuCloseDelay',
    type: 'number',
    defaultVal: 150,
    desc: (
      <p>
        Set a delay in ms before closing a submenu when it's open and mouse is moving over other
        items in the parent menu list.
      </p>
    )
  },
  {
    name: 'submenuOpenDelay',
    type: 'number',
    defaultVal: 300,
    desc: <p>Set a delay in ms before opening a submenu when mouse moves over it.</p>
  },
  {
    name: 'viewScroll',
    type: 'string',
    defaultVal: "'initial'",
    desc: (
      <>
        <p>
          It sets the behaviour of menu and any of its descendent submenus when window is scrolling.
        </p>
        <ul>
          <li>
            <code>'initial'</code> The window scroll event is ignored and has no effect on menu.
          </li>
          <li>
            <code>'auto'</code> Menu will reposition itself based on the value of{' '}
            <code>position</code> prop when window is scrolling.
          </li>
          <li>
            <code>'close'</code> menu will be closed when window is scrolled.
          </li>
        </ul>
      </>
    )
  },
  {
    name: 'portal',
    type: (
      <pre>{`boolean |
{
  target?: Element;
  stablePosition?: boolean;
}`}</pre>
    ),
    desc: (
      <>
        <p>
          If <code>true</code>, menu is rendered as a direct child of <code>document.body</code>, or
          you can specify a target element in the DOM as menu container.
        </p>
        <ul>
          <li>
            <code>target</code> specify a DOM node under which menu will be rendered.
          </li>
          <li>
            <code>stablePosition</code> when <code>target</code> is null, setting this value{' '}
            <code>true</code> prevents menu from rendering into the DOM hierarchy of its parent
            component.
          </li>
        </ul>
        <p>
          Portal allows menu to visually “break out” of its container. Typical use cases may
          include:
        </p>
        <ul>
          <li>
            An ancestor container is positioned and CSS <code>overflow</code>is set to a value other
            than <code>visible</code>.
          </li>
          <li>
            You have a DOM structure that creates a complex hierarchy of stacking contexts, and menu
            is overlapped regardless of <code>z-index</code>value.
          </li>
        </ul>
        <p>Note: portal breaks tab sequence and may impact the accessibility of your website.</p>
      </>
    )
  },
  {
    name: 'theming',
    type: 'string',
    desc: (
      <p>
        It sets a CSS <code>class</code> on the container element of menu for theming purpose. E.g.,
        'dark' will add <code>szh-menu-container--theme-dark</code>.
      </p>
    )
  },
  {
    name: 'onItemClick',
    type: 'function',
    desc: (
      <>
        <p>Event fired when descendent menu items are clicked.</p>
        {onClickEventObject}
      </>
    )
  }
];

const menu = {
  id: 'menu',
  title: 'Menu',
  contents: [
    <>
      <p>
        <code>Menu</code> is a top-level component that contains menu items and other lower level
        submenus.
      </p>
      <p>
        Working with a {menuButtonLink} or a compatible button component, <code>Menu</code> manages
        states which controls the display of its contents and maintains focus among its descendants.
      </p>
      <p>
        It should be able to serve the majority of use cases. If you need more controls on how and
        when a menu is open or closed, you might use a {controlledMenuLink}.
      </p>
    </>,
    {
      ...propsTable,
      rows: [
        ...rootMenuProps,
        ...uncontrolledMenuProps,
        {
          name: 'aria-label',
          type: 'string',
          desc: (
            <>
              <p>
                Sets <code>aria-label</code> attribute on the menu DOM element.
              </p>
              <p>
                If not provided, one will be generated from the string content of menu button, or
                the default 'Menu'.
              </p>
            </>
          )
        },
        {
          name: 'menuButton',
          type: 'element | function',
          desc: (
            <>
              <p>
                Can be a {menuButtonLink}, a <code>button</code> element, or a React component.
              </p>
              <p>
                It also accepts a function that returns one of the above. The function will be
                called by passing an object with the following properties:
              </p>
              <ul>
                <li>
                  <code>open: bool</code> indicates if the menu is open.
                </li>
              </ul>
              <p>
                If a React component is provided, it needs to implement the following contracts:
              </p>
              <ul>
                <li>
                  <span>Accepts a </span>
                  <code>ref</code> prop that is forwarded to the element to which menu will be
                  positioned. The element should be able to receive focus.
                </li>
                <li>
                  <span>Accepts </span>
                  <code>onClick</code> and <code>onKeyDown</code> event props.
                </li>
              </ul>
              <p>
                Please note {menuButtonLink} has one additional benefit that it has managed{' '}
                <code>aria-haspopup</code> and <code>aria-expanded</code> attributes. When using a{' '}
                <code>button</code> element or your own React component, it's your job to set these{' '}
                <code>aria</code> attributes if you need correct accessibility support.
              </p>
            </>
          )
        }
      ]
    }
  ]
};

const menuItem = {
  id: 'menu-item',
  title: 'MenuItem',
  contents: [
    <>
      <p>
        <code>MenuItem</code> represents an item under a menu which can be activated.
      </p>
      <p>
        It can be a regular menu item, a checkbox item (<code>type="checkbox"</code>), a radio item
        (<code>type="radio"</code>).
      </p>
    </>,
    {
      ...propsTable,
      rows: [
        ...styleProps('menu item', menuItemModifiers),
        {
          name: 'value',
          type: 'any',
          desc: (
            <>
              <p>
                Any value provided to this prop will be available in the event object of click
                events.
              </p>
              <p>
                It's useful for helping identify which menu item is clicked when you listen the{' '}
                <code>onItemClick</code> event on root menu component.
              </p>
            </>
          )
        },
        {
          name: 'href',
          type: 'string',
          desc: 'If provided, menu item renders an HTML <a> element with this href attribute.'
        },
        {
          name: 'type',
          type: 'string',
          desc: (
            <p>Set this prop to 'checkbox' or 'radio' to make it a checkbox or radio menu item.</p>
          )
        },
        {
          name: 'checked',
          type: 'boolean',
          desc: (
            <p>
              Set <code>true</code> if a checkbox menu item is checked. Please note radio menu item
              doesn't use this prop.
            </p>
          )
        },
        {
          name: 'disabled',
          type: 'boolean',
          desc: (
            <p>
              Set <code>true</code> to disable the menu item.
            </p>
          )
        },
        {
          name: 'children',
          type: 'node | function',
          desc: (
            <>
              <p>
                Contents of the menu item, or a function that returns it. The function will be
                called by passing an object with the following properties:
              </p>
              {menuItemModifiers}
            </>
          )
        },
        {
          name: 'onClick',
          type: 'function',
          desc: (
            <>
              <p>Event fired when the menu item is clicked.</p>
              {onClickEventObject}
            </>
          )
        }
      ]
    }
  ]
};

const submenu = {
  id: 'submenu',
  title: 'SubMenu',
  contents: [
    <>
      <p>
        <code>SubMenu</code> is a menu container under other menu or submenu components.
      </p>
      <p>
        It consists of a menu item and a sub-level menu containing submenu items. Use{' '}
        <code>label</code> prop to set its own contents, and place the submenu items it contains in
        the <code>children</code> prop.
      </p>
    </>,
    {
      ...propsTable,
      rows: [
        ...styleProps('submenu item', submenuItemModifiers, 'itemProps.className'),
        ...sharedMenuProps,
        ...uncontrolledMenuProps,
        {
          name: 'aria-label',
          type: 'string',
          desc: (
            <>
              <p>
                Sets <code>aria-label</code> attribute on the submenu DOM element.
              </p>
              <p>
                If not provided, one will be generated from the string content of <code>label</code>{' '}
                prop, or the default 'Submenu'.
              </p>
            </>
          )
        },
        {
          name: 'disabled',
          type: 'boolean',
          desc: (
            <p>
              Set <code>true</code> to disable the submenu item (and the submenu).
            </p>
          )
        },
        {
          name: 'label',
          type: 'node | function',
          desc: (
            <>
              <p>
                Contents of the submenu item, or a function that returns it. The function will be
                called by passing an object with the following properties:
              </p>
              {submenuItemModifiers}
            </>
          )
        },
        {
          name: 'openTrigger',
          type: "undefined | 'none' | 'clickOnly'",
          desc: (
            <ul>
              <li>
                <code>undefined</code> submenu opens when the label item is hovered or clicked. This
                is the default behaviour.
              </li>
              <li>
                <code>'clickOnly'</code> submenu opens when the label item is clicked.
              </li>
              <li>
                <code>'none'</code> submenu doesn't open with mouse or keyboard events; you can call
                the <code>openMenu</code> function on <code>instanceRef</code> to open submenu
                programmatically.
              </li>
            </ul>
          )
        },
        {
          name: 'itemProps',
          type: 'object',
          desc: <p>Properties of this object are spread to the submenu item DOM element.</p>
        }
      ]
    }
  ]
};

const menuButton = {
  id: 'menu-button',
  title: 'MenuButton',
  contents: [
    <p key={0}>
      <code>MenuButton</code> works with a {menuLink} and controls its open and close.
    </p>,
    {
      ...propsTable,
      rows: [
        ...styleProps(
          'menu button',
          <ul>
            <li>
              <code>open: bool</code> indicates if the menu is open.
            </li>
          </ul>
        ),
        {
          name: 'disabled',
          type: 'boolean',
          desc: (
            <p>
              Set <code>true</code> to disable the menu button.
            </p>
          )
        },
        {
          name: 'children',
          type: 'node',
          desc: 'Contents of the menu button.'
        }
      ]
    }
  ]
};

const menuHeader = {
  id: 'menu-header',
  title: 'MenuHeader',
  contents: [
    <p key={0}>
      <code>MenuHeader</code> can be used to provide presentational information for a group of
      related menu items.
    </p>
  ]
};

const menuDivider = {
  id: 'menu-divider',
  title: 'MenuDivider',
  contents: [
    <p key={0}>
      <code>MenuDivider</code> can be used to make a group of related menu items visually separated
      from other items. It has <code>aria</code> roles that can be recognised by assistive
      technologies.
    </p>
  ]
};

const menuGroup = {
  id: 'menu-group',
  title: 'MenuGroup',
  contents: [
    <p key={0}>
      <code>MenuGroup</code> is used to wrap a subset of related menu items and make them
      scrollable.
    </p>,
    {
      ...propsTable,
      rows: [
        {
          name: 'takeOverflow',
          type: 'boolean',
          desc: (
            <p>
              Set <code>true</code> to apply overflow of the parent menu to the group. Only one{' '}
              <code>MenuGroup</code> in a menu should set this prop as <code>true</code>.
            </p>
          )
        }
      ]
    }
  ]
};

const menuRadioGroup = {
  id: 'radio-group',
  title: 'MenuRadioGroup',
  contents: [
    <p key={0}>
      <code>MenuRadioGroup</code> is a container of menu items which are similar to radio buttons.
    </p>,
    {
      ...propsTable,
      rows: [
        {
          name: 'aria-label',
          type: 'string',
          desc: (
            <>
              <p>
                Sets <code>aria-label</code> attribute on the radio group DOM element.
              </p>
              <p>
                If not provided, it will be set as the value of <code>name</code> prop, or the
                default 'Radio group'.
              </p>
            </>
          )
        },
        {
          name: 'name',
          type: 'string',
          desc: (
            <>
              <p>Sets the radio group name (optional).</p>
              <p>
                The name will be passed to the <code>onRadioChange</code> event. It's useful for
                identifying radio groups if you attach the same event handler to multiple groups.
              </p>
            </>
          )
        },
        {
          name: 'value',
          type: 'any',
          desc: (
            <>
              <p>Sets value of the radio group.</p>
              <p>
                The child menu item which has the same value (strict equality ===) as the radio
                group is marked as checked.
              </p>
            </>
          )
        },
        {
          name: 'children',
          type: 'node',
          desc: (
            <p>
              The only permitted children is <code>MenuItem</code>.
            </p>
          )
        },
        {
          name: 'onRadioChange',
          type: 'function',
          desc: (
            <>
              <p>Event fired when a child menu item is clicked (selected).</p>
              <p>Event object properties:</p>
              <ul>
                <li>
                  <code>name: string</code> the <code>name</code> prop passed to the{' '}
                  <code>MenuRadioGroup</code> on which this event occurred.
                </li>
                <li>
                  <code>value: any</code> the value prop passed to the <code>MenuItem</code> being
                  clicked.
                </li>
                <li>
                  <code>key: string</code> indicates the key if click is triggered by keyboard. Can
                  be {ENTER_KEY} or {SPACE_KEY}.
                </li>
                {keepOpenEventProp}
                {stopPropagationEventProp}
                {syntheticEventProp}
              </ul>
            </>
          )
        }
      ]
    }
  ]
};

const focusableItem = {
  id: 'focusable-item',
  title: 'FocusableItem',
  contents: [
    <p key={0}>
      <code>FocusableItem</code> can be used to wrap focusable element (input, button) in a menu
      item. It manages focus automatically among other menu items during mouse and keyboard
      interactions.
    </p>,
    {
      ...propsTable,
      rows: [
        ...styleProps(
          'focusable item',
          <ul>
            <li>
              <code>focusable: bool</code> always <code>true</code> for a focusable item.
            </li>
            <li>
              <code>hover: bool</code> indicates if the focusable item is being hovered.
            </li>
            <li>
              <code>disabled: bool</code> indicates if the focusable item is disabled.
            </li>
          </ul>
        ),
        {
          name: 'disabled',
          type: 'boolean',
          desc: (
            <>
              <p>
                Set <code>true</code> to disable the item.
              </p>
              <p>
                Please note this prop only removes the current item from mouse and keyboard
                interaction sequences. You still need to disable any focusable element which you
                have supplied in its children. This prop is passed to the <code>children</code>{' '}
                render function.
              </p>
            </>
          )
        },
        {
          name: 'children',
          type: 'function',
          desc: (
            <>
              <p>
                A function which returns what to be rendered. It will be called by passing an object
                with the following properties:
              </p>
              <ul>
                <li>
                  <code>hover: bool</code> indicates if the focusable item is being hovered.
                </li>
                <li>
                  <code>disabled: bool</code> indicates if the focusable item is disabled.
                </li>
                <li>
                  <code>ref: object</code> A ref to be attached to the element which should receive
                  focus when this focusable item is hovered. <br />
                  If you render a React component, it needs to expose a <code>focus</code> method or
                  implement ref forwarding.
                </li>
                <li>
                  <code>closeMenu: func</code> A function that requests to close the root menu. You
                  could optionally pass a <code>key</code> parameter to indicate which key initiates
                  the close request.
                </li>
              </ul>
            </>
          )
        }
      ]
    }
  ]
};

const controlledMenu = {
  id: 'controlled-menu',
  title: 'ControlledMenu',
  contents: [
    <>
      <p>
        <code>ControlledMenu</code> is a top-level component that contains menu items and other
        lower level submenus.
      </p>
      <p>
        It's different from a {menuLink} that <code>ControlledMenu</code> allows you to control how
        and when a menu is open or closed, rather than controlled by a menu button.
      </p>
      <p>
        For example, you might need to open a menu when something on the page is hovered by a mouse,
        or you need to position the menu to something other than the menu button.{' '}
        <code>ControlledMenu</code> can be also use to implement a{' '}
        <Link href={'/#context-menu'}>context menu</Link>.
      </p>
      <p>
        When using <code>ControlledMenu</code>, it's your job to set focus to the desirable item
        after menu opens and move focus back to your menu button after it closes, which can be done
        by setting <code>menuItemFocus</code>, and in the <code>onClose</code> event, respectively.
        However, depending on your requirements, both of them might be optional.
      </p>
    </>,
    {
      ...propsTable,
      rows: [
        ...rootMenuProps,
        {
          name: 'aria-label',
          type: 'string',
          desc: (
            <>
              <p>
                Sets <code>aria-label</code> attribute on the menu DOM element.
              </p>
              <p>If not provided, it will be set as 'Menu'.</p>
            </>
          )
        },
        {
          name: 'anchorPoint',
          type: 'object',
          desc: (
            <>
              <p>
                <em>Use this prop only for context menu.</em> See an{' '}
                <Link href={'/#context-menu'}>example</Link>.
              </p>
              <p>
                An object describes viewport coordinates to which context menu will be positioned.
              </p>
              <p>
                It's an object with the shape of <code>{'{ x: number, y: number }'}</code>.
              </p>
            </>
          )
        },
        {
          name: 'anchorRef',
          type: 'object',
          desc: (
            <>
              <p>
                <em>Not needed for context menu.</em>
              </p>
              <p>A ref object attached to a DOM element to which menu will be positioned.</p>
              {refObjectDesc}
            </>
          )
        },
        {
          name: 'captureFocus',
          type: 'boolean',
          defaultVal: 'true',
          desc: (
            <p>
              If <code>true</code>, the menu list element will gain focus after menu is open.
            </p>
          )
        },
        {
          name: 'state',
          type: 'string',
          desc: (
            <p>
              Controls the state of menu: <code>'opening' | 'open' | 'closing' | 'closed'</code>.
              When the value is undefined, menu will be unmounted from DOM.
            </p>
          )
        },
        {
          name: 'menuItemFocus',
          type: 'object',
          desc: (
            <>
              <p>Sets which menu item receives focus (hover) when menu opens.</p>
              <p>You will usually set this prop when the menu is opened by keyboard events.</p>
              <p>It's an object with the shape of:</p>
              <pre>
                <code className="hljs">{`{
    position?: 'first' | 'last' | number;
    alwaysUpdate?: boolean;
}`}</code>
              </pre>
              <p>
                The <code>position</code> can be one of the following values:
              </p>
              <ul>
                <li>
                  <code>'first'</code> focus the first item in the menu.
                </li>
                <li>
                  <code>'last'</code> focus the last item in the menu.
                </li>
                <li>
                  <code>number</code> focus item at the specific position.
                </li>
              </ul>
              <p>
                <em className="block">
                  If you don't intend to update focus (hover) position, it's important to keep this
                  prop's identity stable when your component re-renders.
                </em>
              </p>
            </>
          )
        },
        {
          name: 'onClose',
          type: 'function',
          desc: (
            <>
              <p>Event fired when menu is about to close.</p>
              <p>Event object properties:</p>
              <ul>
                <li>
                  <code>reason: string</code> the reason that causes the close event. Can be
                  'click', 'cancel', 'blur', or 'scroll'.
                </li>
                <li>
                  <code>value: any</code> the value prop passed to the <code>MenuItem</code> being
                  clicked.
                </li>
                <li>
                  <code>key: string</code> indicates the key if event is triggered by keyboard. Can
                  be {ENTER_KEY}, {SPACE_KEY} or {ESC_KEY}.
                </li>
              </ul>
            </>
          )
        }
      ]
    }
  ]
};

const menuStateHook = {
  id: 'use-menu-state',
  title: 'useMenuState',
  contents: [
    <>
      <p>
        <code>useMenuState</code> is a custom Hook that helps manage the states of{' '}
        {controlledMenuLink}.
      </p>
      <p>
        The Hook returns several states which are used by <code>ControlledMenu</code> and can be
        spread to its props. See an <Link href={'/#use-menu-state'}>example</Link>.
      </p>
      <pre>
        <code className="hljs">{`function useMenuState(options?: {
    initialOpen?: boolean;
    initialMounted?: boolean;
    unmountOnClose?: boolean;
    transition?: boolean | {
        open?: boolean;
        close?: boolean;
        item?: boolean;
    };
    transitionTimeout?: number;
    onMenuChange?: (event: { open: boolean }) => void;
}): [
  // Menu props object which can be spread to <ControlledMenu/>
  {
    state?: 'opening' | 'open' | 'closing' | 'closed';
    endTransition: () => void;
  },
  // toggleMenu function
  (open?: boolean) => void
];`}</code>
      </pre>
      <p>
        The hook function options are the same as props on <code>Menu</code> component.
      </p>
      <p>
        <code>toggleMenu</code>:
      </p>
      <ul>
        <li>
          If no parameter is supplied, this function will toggle state between open and close
          phases.
        </li>
        <li>You can set a boolean parameter to explicitly switch into one of the two phases.</li>
      </ul>
      <p>The {menuLink} component uses this hook internally to manage its states.</p>
    </>
  ]
};

const useClick = {
  id: 'use-click',
  title: 'useClick',
  contents: [
    <>
      <p>
        <code>useClick</code> hook can be used with {controlledMenuLink} to create a toggle menu
        which has a similar experience to the <code>Menu</code> component.
      </p>
      <p>
        The Hook returns an object with props which can be spread to the anchor element. See an{' '}
        <Link href={'/#controlling-state'}>example</Link>.
      </p>
    </>
  ]
};

const useHover = {
  id: 'use-hover',
  title: 'useHover',
  contents: [
    <>
      <p>
        <code>useHover</code> hook can be used with {controlledMenuLink} to create a hover menu.
      </p>
      <p>
        The Hook returns an object with <code>anchorProps</code> and <code>hoverProps</code>, which
        can be spread to the anchor element and menu, respectively. See an{' '}
        <Link href={'/#hover-menu'}>example</Link>.
      </p>
    </>
  ]
};

const keyboard = {
  id: 'keyboard',
  title: 'Keyboard',
  contents: [
    <>
      <p>
        <LibName /> supports the following keyboard interactions:
      </p>
      <h3>Menu</h3>
      <ul className="keyboard">
        <li>
          <span>Return</span> activates a menu item and closes the menu.
        </li>
        <li>
          <span>Space</span> activates a menu item and closes the menu; for radio and checkbox item,
          activates the menu item without closing the menu.
        </li>
        <li>
          <span>Down Arrow</span> moves focus to the next item, wrapping from the last to the first.
        </li>
        <li>
          <span>Up Arrow</span> moves focus to the previous item, wrapping from the first to the
          last.
        </li>
        <li>
          <span>Home</span> moves focus to the first item.
        </li>
        <li>
          <span>End</span> moves focus to the last item.
        </li>
        <li>
          <span>Esc</span> Closes a menu and move focus to its associated menu button.
        </li>
        <li>
          <span>Left Arrow</span> Closes a submenu if it is open.
        </li>
        <li>
          <span>Return | Space | Right Arrow</span> When focus is in a submenu item, opens the
          submenu, and moves focus to the first menu item.
        </li>
      </ul>
      <h3>MenuButton</h3>
      <ul className="keyboard">
        <li>
          <span>Return | Space | Down Arrow</span> opens the associated menu and moves focus to the
          first menu item.
        </li>
        <li>
          <span>Up Arrow</span> opens the associated menu and moves focus to the last menu item.
        </li>
      </ul>
    </>
  ]
};

const components = {
  id: 'components',
  title: 'Components',
  list: [
    menu,
    menuItem,
    menuButton,
    focusableItem,
    submenu,
    menuRadioGroup,
    menuGroup,
    menuHeader,
    menuDivider,
    controlledMenu
  ]
};

const hooks = {
  id: 'hooks',
  title: 'Hooks',
  list: [menuStateHook, useClick, useHover]
};

const accessibility = {
  id: 'accessibility',
  title: 'Accessibility',
  contents: [
    <p key={0}>
      <LibName /> implements WAI-ARIA roles, states, and properties which adhere to the{' '}
      <ExternalLink href="https://www.w3.org/WAI/ARIA/apg/patterns/menu/">
        WAI-ARIA Authoring Practices
      </ExternalLink>
      . For more details, please refer to the website.
    </p>
  ],
  list: [keyboard]
};

const documentation = [components, hooks, accessibility];
export default documentation;
