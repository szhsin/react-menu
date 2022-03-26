import React, { useRef, useState, useContext, useEffect } from 'react';
import {
  Menu as ReactMenu,
  ControlledMenu as ReactControlledMenu,
  MenuItem,
  MenuButton,
  FocusableItem,
  SubMenu,
  MenuGroup,
  MenuRadioGroup,
  MenuHeader,
  MenuDivider,
  useMenuState,
  // useHotkeys,
  registerHotkeys,
  typeahead,
  configure
} from '@szhsin/react-menu';
import {
  SettingContext,
  DomInfoContext,
  ToastContext,
  withPresetProps,
  useLayoutEffect
} from '../utils';
import { basePath } from '../../next.config';
import { TableContents } from './TableContents';
import { Example } from './Example';
import { HashHeading } from './HashHeading';
import data, * as codeExamples from '../data/codeExamples';

configure({ typeahead });

/**
 * @type {React.NamedExoticComponent<import('@szhsin/react-menu').MenuProps>}
 */
const Menu = withPresetProps(ReactMenu);
/**
 * @type {React.NamedExoticComponent<import('@szhsin/react-menu').ControlledMenuProps>}
 */
const ControlledMenu = withPresetProps(ReactControlledMenu);

const Usage = React.memo(function Usage() {
  return (
    <React.Fragment>
      <TableContents>{data}</TableContents>

      <main id="usage">
        <GroupingSection heading="h1" data={codeExamples.features} />
        <GroupingSection heading="h1" data={codeExamples.install} />
        <GroupingSection heading="h1" data={codeExamples.usageExamples} />

        <GroupingSection data={codeExamples.menu} />
        <BasicMenuExample />
        <SubmenuExample />
        <EventHandlingExample />
        <RadioGroupExample />
        <CheckBoxExample />
        <HeaderAndDividerExample />
        <CombinedExample />

        <GroupingSection data={codeExamples.menuItem} />
        <LinkAndDisabledExample />
        <IconAndImageExample />
        <HoverItemExample />
        <FocusableItemExample />

        <GroupingSection data={codeExamples.menuOptions} />
        <MenuPlacementExample />
        <MenuOverflowExample />
        <BoundingBoxExample />

        <GroupingSection data={codeExamples.menuButton} />
        <OpenStateExample />
        <CustomisedButtonExample />

        <GroupingSection data={codeExamples.controlledMenu} />
        <ManagingStateExample />
        <MenuStateHookExample />
        <ContextMenuExample />

        <GroupingSection data={codeExamples.customisedStyle} />
        <ClassNamePropExample />
      </main>

      <div className="place-holder" role="presentation" />
    </React.Fragment>
  );
});

function GroupingSection({ heading, data: { id, title, desc } }) {
  return (
    <>
      <HashHeading id={id} title={title} heading={heading || 'h2'} />
      {desc}
    </>
  );
}

function BasicMenuExample() {
  const [flag, setFlag] = useState(true);

  // const hotkeys = useHotkeys();
  // hotkeys();

  return (
    <Example initialFullSource={true} data={codeExamples.basicMenu}>
      <button onClick={() => setFlag((f) => !f)}>flag {flag.toString()}</button>
      <Menu
        menuButton={<MenuButton>Open menu</MenuButton>}
        onItemClick={(e) => console.log('menu click', e.key, e.value)}
      >
        <MenuItem
          registerHotkeys={flag ? registerHotkeys('1') : undefined}
          onClick={(e) => console.log('item click', e.key)}
        >
          item 1
        </MenuItem>
        <MenuItem value="2" registerHotkeys={registerHotkeys('2', true)}>
          item 2
        </MenuItem>
        <MenuItem>item 3</MenuItem>
      </Menu>
    </Example>
  );
}

function SubmenuExample() {
  return (
    <Example data={codeExamples.subMenu}>
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
    </Example>
  );
}

function EventHandlingExample() {
  const ref = useRef(null);
  const lineNum = useRef(1);
  const [output, setOutput] = useState([]);

  const addLine = (line) => {
    return setOutput((o) => [...o, <li key={lineNum.current++}>{line}</li>]);
  };

  const handleMenuClick = (e) => {
    addLine(`[Menu] ${e.value} clicked`);
    addLine('------');
  };

  const handleFileClick = (e) => {
    addLine(`[MenuItem] ${e.value} clicked`);
  };

  const handleSaveClick = (e) => {
    addLine(`[MenuItem] ${e.value} clicked`);
    addLine('------');
    e.stopPropagation = true;
  };

  useLayoutEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [/* effect dep */ output]);

  return (
    <Example data={codeExamples.eventHandling}>
      <div className="buttons">
        <Menu menuButton={<MenuButton>Open menu</MenuButton>} onItemClick={handleMenuClick}>
          <MenuItem value="File" onClick={handleFileClick}>
            File
          </MenuItem>

          <MenuItem value="Save" onClick={handleSaveClick}>
            Save
          </MenuItem>

          <MenuItem value="Close">Close</MenuItem>
        </Menu>

        <button className="btn" onClick={() => setOutput([])}>
          Clear
        </button>
      </div>

      <ul className="output" ref={ref}>
        {output}
      </ul>
    </Example>
  );
}

function RadioGroupExample() {
  const [textColor, setTextColor] = useState('red');
  const { isDark } = useContext(SettingContext);

  return (
    <Example data={codeExamples.radioGroup}>
      <Menu menuButton={<MenuButton>Text color</MenuButton>}>
        <MenuRadioGroup value={textColor} onRadioChange={(e) => setTextColor(e.value)}>
          <MenuItem type="radio" value="red">
            Red
          </MenuItem>
          <MenuItem type="radio" value="green">
            Green
          </MenuItem>
          <MenuItem type="radio" value={isDark ? '#69a6f8' : 'blue'}>
            Blue
          </MenuItem>
        </MenuRadioGroup>
      </Menu>

      <div className="sample-text" style={{ color: textColor }}>
        Sample text
      </div>
    </Example>
  );
}

function CheckBoxExample() {
  const [isBold, setBold] = useState(true);
  const [isItalic, setItalic] = useState(true);
  const [isUnderline, setUnderline] = useState(false);

  return (
    <Example data={codeExamples.checkBox}>
      <Menu menuButton={<MenuButton>Text style</MenuButton>}>
        <MenuItem type="checkbox" checked={isBold} onClick={(e) => setBold(e.checked)}>
          Bold
        </MenuItem>
        <MenuItem type="checkbox" checked={isItalic} onClick={(e) => setItalic(e.checked)}>
          Italic
        </MenuItem>
        <MenuItem type="checkbox" checked={isUnderline} onClick={(e) => setUnderline(e.checked)}>
          Underline
        </MenuItem>
      </Menu>

      <div
        className="sample-text"
        style={{
          fontWeight: isBold ? 'bold' : 'initial',
          fontStyle: isItalic ? 'italic' : 'initial',
          textDecoration: isUnderline ? 'underline' : 'initial'
        }}
      >
        Sample text
      </div>
    </Example>
  );
}

function HeaderAndDividerExample() {
  return (
    <Example data={codeExamples.headerAndDivider}>
      <Menu
        menuButton={<MenuButton>Open menu</MenuButton>}
        boundingBoxPadding={`${useContext(DomInfoContext).navbarHeight} 0 0 0`}
      >
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
    </Example>
  );
}

function CombinedExample() {
  const [textColor, setTextColor] = useState('red');
  const [isBold, setBold] = useState(true);
  const [isItalic, setItalic] = useState(true);
  const [isUnderline, setUnderline] = useState(false);
  const { isDark } = useContext(SettingContext);

  return (
    <Example data={codeExamples.combined}>
      <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
        <MenuItem>New File</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuDivider />
        <MenuHeader>Text settings</MenuHeader>

        <SubMenu label="Text color">
          <MenuRadioGroup value={textColor} onRadioChange={(e) => setTextColor(e.value)}>
            <MenuItem type="radio" value={'red'}>
              Red
            </MenuItem>
            <MenuItem type="radio" value={'green'}>
              Green
            </MenuItem>
            <MenuItem type="radio" value={isDark ? '#69a6f8' : 'blue'}>
              Blue
            </MenuItem>
          </MenuRadioGroup>
        </SubMenu>

        <SubMenu label="Text style">
          <MenuItem type="checkbox" checked={isBold} onClick={(e) => setBold(e.checked)}>
            Bold
          </MenuItem>
          <MenuItem type="checkbox" checked={isItalic} onClick={(e) => setItalic(e.checked)}>
            Italic
          </MenuItem>
          <MenuItem type="checkbox" checked={isUnderline} onClick={(e) => setUnderline(e.checked)}>
            Underline
          </MenuItem>
        </SubMenu>
      </Menu>

      <div
        className="sample-text"
        style={{
          color: textColor,
          fontWeight: isBold ? 'bold' : 'initial',
          fontStyle: isItalic ? 'italic' : 'initial',
          textDecoration: isUnderline ? 'underline' : 'initial'
        }}
      >
        Sample text
      </div>
    </Example>
  );
}

function LinkAndDisabledExample() {
  return (
    <Example data={codeExamples.linkAndDisabled}>
      <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
        <MenuItem href="https://www.google.com/">Google</MenuItem>
        <MenuItem
          disabled
          href="https://github.com/szhsin/react-menu/"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub (new window)
        </MenuItem>
        <MenuItem>Regular item</MenuItem>
        <MenuItem disabled>Disabled item</MenuItem>
      </Menu>
    </Example>
  );
}

function IconAndImageExample() {
  return (
    <Example data={codeExamples.iconAndImage}>
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
          <img src={`${basePath}/octocat.png`} alt="" role="presentation" />
          GitHub
        </MenuItem>
      </Menu>
    </Example>
  );
}

function HoverItemExample() {
  return (
    <Example data={codeExamples.hoverItem}>
      <Menu menuButton={<MenuButton>Open menu</MenuButton>}>
        <MenuItem>{({ hover }) => (hover ? 'Hovered!' : 'Hover me')}</MenuItem>
        <MenuDivider />
        <MenuItem style={{ justifyContent: 'center' }}>
          {({ hover }) => (
            <i className="material-icons md-48">
              {hover ? 'sentiment_very_satisfied' : 'sentiment_very_dissatisfied'}
            </i>
          )}
        </MenuItem>
      </Menu>
    </Example>
  );
}

function FocusableItemExample() {
  const [filter, setFilter] = useState('');
  const { vWidth, navbarHeight } = useContext(DomInfoContext);

  return (
    <Example data={codeExamples.focusableItem}>
      <Menu
        menuButton={<MenuButton>Open menu</MenuButton>}
        direction={vWidth < 600 ? 'top' : 'bottom'}
        align="center"
        onMenuChange={(e) => e.open && setFilter('')}
        boundingBoxPadding={`${navbarHeight} 0 0 0`}
      >
        <FocusableItem>
          {({ ref }) => (
            <input
              ref={ref}
              type="text"
              placeholder="Type to filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          )}
        </FocusableItem>
        {['Apple', 'Banana', 'Blueberry', 'Cherry', 'Strawberry']
          .filter((fruit) => fruit.toUpperCase().includes(filter.trim().toUpperCase()))
          .map((fruit) => (
            <MenuItem key={fruit}>{fruit}</MenuItem>
          ))}
      </Menu>
    </Example>
  );
}

function OpenStateExample() {
  return (
    <Example data={codeExamples.openStateButton}>
      <Menu
        menuButton={({ open }) => (
          <MenuButton style={{ minWidth: '5rem' }}>{open ? 'Close' : 'Open'}</MenuButton>
        )}
      >
        <MenuItem>New File</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuItem>Close Window</MenuItem>
      </Menu>
    </Example>
  );
}

function CustomisedButtonExample() {
  return (
    <Example data={codeExamples.customisedButton}>
      <Menu menuButton={<button className="btn btn-primary">Open menu</button>}>
        <MenuItem>New File</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuItem>Close Window</MenuItem>
      </Menu>
    </Example>
  );
}

const alginOptions = [['start'], ['center'], ['end']];
const displayOptions = [['default'], ['arrow', 'display an arrow'], ['offset', 'display a gap']];
const positionOptions = [
  ['auto', 'keep in viewport'],
  ['anchor', 'stick to the edges of anchor'],
  ['initial', 'fixed to initial position']
];
const viewScrollOptions = [
  ['initial', 'keep menu in place'],
  ['auto', 'reposition menu'],
  ['close', 'close menu']
];

function MenuPlacementExample() {
  const [display, setDisplay] = useState('arrow');
  const [align, setAlign] = useState('center');
  const [position, setPosition] = useState('anchor');
  const [viewScroll, setViewScroll] = useState('auto');
  const { navbarHeight } = useContext(DomInfoContext);

  const menus = ['right', 'top', 'bottom', 'left'].map((direction) => (
    <Menu
      menuButton={<MenuButton>{direction}</MenuButton>}
      key={direction}
      direction={direction}
      boundingBoxPadding={`${navbarHeight} 0 0 0`}
      align={align}
      position={position}
      viewScroll={viewScroll}
      arrow={display === 'arrow'}
      offsetX={display === 'offset' && (direction === 'left' || direction === 'right') ? 12 : 0}
      offsetY={display === 'offset' && (direction === 'top' || direction === 'bottom') ? 12 : 0}
    >
      {['Apple', 'Banana', 'Blueberry', 'Cherry', 'Strawberry'].map((fruit) => (
        <MenuItem key={fruit}>{fruit}</MenuItem>
      ))}
    </Menu>
  ));

  return (
    <Example data={codeExamples.placement}>
      <form className="option-form">
        <MenuOptions
          name="alignGroup"
          title="Align with anchor"
          data={alginOptions}
          option={align}
          onOptionChange={setAlign}
        />
        <MenuOptions
          name="displayGroup"
          title="Menu to anchor"
          data={displayOptions}
          option={display}
          onOptionChange={setDisplay}
        />
        <MenuOptions
          name="viewScrollGroup"
          title="When window scrolls"
          data={viewScrollOptions}
          option={viewScroll}
          onOptionChange={setViewScroll}
        />
        <MenuOptions
          name="positionGroup"
          title="Menu position"
          data={positionOptions}
          option={position}
          onOptionChange={setPosition}
        />
      </form>
      <p className="alert-warning">
        <i className="material-icons">info</i> Try to select different option combinations and
        scroll page up and down to see the behaviour.
      </p>
      <div className="menus">{menus}</div>
    </Example>
  );
}

const overflowOptions = [['visible'], ['auto'], ['hidden']];

function MenuOverflowExample() {
  const [overflow, setOverflow] = useState('auto');
  const [position, setPosition] = useState('auto');
  const [filter, setFilter] = useState('');
  const setToast = useContext(ToastContext);

  return (
    <Example data={codeExamples.overflow}>
      <form className="option-form">
        <MenuOptions
          name="overflowGroup"
          title="Overflow"
          data={overflowOptions}
          option={overflow}
          onOptionChange={setOverflow}
        />
        <MenuOptions
          name="positionGroup"
          title="Menu position"
          data={positionOptions}
          option={position}
          onOptionChange={setPosition}
        />
      </form>

      <div>
        <Menu
          menuButton={<MenuButton>Overflow</MenuButton>}
          overflow={overflow}
          position={position}
          align="end"
        >
          {new Array(40).fill(0).map((_, i) => {
            const item = `Item ${i + 1}`;
            return (
              <MenuItem key={i} onClick={() => setToast(item + ' clicked')}>
                {item}
              </MenuItem>
            );
          })}
        </Menu>
        <Menu
          menuButton={<MenuButton style={{ marginTop: '2rem' }}>Grouping</MenuButton>}
          setDownOverflow
          overflow={overflow}
          position={position}
          boundingBoxPadding="10"
          onMenuChange={(e) => e.open && setFilter('')}
          align="end"
        >
          <FocusableItem style={{ padding: '0.375rem 1rem' }}>
            {({ ref }) => (
              <input
                ref={ref}
                type="text"
                placeholder="Type a number"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            )}
          </FocusableItem>
          <MenuGroup takeOverflow>
            {new Array(40)
              .fill(0)
              .map((_, i) => `Item ${i + 1}`)
              .filter((item) => item.includes(filter.trim()))
              .map((item, i) => (
                <MenuItem key={i} onClick={() => setToast(item + ' clicked')}>
                  {item}
                </MenuItem>
              ))}
          </MenuGroup>
          <MenuItem onClick={() => setToast('Last item clicked')}>Last (fixed)</MenuItem>
        </Menu>
      </div>
    </Example>
  );
}

function BoundingBoxExample() {
  const ref = useRef(null);
  const leftAnchor = useRef(null);
  const rightAnchor = useRef(null);
  const [{ state }, toggleMenu] = useMenuState();
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

  return (
    <Example data={codeExamples.boundingBox} ref={ref}>
      <div className="bounding-box">
        <div className="anchor" ref={leftAnchor} />
        <ControlledMenu {...tooltipProps} anchorRef={leftAnchor} direction="top">
          I can flip if you scroll this block
        </ControlledMenu>

        <div className="anchor" ref={rightAnchor} />
        {/* explicitly set bounding box with the boundingBoxRef prop */}
        <ControlledMenu
          {...tooltipProps}
          boundingBoxRef={ref}
          anchorRef={rightAnchor}
          direction="right"
        >
          I&apos;m a tooltip built with React-Menu
        </ControlledMenu>
      </div>
    </Example>
  );
}

function ManagingStateExample() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState();

  return (
    <Example data={codeExamples.managingState} style={{ flexWrap: 'wrap' }}>
      <div ref={ref} className="btn" onMouseEnter={() => setOpen(true)}>
        Hover to Open
      </div>

      <ControlledMenu
        state={isOpen ? 'open' : 'closed'}
        anchorRef={ref}
        onMouseLeave={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <MenuItem>New File</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuItem>Close Window</MenuItem>
      </ControlledMenu>

      <i style={{ padding: '0.25rem 1rem' }}>Tip: try the example with a mouse</i>
    </Example>
  );
}

function MenuStateHookExample() {
  const ref = useRef(null);
  const [menuProps, toggleMenu] = useMenuState({ transition: true });

  return (
    <Example data={codeExamples.menuStateHook}>
      <div ref={ref} className="btn" onMouseEnter={() => toggleMenu(true)}>
        Hover to Open
      </div>

      <ControlledMenu
        {...menuProps}
        anchorRef={ref}
        onMouseLeave={() => toggleMenu(false)}
        onClose={() => toggleMenu(false)}
      >
        <MenuItem>New File</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuItem>Close Window</MenuItem>
      </ControlledMenu>
    </Example>
  );
}

function ContextMenuExample() {
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  return (
    <Example
      data={codeExamples.contextMenu}
      onContextMenu={(e) => {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        toggleMenu(true);
      }}
    >
      Right click to open context menu
      <ControlledMenu {...menuProps} anchorPoint={anchorPoint} onClose={() => toggleMenu(false)}>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </ControlledMenu>
    </Example>
  );
}

const menuItemClassName = ({ hover }) => (hover ? 'my-menuitem-hover' : 'my-menuitem');

function ClassNamePropExample() {
  return (
    <Example data={codeExamples.classNameProp}>
      <Menu menuButton={<MenuButton>Open menu</MenuButton>} menuClassName="my-menu" align="center">
        <MenuItem>New File</MenuItem>
        <MenuItem>Save</MenuItem>
        <MenuItem className={menuItemClassName}>I&apos;m special</MenuItem>
      </Menu>
    </Example>
  );
}

function MenuOptions({ title, name, data, option, onOptionChange }) {
  return (
    <fieldset className="options">
      <legend>{title}</legend>
      {data.map(([value, desc]) => (
        <label key={value} className={option === value ? 'checked' : undefined}>
          <input
            type="radio"
            name={name}
            value={value}
            checked={option === value}
            onChange={({ target }) => target.checked && onOptionChange(target.value)}
          />
          {value}
          {desc && ` (${desc})`}
        </label>
      ))}
    </fieldset>
  );
}

export default Usage;
