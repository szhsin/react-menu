import React, { useState } from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { bem } from '../utils';

const DynamicChildren = () => {
  const [isShowItem, setShowItem] = useState(false);
  return (
    <>
      <h2>Dynamic children</h2>
      <div className={bem('test-case')}>
        <Menu menuButton={<MenuButton>Open</MenuButton>}>
          {new Array(10).fill(0).map((_, i) => (
            <MenuItem
              disabled={i % 3 === 0}
              key={i}
              onClick={(e) => {
                e.keepOpen = true;
                setShowItem((s) => !s);
              }}
            >
              Item {i + 1}
            </MenuItem>
          ))}
          {isShowItem && <MenuItem>Dynamic item</MenuItem>}
          <MenuItem>Last item</MenuItem>
        </Menu>
      </div>
    </>
  );
};

export default DynamicChildren;
