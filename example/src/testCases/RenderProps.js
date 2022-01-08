import React, { useReducer } from 'react';
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { bem } from '../utils';

export const expensiveCompute = (count = 900000000) => {
  let result = 0;
  for (let i = 0; i < count; i++) {
    const sign = i % 2 === 1 ? 1 : -1;
    result += sign * i;
  }

  return result;
};

const ItemContent = ({ hover, active }) => {
  expensiveCompute();
  console.log('ItemContent[render] hover, active', hover, active);

  return (
    <div>
      <p>ItemContent:</p>
      {active ? 'Pressed' : hover ? 'Press me' : 'Hover me'}
    </div>
  );
};

export default function Example() {
  const [count, increase] = useReducer((c) => c + 1, 1);
  return (
    <div>
      <h2>RenderProps</h2>
      <div className={bem('test-case', 'hover')} onMouseEnter={increase}>
        count: {count}
      </div>
      <Menu menuButton={<MenuButton>Open menu</MenuButton>} onItemClick={() => {}}>
        {new Array(10).fill(0).map((_, i) => (
          <MenuItem key={i}>Item {i + 1}</MenuItem>
        ))}
        <MenuItem>
          {React.useCallback(
            (props) => (
              <ItemContent {...props} />
            ),
            []
          )}
        </MenuItem>
        <MenuItem>
          <ItemContent />
        </MenuItem>
      </Menu>
    </div>
  );
}
