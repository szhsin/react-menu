import React, { useState, useEffect, useRef } from 'react'

import {
  Menu, MenuItem, SubMenu, MenuButton,
  MenuRadioGroup, MenuDivider, MenuHeader, ControlledMenu
} from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'
import './index.css'

const App = () => {
  const [count, setCount] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [checkBoxs, setCheckBoxs] = useState([true, false]);
  const [radioValue, setRadioValue] = useState(1);
  const [isOpen, setOpen] = useState(false);
  const [isOpen1, setOpen1] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const btnRef = useRef(null);
  const inputRef = useRef(null);
  const timeoutId = useRef();

  const handleMenuClick = (e) => {
    switch (e.value) {
      case 'check1':
        setCheckBoxs(c => [e.checked, c[1]]);
        break;

      case 'check2':
        setCheckBoxs(c => [c[0], e.checked]);
        break;

      default:
        console.log('Menu click:', e.value);
        break;
    }
  }

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setAnchorPoint({ x: e.clientX, y: e.clientY });
      setOpen(true);
    }

    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    }
  }, []);

  const specialClass = ({ active, hover }) => {
    if (active) return 'special-item-active';
    if (hover) return 'special-item-hover';
    return 'special-item';
  }

  return (
    <div className="container">
      <button onClick={() => setCount(c => c + 1)}>count: {count}</button>
      <button onClick={() => setDisabled(d => !d)}>Toggle disabled</button>
      <div><textarea ref={inputRef} rows="5" /></div>

      <Menu styles={{ border: '2px dashed purple' }}
        menuButton={({ open }) => <MenuButton className="my-button">{open ? 'Close' : 'Open'}</MenuButton>}
        onClick={handleMenuClick} direction="bottom">
        <MenuItem value="1">item 1</MenuItem>
        <MenuItem className={specialClass} href="https://www.google.com/" target="_blank" value="google">Google</MenuItem>
        <MenuItem href="#" value="#" disabled={disabled}>item 2 (A long item)</MenuItem>
        <MenuItem disabled>item (disabled)</MenuItem>
        <SubMenu label="item 3" className={specialClass} menuClassName="my-menu">
          <MenuItem disabled={disabled}>item 3.1</MenuItem>
          <MenuDivider />
          <SubMenu label="item 3.2" disabled={disabled}>
            <MenuItem
              value="foo"
              onClick={e => console.log(`item 3.2.1 clicked: ${e}`)}>
              item 3.2.1
            </MenuItem>
            <MenuItem
              value="bar"
              onClick={e => {
                console.log(`item 3.2.2 clicked: ${e}`);
                return false;
              }}>
              item 3.2.2
            </MenuItem>
            <SubMenu label="more...">
              {[7, 8, 9].map(i => <MenuItem key={i} value={i}>{`Item ${i}`}</MenuItem>)}
            </SubMenu>
            <MenuItem value={323}>item 3.2.3</MenuItem>
          </SubMenu>
          <MenuItem href="https://github.com">Github</MenuItem>
          {[4, 5, 6].map(i => <MenuItem key={i} value={i}>{`Item ${i}`}</MenuItem>)}
        </SubMenu>
        <MenuDivider />
        <MenuItem type="checkbox" value={'check1'} checked={checkBoxs[0]}>Bold</MenuItem>
        <MenuItem type="checkbox" value={'check2'}
          checked={checkBoxs[1]} disabled={disabled}>
          Italic
        </MenuItem>
        <MenuDivider />
        <MenuHeader>Font size</MenuHeader>
        <MenuRadioGroup value={radioValue}
          aria-label="Text color"
          name="color" onChange={(e) => setRadioValue(e.value)}>
          {[16, 24, 32].map((i) =>
            <MenuItem styles={{
              color: 'blue',
              type: { radio: { color: 'red' } },
              backgroundColor: 'yellow',
              hover: {
                backgroundColor: '#bd7810'
              },
              active: {
                backgroundColor: '#333',
                color: 'yellow'
              }
            }} value={i} key={i}>{`${i}px`}</MenuItem>)}
        </MenuRadioGroup>
        <MenuDivider />
        <MenuItem className={specialClass} styles={{
          color: 'blue',
          backgroundColor: 'yellow',
          hover: {
            backgroundColor: '#bd7810'
          },
          active: {
            backgroundColor: '#333',
            color: 'yellow'
          }
        }}>item 4 9</MenuItem>
      </Menu>

      <ControlledMenu isOpen={isOpen} anchorPoint={anchorPoint} styles={{ border: '2px dashed green' }}
        aria-label="Commands"
        onClose={e => {
          setOpen(false);
          if (e.keyCode) btnRef.current.focus();
        }}
        onClick={e => console.log('Context menu click:', e.value)}>
        <SubMenu label="more..." menuClassName="my-menu" aria-label="more commands">
          {[1, 2, 3, 4].map(i => <MenuItem key={i} value={i}>{`Item ${i}`}</MenuItem>)}
        </SubMenu>
        <MenuItem styles={({ hover }) => hover ? { backgroundColor: '#980943' } : null}>Copy</MenuItem>
        <MenuItem className={specialClass}>Cut</MenuItem>
        <MenuItem>{({ hover, active }) => active ? 'active' : hover ? 'Hover' : 'normal'}</MenuItem>

      </ControlledMenu>

      <div><input /></div>

      <Menu styles={{ maxHeight: '600px' }}
        menuButton={({ open }) => <button>{open ? 'Close' : 'Open'}</button>}
        aria-label="My menu"
        onClick={handleMenuClick}
        align="center" animation={false}>
        {new Array(5).fill(0).map((e, i) => <MenuItem key={i}>{`Item ${i}`}</MenuItem>)}
        <SubMenu label={({ open }) => open ? 'font size' : 'close'} className={({ open }) => open ? 'submenu-open' : ''}
          styles={{ active: { color: 'red' } }}
          menuStyles={{ border: '2px dashed green' }}>
          <MenuRadioGroup value={radioValue} onChange={(e) => setRadioValue(e.value)}>
            {[1, 2, 3].map(i => <MenuItem disabled={i === 1} value={i} key={i}>{`Radio Item ${i}`}</MenuItem>)}
          </MenuRadioGroup>
        </SubMenu>
      </Menu>

      <div className="controlled-menu" onMouseEnter={e => setOpen1(true)}
        onMouseLeave={e => timeoutId.current = setTimeout(() => setOpen1(false), 300)}
        ref={btnRef}>Hover me</div>

      <ControlledMenu isOpen={isOpen1}
        anchorRef={btnRef}
        onClose={() => setOpen1(false)}
        onMouseEnter={() => clearTimeout(timeoutId.current)}
        onMouseLeave={e => setOpen1(false)}
        onKeyDown={(e) => e.key === 'x' && setOpen1(false)}>
        {[1, 2, 3].map(i => <MenuItem key={i} value={i}>{`Controlled ${i}`}</MenuItem>)}
        <SubMenu label="more...">
          {[1, 2, 3, 4].map(i => <MenuItem key={i} value={i}>{`Item ${i}`}</MenuItem>)}
        </SubMenu>
      </ControlledMenu>

    </div>
  );
}

export default App
