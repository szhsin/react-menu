import React, { useState } from 'react'

import { Menu, MenuItem, SubMenu, MenuButton, MenuRadioGroup } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'

const App = () => {
  const [count, setCount] = useState(0);
  const [checkBoxs, setCheckBoxs] = useState([true, false]);

  const handleMenuClick = (e) => {
    switch (e.key) {
      case 'check1':
        setCheckBoxs(c => [e.value.checked, c[1]]);
        break;

      case 'check2':
        setCheckBoxs(c => [c[0], e.value.checked]);
        break;

      default:
        break;
    }
  }

  return (
    <div className="container">
      <button onClick={() => setCount(c => c + 1)}>count: {count}</button>
      <div><textarea rows="5" /></div>

      <Menu menuButton={<MenuButton>Open menu</MenuButton>}
        onClick={handleMenuClick}>
        <MenuItem>item 1</MenuItem>
        <MenuItem>item 2</MenuItem>
        <SubMenu label="item 3 (A long item)">
          <MenuItem>item 3.1</MenuItem>
          <SubMenu label="item 3.2">
            <MenuItem
              eventValue="foo"
              onClick={e => console.log(`item 3.2.1 clicked: ${e}`)}>
              item 3.2.1
            </MenuItem>
            <MenuItem
              eventValue="bar"
              onClick={e => {
                console.log(`item 3.2.2 clicked: ${e}`);
                return false;
              }}>
              item 3.2.2
            </MenuItem>
            <MenuItem eventValue={323}>item 3.2.3</MenuItem>
          </SubMenu>
          <MenuItem>item 3.3</MenuItem>
        </SubMenu>
        <MenuItem type="checkbox" eventKey={'check1'} checked={checkBoxs[0]}>Bold</MenuItem>
        <MenuItem type="checkbox" eventKey={'check2'} checked={checkBoxs[1]}>Italic</MenuItem>
        <MenuItem type="radio" checked={true}>item 4</MenuItem>
      </Menu>

      <div><input /></div>

      <Menu menuButton={<button>Customisable button</button>}>
        {[1, 2, 3, 4].map(i => <MenuItem key={i}>{`Item ${i}`}</MenuItem>)}
        <MenuRadioGroup>
          <MenuItem checked={true}>radio 1</MenuItem>
          <MenuItem >radio 2</MenuItem>
        </MenuRadioGroup>
        <MenuItem>item 5</MenuItem>
      </Menu>

      <button onClick={e => console.log('Button clicked')}>Click me</button>

    </div>
  );
}

export default App
