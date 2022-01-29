/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Link from 'next/link';
import { LibName } from '../components/LibName';
import { StyleExamples } from '../components/StyleExamples';
import { ExternalLink } from '../components/ExternalLink';

const menuItemLink = <Link href={'/docs#menu-item'}>MenuItem</Link>;
const menuButtonLink = <Link href={'/docs#menu-button'}>MenuButton</Link>;
const menuStateHookLink = <Link href={'/docs#use-menu-state'}>useMenuState</Link>;

export const basicMenu = {
  id: 'basic-menu',

  title: 'Basic menu',

  desc: (
    <p>
      The most basic menu consists of several <code>MenuItem</code>s wrapped in a <code>Menu</code>,
      and is controlled by a <code>MenuButton</code>.
    </p>
  ),

  source: `<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuItem>Close Window</MenuItem>
</Menu>`,

  fullSource: `import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export default function Example() {
    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>} transition>
            <MenuItem>New File</MenuItem>
            <MenuItem>Save</MenuItem>
            <MenuItem>Close Window</MenuItem>
        </Menu>
    );
}`
};

export const subMenu = {
  id: 'submenu',

  title: 'Submenu',

  desc: (
    <p>
      <code>SubMenu</code> can be placed in a <code>Menu</code> and has its own{' '}
      <code>MenuItem</code>s as children. You might also create nested submenus under a submenu.
    </p>
  ),

  source: `<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
    <MenuItem>New File</MenuItem>
    <SubMenu label="Open">
        <MenuItem>index.html</MenuItem>
        <MenuItem>example.js</MenuItem>
        <SubMenu label="Styles">
            <MenuItem>about.css</MenuItem>
            <MenuItem>home.css</MenuItem>
            <MenuItem>index.css</MenuItem>
        </SubMenu>
    </SubMenu>
    <MenuItem>Save</MenuItem>
</Menu>`,

  fullSource: `import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
            <MenuItem>New File</MenuItem>
            <SubMenu label="Open">
                <MenuItem>index.html</MenuItem>
                <MenuItem>example.js</MenuItem>
                <SubMenu label="Styles">
                    <MenuItem>about.css</MenuItem>
                    <MenuItem>home.css</MenuItem>
                    <MenuItem>index.css</MenuItem>
                </SubMenu>
            </SubMenu>
            <MenuItem>Save</MenuItem>
        </Menu>
    );
}`
};

export const eventHandling = {
  id: 'event-handling',

  title: 'Event handling',

  desc: (
    <>
      <p>
        When a menu item is activated, the <code>onClick</code> event fires on menu item. Unless you
        set <code>stopPropagation</code> of event object to true, the <code>onItemClick</code> of
        root menu component will then fires.
      </p>
      <p>For details of the event object, please refer to {menuItemLink}.</p>
    </>
  ),

  source: `const [text, setText] = useState('');

const handleMenuClick = e => {
    setText(t => t + \`[Menu] \${e.value} clicked\\n\\n\`);
};

const handleFileClick = e => {
    setText(t => t + \`[MenuItem] \${e.value} clicked\\n\`);
};

const handleSaveClick = e => {
    setText(t => t + \`[MenuItem] \${e.value} clicked\\n\\n\`);
    e.stopPropagation = true;
};

<div>
    <Menu menuButton={<MenuButton>Open menu</MenuButton>}
        onItemClick={handleMenuClick}>

        <MenuItem value="File" onClick={handleFileClick}>
            File
        </MenuItem>

        <MenuItem value="Save" onClick={handleSaveClick}>
            Save
        </MenuItem>

        <MenuItem value="Close">Close</MenuItem>
    </Menu>

    <button onClick={() => setText('')}>
        Clear
    </button>
</div>

<textarea readOnly ref={ref} value={text} />`,

  fullSource: `import React, { useRef, useState, useLayoutEffect } from 'react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    const ref = useRef(null);
    const [text, setText] = useState('');

    const handleMenuClick = e => {
        setText(t => t + \`[Menu] \${e.value} clicked\\n\\n\`);
    };

    const handleFileClick = e => {
        setText(t => t + \`[MenuItem] \${e.value} clicked\\n\`);
    };

    const handleSaveClick = e => {
        setText(t => t + \`[MenuItem] \${e.value} clicked\\n\\n\`);
        e.stopPropagation = true;
    };

    useLayoutEffect(() => {
        ref.current.scrollTop = ref.current.scrollHeight;
    }, [text]);

    return (
        <>
            <div>
                <Menu menuButton={<MenuButton>Open menu</MenuButton>}
                    onItemClick={handleMenuClick}>

                    <MenuItem value="File" onClick={handleFileClick}>
                        File
                    </MenuItem>

                    <MenuItem value="Save" onClick={handleSaveClick}>
                        Save
                    </MenuItem>

                    <MenuItem value="Close">Close</MenuItem>
                </Menu>

                <button onClick={() => setText('')}>
                    Clear
                </button>
            </div>

            <textarea readOnly ref={ref} value={text} />
        </>
    );
}`
};

export const radioGroup = {
  id: 'radio-group',

  title: 'Radio group',

  desc: (
    <p>
      You could make menu items behave like radio buttons by wrapping them in a{' '}
      <code>MenuRadioGroup</code>. The child menu item which has the same value (strict equality
      ===) as the radio group is marked as checked.
    </p>
  ),

  source: `const [textColor, setTextColor] = useState('red');

<Menu menuButton={<MenuButton>Text color</MenuButton>}>
    <MenuRadioGroup value={textColor}
        onRadioChange={e => setTextColor(e.value)}>
        <MenuItem value="red">Red</MenuItem>
        <MenuItem value="green">Green</MenuItem>
        <MenuItem value="blue">Blue</MenuItem>
    </MenuRadioGroup>
</Menu>`,

  fullSource: `import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    MenuRadioGroup
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    const [textColor, setTextColor] = useState('red');

    return (
        <>
            <Menu menuButton={<MenuButton>Text color</MenuButton>}>
                <MenuRadioGroup value={textColor}
                    onRadioChange={e => setTextColor(e.value)}>
                    <MenuItem value="red">Red</MenuItem>
                    <MenuItem value="green">Green</MenuItem>
                    <MenuItem value="blue">Blue</MenuItem>
                </MenuRadioGroup>
            </Menu>

            <div className="sample-text"
                style={{ color: textColor }}>
                Sample text
            </div>
        </>
    );
}`
};

export const checkBox = {
  id: 'checkbox',

  title: 'Checkbox',

  desc: (
    <p>
      You could make menu items behave like checkboxes by setting <code>type="checkbox"</code>.
    </p>
  ),

  source: `const [isBold, setBold] = useState(true);
const [isItalic, setItalic] = useState(true);
const [isUnderline, setUnderline] = useState(false);

<Menu menuButton={<MenuButton>Text style</MenuButton>}>
    <MenuItem type="checkbox" checked={isBold}
        onClick={e => setBold(e.checked)}>
        Bold
    </MenuItem>
    <MenuItem type="checkbox" checked={isItalic}
        onClick={e => setItalic(e.checked)}>
        Italic
    </MenuItem>
    <MenuItem type="checkbox" checked={isUnderline}
        onClick={e => setUnderline(e.checked)}>
        Underline
    </MenuItem>
</Menu>`,

  fullSource: `import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    const [isBold, setBold] = useState(true);
    const [isItalic, setItalic] = useState(true);
    const [isUnderline, setUnderline] = useState(false);

    return (
        <>
            <Menu menuButton={<MenuButton>Text style</MenuButton>}>
                <MenuItem type="checkbox" checked={isBold}
                    onClick={e => setBold(e.checked)}>
                    Bold
                </MenuItem>
                <MenuItem type="checkbox" checked={isItalic}
                    onClick={e => setItalic(e.checked)}>
                    Italic
                </MenuItem>
                <MenuItem type="checkbox" checked={isUnderline}
                    onClick={e => setUnderline(e.checked)}>
                    Underline
                </MenuItem>
            </Menu>

            <div className="sample-text" style={{
                fontWeight: isBold ? 'bold' : 'initial',
                fontStyle: isItalic ? 'italic' : 'initial',
                textDecoration: isUnderline ? 'underline' : 'initial'
            }}>Sample text</div>
        </>
    );
}`
};

export const headerAndDivider = {
  id: 'header-divider',

  title: 'Header and divider',

  desc: (
    <p>
      You could use <code>MenuHeader</code> and <code>MenuDivider</code> to group related menu
      items.
    </p>
  ),

  source: `<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuItem>Close Window</MenuItem>
    <MenuDivider />
    <MenuHeader>Edit</MenuHeader>
    <MenuItem>Cut</MenuItem>
    <MenuItem>Copy</MenuItem>
    <MenuItem>Paste</MenuItem>
    <MenuDivider />
    <MenuItem>Print</MenuItem>
</Menu>`,

  fullSource: `import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    MenuHeader,
    MenuDivider
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {

    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
            <MenuItem>New File</MenuItem>
            <MenuItem>Save</MenuItem>
            <MenuItem>Close Window</MenuItem>
            <MenuDivider />
            <MenuHeader>Edit</MenuHeader>
            <MenuItem>Cut</MenuItem>
            <MenuItem>Copy</MenuItem>
            <MenuItem>Paste</MenuItem>
            <MenuDivider />
            <MenuItem>Print</MenuItem>
        </Menu>
    );
}`
};

export const combined = {
  id: 'combined',

  title: 'Combined example',

  desc: <p>An example combines the usage of several components.</p>,

  fullSource: `import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    SubMenu,
    MenuHeader,
    MenuDivider,
    MenuRadioGroup
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {

    const [textColor, setTextColor] = useState('red');
    const [isBold, setBold] = useState(true);
    const [isItalic, setItalic] = useState(true);
    const [isUnderline, setUnderline] = useState(false);

    return (
        <>
            <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuDivider />
                <MenuHeader>Text settings</MenuHeader>

                <SubMenu label="Text color">
                    <MenuRadioGroup
                        value={textColor}
                        onRadioChange={e => setTextColor(e.value)}>
                        <MenuItem value={'red'}>Red</MenuItem>
                        <MenuItem value={'green'}>Green</MenuItem>
                        <MenuItem value={'blue'}>Blue</MenuItem>
                    </MenuRadioGroup>
                </SubMenu>

                <SubMenu label="Text style">
                    <MenuItem type="checkbox" checked={isBold}
                        onClick={e => setBold(e.checked)}>
                        Bold
                    </MenuItem>
                    <MenuItem type="checkbox" checked={isItalic}
                        onClick={e => setItalic(e.checked)}>
                        Italic
                    </MenuItem>
                    <MenuItem type="checkbox" checked={isUnderline}
                        onClick={e => setUnderline(e.checked)}>
                        Underline
                    </MenuItem>
                </SubMenu>
            </Menu>

            <div className="sample-text" style={{
                color: textColor,
                fontWeight: isBold ? 'bold' : 'initial',
                fontStyle: isItalic ? 'italic' : 'initial',
                textDecoration: isUnderline ? 'underline' : 'initial'
            }}>Sample text</div>
        </>
    );
}`
};

export const linkAndDisabled = {
  id: 'link-disabled',

  title: 'Link and disabled',

  desc: (
    <>
      <p>
        <code>MenuItem</code> can be made a hyperlink by giving it a <code>href</code> prop. Even if
        it's a link, the <code>onClick</code> event still fires as normal. You could also disable a
        menu item using the <code>disabled</code> prop.
      </p>
      <p>
        <strong>Note:</strong> the <code>href</code> prop is meant to be a redirect which causes
        browser to reload the document at the URL specified. If you want to prevent the reload or
        work with <strong>React Router</strong>, please see{' '}
        <ExternalLink href="https://codesandbox.io/s/react-menu-react-router-example-dw4ku">
          this exmaple
        </ExternalLink>
        .
      </p>
    </>
  ),

  source: `<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
    <MenuItem href="https://www.google.com/">Google</MenuItem>
    <MenuItem href="https://github.com/szhsin/react-menu/"
        target="_blank" rel="noopener noreferrer">
        GitHub (new window)
    </MenuItem>
    <MenuItem>Regular item</MenuItem>
    <MenuItem disabled>Disabled item</MenuItem>
</Menu>`,

  fullSource: `import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
            <MenuItem href="https://www.google.com/">Google</MenuItem>
            <MenuItem href="https://github.com/szhsin/react-menu/"
                target="_blank" rel="noopener noreferrer">
                GitHub (new window)
            </MenuItem>
            <MenuItem>Regular item</MenuItem>
            <MenuItem disabled>Disabled item</MenuItem>
        </Menu>
    );
}`
};

export const iconAndImage = {
  id: 'icon-image',

  title: 'Icon and image',

  desc: (
    <p>
      <LibName /> doesn't include any imagery. However, you are free to use your own or third-party
      icons and images, as you could wrap anything in a <code>MenuItem</code>. This example uses
      Google's Material icons.
    </p>
  ),

  source: `<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
    <MenuItem>
        <i className="material-icons">content_cut</i>Cut
    </MenuItem>
    <MenuItem>
        <i className="material-icons">content_copy</i>Copy
    </MenuItem>
    <MenuItem>
        <i className="material-icons">content_paste</i>Paste
    </MenuItem>
    <MenuDivider />
    <MenuItem href="https://github.com/szhsin/react-menu/">
        <img src="octocat.png" alt="" role="presentation" />GitHub
    </MenuItem>
</Menu>`,

  fullSource: `import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    MenuDivider
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
            <MenuItem>
                <i className="material-icons">content_cut</i>Cut
            </MenuItem>
            <MenuItem>
                <i className="material-icons">content_copy</i>Copy
            </MenuItem>
            <MenuItem>
                <i className="material-icons">content_paste</i>Paste
            </MenuItem>
            <MenuDivider />
            <MenuItem href="https://github.com/szhsin/react-menu/">
                <img src="octocat.png" alt="" role="presentation" />GitHub
            </MenuItem>
        </Menu>
    );
}`
};

export const focusableItem = {
  id: 'focusable-item',
  title: 'Focusable item',
  desc: (
    <>
      <p>
        <code>FocusableItem</code> is a special menu item. It's used to wrap elements which are able
        to receive focus, such as input or button.
      </p>
      <p>
        It receives a render prop as <code>children</code> and passes down a <code>ref</code> and
        several other states. This example demonstrates how to use an input element to filter menu
        items.
      </p>
    </>
  ),

  source: `const [filter, setFilter] = useState('');

<Menu menuButton={<MenuButton>Open menu</MenuButton>}
    onMenuChange={e => e.open && setFilter('')}>
    <FocusableItem>
        {({ ref }) => (
            <input ref={ref} type="text" placeholder="Type to filter"
                value={filter} onChange={e => setFilter(e.target.value)} />
        )}
    </FocusableItem>
    {
        ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Strawberry']
            .filter(fruit => fruit.toUpperCase()
                .includes(filter.trim().toUpperCase()))
            .map(fruit => <MenuItem key={fruit}>{fruit}</MenuItem>)
    }
</Menu>`,

  fullSource: `import React, { useState } from 'react';
import {
    Menu,
    MenuItem,
    FocusableItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';


export default function Example() {
    const [filter, setFilter] = useState('');

    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>}
            onMenuChange={e => e.open && setFilter('')}>
            <FocusableItem>
                {({ ref }) => (
                    <input ref={ref} type="text" placeholder="Type to filter"
                        value={filter} onChange={e => setFilter(e.target.value)} />
                )}
            </FocusableItem>
            {
                ['Apple', 'Banana', 'Blueberry', 'Cherry', 'Strawberry']
                    .filter(fruit => fruit.toUpperCase()
                        .includes(filter.trim().toUpperCase()))
                    .map(fruit => <MenuItem key={fruit}>{fruit}</MenuItem>)
            }
        </Menu>
    );
}`
};

export const hoverAndActive = {
  id: 'hover-active',

  title: 'Hover and active',

  desc: (
    <>
      <p>
        <code>MenuItem</code> manages a number of internal states such as 'hover' and 'active'. If
        you need to display different contents under different states, you are able to use{' '}
        <code>children</code> as a render prop and pass it a callback function.
      </p>
      <p>For more menu item states, please refer to {menuItemLink}.</p>
    </>
  ),

  source: `<Menu menuButton={<MenuButton>Open menu</MenuButton>}>
    <MenuItem>
        {({ hover, active }) =>
            active ? 'Pressed' : hover ? 'Press me' : 'Hover me'}
    </MenuItem>
    <MenuDivider />
    <MenuItem styles={{ justifyContent: 'center' }}>
        {({ hover, active }) =>
            <i className="material-icons md-48">
                {active ? 'sentiment_very_satisfied'
                    : hover ? 'sentiment_satisfied_alt'
                        : 'sentiment_very_dissatisfied'}
            </i>
        }
    </MenuItem>
</Menu>`,

  fullSource: `import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton,
    MenuDivider
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
            <MenuItem>
                {({ hover, active }) =>
                    active ? 'Pressed' : hover ? 'Press me' : 'Hover me'}
            </MenuItem>
            <MenuDivider />
            <MenuItem styles={{ justifyContent: 'center' }}>
                {({ hover, active }) =>
                    <i className="material-icons md-48">
                        {active ? 'sentiment_very_satisfied'
                            : hover ? 'sentiment_satisfied_alt'
                                : 'sentiment_very_dissatisfied'}
                    </i>
                }
            </MenuItem>
        </Menu>
    );
}`
};

export const openStateButton = {
  id: 'open-state',

  title: 'Menu open state',

  desc: (
    <p>
      If you need to change the contents of a menu button when the menu opens, you could use the{' '}
      <code>menuButton</code> as a render prop and pass it a callback function.
    </p>
  ),

  source: `<Menu menuButton={
    ({ open }) =>
        <MenuButton>{open ? 'Close' : 'Open'}</MenuButton>}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuItem>Close Window</MenuItem>
</Menu>`,

  fullSource: `import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    return (
        <Menu menuButton={
            ({ open }) =>
                <MenuButton>{open ? 'Close' : 'Open'}</MenuButton>}>
            <MenuItem>New File</MenuItem>
            <MenuItem>Save</MenuItem>
            <MenuItem>Close Window</MenuItem>
        </Menu>
    );
}`
};

export const customisedButton = {
  id: 'customised-btn',

  title: 'Customised button',

  desc: (
    <>
      <p>
        You are free to use a native button element with <code>Menu</code>, or use your own React
        button component which implements a forwarding ref and accepts <code>onClick</code> and{' '}
        <code>onKeyDown</code> event props.
      </p>
      <p>
        <code>Menu</code> also works well with popular React libraries, such as the{' '}
        <b>Material-UI</b>. See{' '}
        <ExternalLink href="https://codesandbox.io/s/react-menu-material-ui-example-wvzpc">
          an example on CodeSandbox
        </ExternalLink>
        .
      </p>
      <p>
        The benefit of using {menuButtonLink} is it has additional <code>aria</code> attributes.
      </p>
    </>
  ),

  source: `<Menu menuButton={
    <button className="btn-primary">Open menu</button>}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuItem>Close Window</MenuItem>
</Menu>`,

  fullSource: `import React from 'react';
import {
    Menu,
    MenuItem
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    return (
        <Menu menuButton={
            <button className="btn-primary">Open menu</button>}>
            <MenuItem>New File</MenuItem>
            <MenuItem>Save</MenuItem>
            <MenuItem>Close Window</MenuItem>
        </Menu>
    );
}`
};

export const placement = {
  id: 'menu-placement',

  title: 'Placement',

  desc: (
    <>
      <p>
        You can control the position of menu and how it behaves in response to window scroll event
        with the <code>align</code>, <code>direction</code>, <code>position</code>, and{' '}
        <code>viewScroll</code> props.
      </p>
      <p>
        Optionally, menu can be set to display an arrow pointing to its anchor element or add an
        offset using the <code>arrow</code>, <code>offsetX</code>, and <code>offsetY</code> props.
      </p>
    </>
  ),

  source: `const [display, setDisplay] = useState('arrow');
const [align, setAlign] = useState('center');
const [position, setPosition] = useState('anchor');
const [viewScroll, setViewScroll] = useState('auto');

const menus = ['right', 'top', 'bottom', 'left'].map(direction => (
    <Menu menuButton={<MenuButton>{direction}</MenuButton>}
        key={direction} direction={direction}
        align={align} position={position} viewScroll={viewScroll}
        arrow={display === 'arrow'}
        offsetX={display === 'offset' &&
            (direction === 'left' || direction === 'right')
            ? 12 : 0}
        offsetY={display === 'offset' &&
            (direction === 'top' || direction === 'bottom')
            ? 12 : 0}>

        {['Apple', 'Banana', 'Blueberry', 'Cherry', 'Strawberry']
            .map(fruit => <MenuItem key={fruit}>{fruit}</MenuItem>)}
    </Menu>
));`
};

export const overflow = {
  id: 'menu-overflow',

  title: 'Overflow',

  desc: (
    <>
      <p>
        When there isn't enough space for all menu items, you could use the <code>overflow</code>{' '}
        prop to make the menu list scrollable. The value of this prop is similar to the CSS overflow
        property.
      </p>
      <p>
        If you want to fix some items at the top or bottom, use a <code>MenuGroup</code> and add{' '}
        <code>takeOverflow</code> prop to make the group scrollable.
      </p>
    </>
  ),

  source: `const [overflow, setOverflow] = useState('auto');
const [position, setPosition] = useState('auto');
const [filter, setFilter] = useState('');

<Menu menuButton={<MenuButton>Overflow</MenuButton>}
    overflow={overflow} position={position}>
    {new Array(40).fill(0).map(
        (_, i) => <MenuItem key={i}>Item {i + 1}</MenuItem>)}
</Menu>

<Menu menuButton={<MenuButton>Grouping</MenuButton>}
    overflow={overflow} position={position} boundingBoxPadding="10"
    onMenuChange={e => e.open && setFilter('')}>
    <FocusableItem>
        {({ ref }) => (
            <input ref={ref} type="text" placeholder="Type a number"
                value={filter} onChange={e => setFilter(e.target.value)} />
        )}
    </FocusableItem>
    <MenuGroup takeOverflow>
        {new Array(40).fill(0)
            .map((_, i) => \`Item \${i + 1}\`)
            .filter(item => item.includes(filter.trim()))
            .map((item, i) => <MenuItem key={i}>{item}</MenuItem>)}
    </MenuGroup>
    <MenuItem>Last (fixed)</MenuItem>
</Menu>`
};

export const boundingBox = {
  id: 'bounding-box',

  title: 'Bounding box',

  desc: (
    <p>
      Normally menu positions itself within its nearest ancestor which has CSS <code>overflow</code>{' '}
      set to a value other than 'visible', or the browser viewport. Also, you can specify a
      container in the page as the bounding box for a menu using the <code>boundingBoxRef</code>{' '}
      prop. Menu will try to position itself within that container.
    </p>
  ),

  source: `const ref = useRef(null);
const leftAnchor = useRef(null);
const rightAnchor = useRef(null);
const { state, toggleMenu } = useMenuState();
useEffect(() => {
    toggleMenu(true);
}, [toggleMenu]);

const tooltipProps = {
    state,
    captureFocus: false,
    arrow: true,
    role: 'tooltip',
    align: 'center',
    viewScroll: 'auto',
    position: 'anchor',
    boundingBoxPadding: '1 8 1 1'
};

<div ref={ref}>
    <div ref={leftAnchor} />
    <ControlledMenu {...tooltipProps}
        anchorRef={leftAnchor} direction="top">
        I can flip if you scroll this block
    </ControlledMenu>

    <div ref={rightAnchor} />
    {/* explicitly set bounding box with the boundingBoxRef prop */}
    <ControlledMenu {...tooltipProps} boundingBoxRef={ref}
        anchorRef={rightAnchor} direction="right">
        I'm a tooltip built with React-Menu
    </ControlledMenu>
</div>`
};

export const managingState = {
  id: 'managing-state',

  title: 'Managing state',

  desc: (
    <>
      <p>
        In some use cases you may need to control how and when a menu is open or closed, e.g. when
        something is hovered. This can be implemented using a <code>ControlledMenu</code>.
      </p>
      <p>
        You need to provide at least a <code>state</code> prop, and a <code>ref</code> of an element
        to which menu will be positioned. You also need to update <code>state</code> in response to
        the <code>onClose</code> event.
      </p>
    </>
  ),

  source: `const ref = useRef(null);
const [state, setState] = useState();

<div ref={ref} onMouseEnter={() => setState('open')}>
    Hover to Open
</div>

<ControlledMenu state={state} anchorRef={ref}
    onMouseLeave={() => setState('closed')}
    onClose={() => setState('closed')}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuItem>Close Window</MenuItem>
</ControlledMenu>`,

  fullSource: `import React, { useState, useRef } from 'react';
import {
    ControlledMenu,
    MenuItem
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    const ref = useRef(null);
    const [state, setState] = useState();

    return (
        <>
            <div ref={ref} onMouseEnter={() => setState('open')}>
                Hover to Open
            </div>
            
            <ControlledMenu state={state} anchorRef={ref}
                onMouseLeave={() => setState('closed')}
                onClose={() => setState('closed')}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
            </ControlledMenu>
        </>
    );
}`
};

export const contextMenu = {
  id: 'context-menu',

  title: 'Context menu',

  desc: (
    <>
      <p>
        Context menu is implemented using a <code>ControlledMenu</code>.
      </p>
      <p>
        You need to provide an <code>anchorPoint</code> of viewport coordinates to which menu will
        be positioned.
      </p>
    </>
  ),

  source: `const { toggleMenu, ...menuProps } = useMenuState();
const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

<div onContextMenu={e => {
    e.preventDefault();
    setAnchorPoint({ x: e.clientX, y: e.clientY });
    toggleMenu(true);
}}>
    Right click to open context menu

    <ControlledMenu {...menuProps} anchorPoint={anchorPoint}
        onClose={() => toggleMenu(false)}>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
    </ControlledMenu>
</div >`,

  fullSource: `import React, { useState } from 'react';
import {
    ControlledMenu,
    MenuItem,
    useMenuState
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

export default function Example() {
    const { toggleMenu, ...menuProps } = useMenuState();
    const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

    return (
        <div onContextMenu={e => {
            e.preventDefault();
            setAnchorPoint({ x: e.clientX, y: e.clientY });
            toggleMenu(true);
        }}>
            Right click to open context menu

            <ControlledMenu {...menuProps} anchorPoint={anchorPoint}
                onClose={() => toggleMenu(false)}>
                <MenuItem>Cut</MenuItem>
                <MenuItem>Copy</MenuItem>
                <MenuItem>Paste</MenuItem>
            </ControlledMenu>
        </div >
    );
}`
};

export const menuStateHook = {
  id: 'use-menu-state',

  title: 'useMenuState',

  desc: (
    <>
      <p>
        <code>useMenuState</code> Hook works with <code>ControlledMenu</code> and help you manage
        the state transition/animation when menu opens and closes.
      </p>
      <p>Please see {menuStateHookLink} for more details.</p>
    </>
  ),

  source: `const ref = useRef(null);
const { toggleMenu, ...menuProps } = useMenuState({ transition: true });

<div ref={ref} onMouseEnter={() => toggleMenu(true)}>
    Hover to Open
</div>

<ControlledMenu {...menuProps} anchorRef={ref}
    onMouseLeave={() => toggleMenu(false)}
    onClose={() => toggleMenu(false)}>
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuItem>Close Window</MenuItem>
</ControlledMenu>`,

  fullSource: `import React, { useRef } from 'react';
import {
    ControlledMenu,
    MenuItem,
    useMenuState
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

export default function Example() {
    const ref = useRef(null);
    const { toggleMenu, ...menuProps } = useMenuState({ transition: true });

    return (
        <>
            <div ref={ref} onMouseEnter={() => toggleMenu(true)}>
                Hover to Open
            </div>

            <ControlledMenu {...menuProps} anchorRef={ref}
                onMouseLeave={() => toggleMenu(false)}
                onClose={() => toggleMenu(false)}>
                <MenuItem>New File</MenuItem>
                <MenuItem>Save</MenuItem>
                <MenuItem>Close Window</MenuItem>
            </ControlledMenu>
        </>
    );
}`
};

export const stylesProp = {
  id: 'styles-prop',

  title: 'styles prop',

  desc: (
    <>
      <p>
        You can apply your style by giving an object to the various <code>*styles</code> props.
        Regular styles are put in the object directly just like React's <code>style</code> prop, and
        styles which are only applied to specific component states are written in nested objects
        under corresponding keys. The <code>styles</code> object will be flattened by applying the
        properties from top to bottom, with later properties overriding earlier ones of the same
        name.
      </p>
      <p>Optionally, you may pass a function to the prop and receive states about the component.</p>
      <p>
        For more details about the state keys, please refer to the <code>*styles</code> props under
        each <Link href={'/docs#menu-item'}>component</Link>.
      </p>
    </>
  ),

  source: `// It's advisable to put styles object outside React component scope whenever possible.
const menuStyles = {
  border: '2px dashed green'
};

const menuItemStyles = {
  color: 'blue',
  backgroundColor: '#ee1',
  hover: {
    color: '#ee1',
    backgroundColor: '#bf4080'
  },
  active: {
    backgroundColor: '#333'
  }
};

<Menu menuButton={<MenuButton>Open menu</MenuButton>} menuStyles={menuStyles}>
  <MenuItem>New File</MenuItem>
  <MenuItem>Save</MenuItem>
  <MenuItem styles={menuItemStyles}>I'm special</MenuItem>
</Menu>`,

  fullSource: `import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

const menuStyles = {
  border: '2px dashed green'
};

const menuItemStyles = {
  color: 'blue',
  backgroundColor: '#ee1',
  hover: {
    color: '#ee1',
    backgroundColor: '#bf4080'
  },
  active: {
    backgroundColor: '#333'
  }
};

export default function Example() {
    return (
      <Menu menuButton={<MenuButton>Open menu</MenuButton>} menuStyles={menuStyles}>
        <MenuItem>New File</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuItem styles={menuItemStyles}>I'm special</MenuItem>
      </Menu>
    );
}`
};

export const classNameProp = {
  id: 'classname-prop',

  title: 'className prop',

  desc: (
    <>
      <p>
        You can give components CSS classes using the various <code>*className</code> props.
        Optionally, you may pass a function to the props and return different CSS class names under
        different component states.
      </p>
      <p>
        For more details about available states, please refer to the <code>*className</code> props
        under each <Link href={'/docs#menu-item'}>component</Link>.
      </p>
    </>
  ),

  source: `// If you use the functional form of className prop, 
// it's advisable to put it outside React component scope whenever possible.
const menuItemClassName = ({ hover, active }) =>
    active ? 'my-menuitem-active' : hover ? 'my-menuitem-hover' : 'my-menuitem';

<Menu menuButton={<MenuButton>Open menu</MenuButton>}
    menuClassName="my-menu">
    <MenuItem>New File</MenuItem>
    <MenuItem>Save</MenuItem>
    <MenuItem className={menuItemClassName}>
        I'm special
    </MenuItem>
</Menu>

// CSS classes
.my-menu {
    border: 2px solid green;
}

.my-menuitem {
    color: blue;
    background-color: #ee1;
}

.my-menuitem-hover {
    color: #ee1;
    background-color: #bf4080;
}

.my-menuitem-active {
    background-color: #333;
}`,

  fullSource: `import React from 'react';
import {
    Menu,
    MenuItem,
    MenuButton
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

const menuItemClassName = ({ hover, active }) =>
    active ? 'my-menuitem-active' : hover ? 'my-menuitem-hover' : 'my-menuitem';

export default function Example() {

    return (
        <Menu menuButton={<MenuButton>Open menu</MenuButton>}
            menuClassName="my-menu">
            <MenuItem>New File</MenuItem>
            <MenuItem>Save</MenuItem>
            <MenuItem className={menuItemClassName}>
                I'm special
            </MenuItem>
        </Menu>
    );
}

// CSS classes
.my-menu {
    border: 2px solid green;
}

.my-menuitem {
    color: blue;
    background-color: #ee1;
}

.my-menuitem-hover {
    color: #ee1;
    background-color: #bf4080;
}

.my-menuitem-active {
    background-color: #333;
}`
};

export const menu = {
  id: 'menu',
  title: 'Menu',
  desc: (
    <p>
      The group includes common usage examples of <code>Menu</code>, <code>SubMenu</code>, and{' '}
      <code>MenuItem</code>.
    </p>
  ),
  list: [basicMenu, subMenu, eventHandling, radioGroup, checkBox, headerAndDivider, combined]
};

export const menuItem = {
  id: 'menu-item',
  title: 'Menu item',
  desc: <p>Advanced usage examples with menu items.</p>,
  list: [linkAndDisabled, iconAndImage, hoverAndActive, focusableItem]
};

export const menuButton = {
  id: 'menu-button',
  title: 'Menu button',
  desc: <p>Change the look and contents of your menu button.</p>,
  list: [openStateButton, customisedButton]
};

export const menuOptions = {
  id: 'menu-options',
  title: 'Menu options',
  desc: <p>Control the display and position of menu related to menu button.</p>,
  list: [placement, overflow, boundingBox]
};

export const controlledMenu = {
  id: 'controlled-menu',
  title: 'Controlled menu',
  desc: (
    <p>
      Get more control of the states with <code>ControlledMenu</code>.
    </p>
  ),
  list: [managingState, menuStateHook, contextMenu]
};

export const customisedStyle = {
  id: 'styling',
  title: 'Styling',
  desc: (
    <>
      <p>
        <LibName /> is unopinionated when it comes to styling. It doesn't depend on any particular
        CSS-in-JS runtime and works with all flavours of front-end stack. Please checkout the
        respective CodeSandbox example below:
      </p>
      <StyleExamples />
      <p>
        You will usually import the <code>@szhsin/react-menu/dist/core.css</code> and target
        different CSS selectors. There is even a <code>style-utils</code> which helps you easily
        write the selectors. You can find a complete list of CSS selectors in the{' '}
        <Link href={'/style-guide#selectors'}>styling guide</Link>.
      </p>
      <p>
        In addition, you can use <code>className</code> or <code>styles</code> props.
      </p>
    </>
  ),
  list: [classNameProp, stylesProp]
};

export const usageExamples = {
  id: 'usage-examples',
  title: 'Usage',
  desc: (
    <p>
      Each of the following sections includes a live example. They are grouped into related
      categories. You could toggle between the brief and full versions of source code.
    </p>
  ),
  list: [menu, menuItem, menuOptions, menuButton, controlledMenu, customisedStyle]
};

export const features = {
  id: 'features',
  title: 'Features',
  desc: (
    <ul className="features">
      <li>React menu components for easy and fast web development.</li>
      <li>Unlimited levels of submenu.</li>
      <li>Supports dropdown or context menu.</li>
      <li>Supports radio and checkbox menu items.</li>
      <li>Flexible menu positioning.</li>
      <li>Comprehensive keyboard interactions.</li>
      <li>
        Unstyled components and easy <Link href={'#styling'}>customisation</Link>.
      </li>
      <li>Works in major browsers without polyfills.</li>
      <li>
        Adheres to{' '}
        <ExternalLink href="https://www.w3.org/TR/wai-aria-practices/#menu">
          WAI-ARIA Practices
        </ExternalLink>
        .
      </li>
    </ul>
  )
};

export const install = {
  id: 'install',
  title: 'Install',
  desc: (
    <div className="install-command">
      <p className="comment"># with npm</p>
      <p>npm install @szhsin/react-menu</p>
      <p className="comment"># with Yarn</p>
      <p>yarn add @szhsin/react-menu</p>
    </div>
  )
};

const codeExamples = [features, install, usageExamples];
export default codeExamples;
