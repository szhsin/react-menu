import { createRef } from 'react';
import { Menu, MenuItem, MenuGroup, MenuButton, MenuDivider } from './entry';
import { fireEvent } from '@testing-library/react';
import * as utils from './utils';

test('MenuGroup should allow keyboard navigation to go thru its children', () => {
  const ref = createRef();
  utils.render(
    <Menu menuButton={<MenuButton>Menu Group</MenuButton>} setDownOverflow>
      <MenuItem>One</MenuItem>
      <MenuGroup ref={ref} takeOverflow>
        <MenuItem>Two</MenuItem>
        <MenuDivider />
        <MenuItem disabled>Skip</MenuItem>
        <MenuGroup>
          <MenuItem>Three</MenuItem>
        </MenuGroup>
      </MenuGroup>
      <MenuItem>Four</MenuItem>
    </Menu>
  );

  expect(ref.current).toBeNull();
  utils.clickMenuButton();
  expect(ref.current).toHaveClass('szh-menu__group');
  const menu = utils.queryMenu();

  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(utils.queryMenuItem('One')).toHaveFocus();
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(utils.queryMenuItem('Two')).toHaveFocus();
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(utils.queryMenuItem('Three')).toHaveFocus();
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(utils.queryMenuItem('Four')).toHaveFocus();
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  expect(utils.queryMenuItem('One')).toHaveFocus();
});
