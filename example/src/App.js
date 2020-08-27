import React from 'react'

import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu'
import '@szhsin/react-menu/dist/index.css'

const App = () => {
  return (
    <div className="container">
      <div><input /></div>

      <Menu renderButton={(props, ref) => <MenuButton {...props} ref={ref}>Open menu</MenuButton>}>
        <MenuItem>item 1</MenuItem>
        <MenuItem>item 2</MenuItem>
        <MenuItem>item 3</MenuItem>
        <MenuItem>item 4</MenuItem>
      </Menu>

      <div><input /></div>

      <Menu renderButton={(props, ref) => <button {...props} ref={ref}>Customisable button</button>}>
        <MenuItem>item 1</MenuItem>
        <MenuItem>item 2</MenuItem>
        <MenuItem>item 3</MenuItem>
      </Menu>

    </div>
  );
}

export default App
