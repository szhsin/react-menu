import { createRef } from 'react';
import {
  Menu,
  MenuItem,
  FocusableItem,
  MenuHeader,
  MenuDivider,
  MenuButton,
  MenuRadioGroup
} from './entry';
import { screen, fireEvent, act } from '@testing-library/react';
import * as utils from './utils';

const { render } = utils;
const { queryByRole, queryAllByRole } = screen;
const LastItem = utils.LastItem;

test('Radio menu items', () => {
  const onItemClick = jest.fn();
  const onChange = jest.fn();
  const getMenu = (value) => (
    <Menu onItemClick={onItemClick} menuButton={<MenuButton>Color</MenuButton>}>
      <MenuRadioGroup value={value} name="color" onRadioChange={onChange}>
        <MenuItem type="radio" value="red">
          Red
        </MenuItem>
        <MenuItem type="radio" value="green">
          Green
        </MenuItem>
        <MenuItem type="radio" value="blue">
          Blue
        </MenuItem>
        {'falsy'.length === 0 && (
          <MenuItem type="radio" value="black">
            Black
          </MenuItem>
        )}
        <LastItem />
      </MenuRadioGroup>
    </Menu>
  );

  const { rerender } = render(getMenu('green'));
  utils.clickMenuButton();
  const menuItems = queryAllByRole('menuitemradio');
  expect(menuItems).toHaveLength(3);
  menuItems.forEach((item) => expect(item).toHaveClass('szh-menu__item--type-radio'));
  utils.expectMenuItemToBeChecked(queryByRole('menuitemradio', { name: 'Green' }), true);

  fireEvent.click(queryByRole('menuitemradio', { name: 'Blue' }));
  expect(onChange).toHaveBeenCalledWith(utils.clickEvent({ name: 'color', value: 'blue' }));
  expect(onItemClick).toHaveBeenCalledWith(utils.clickEvent({ name: 'color', value: 'blue' }));
  rerender(getMenu('blue'));
  utils.expectMenuItemToBeChecked(queryByRole('menuitemradio', { name: 'Blue' }), true);
  utils.expectMenuItemToBeChecked(queryByRole('menuitemradio', { name: 'Green' }), false);
  utils.expectMenuToBeOpen(false);
});

test('Use keepOpen of onChange to customise when menu is closed', () => {
  render(
    <Menu menuButton={<MenuButton>Color</MenuButton>}>
      <MenuRadioGroup value="green" onRadioChange={(e) => (e.keepOpen = true)}>
        <MenuItem type="radio" value="red">
          Red
        </MenuItem>
        <MenuItem type="radio" value="green">
          Green
        </MenuItem>
      </MenuRadioGroup>
    </Menu>
  );
  utils.clickMenuButton();

  utils.expectMenuToBeOpen(true);
  fireEvent.click(queryByRole('menuitemradio', { name: 'Red' }));
  utils.expectMenuToBeOpen(true);
});

test('Checkbox menu items', () => {
  const onItemClick = jest.fn();
  const onClick = jest.fn();
  const getMenu = (isBold) => (
    <Menu onItemClick={onItemClick} menuButton={<MenuButton>Text style</MenuButton>}>
      <MenuItem type="checkbox" checked={isBold} onClick={onClick}>
        Bold
      </MenuItem>
      <MenuItem type="checkbox" checked={false}>
        Italic
      </MenuItem>
      {'falsy'.length === 0 && <MenuItem type="checkbox">falsy</MenuItem>}
    </Menu>
  );

  const { rerender } = render(getMenu(true));
  utils.clickMenuButton();
  const menuItems = queryAllByRole('menuitemcheckbox');
  expect(menuItems).toHaveLength(2);
  menuItems.forEach((item) => expect(item).toHaveClass('szh-menu__item--type-checkbox'));

  const boldItem = queryByRole('menuitemcheckbox', { name: 'Bold' });
  utils.expectMenuItemToBeChecked(boldItem, true);
  utils.expectMenuItemToBeChecked(queryByRole('menuitemcheckbox', { name: 'Italic' }), false);

  fireEvent.click(boldItem);
  expect(onClick).toHaveBeenLastCalledWith(utils.clickEvent({ checked: false }));
  expect(onItemClick).toHaveBeenLastCalledWith(utils.clickEvent({ checked: false }));
  rerender(getMenu(false));
  utils.expectMenuItemToBeChecked(boldItem, false);
  utils.expectMenuToBeOpen(false);

  utils.clickMenuButton();
  fireEvent.click(boldItem);
  expect(onClick).toHaveBeenLastCalledWith(utils.clickEvent({ checked: true }));
  expect(onItemClick).toHaveBeenLastCalledWith(utils.clickEvent({ checked: true }));
  expect(onClick).toHaveBeenCalledTimes(2);
  expect(onItemClick).toHaveBeenCalledTimes(2);
});

test('Hover and keyboard click menu items', () => {
  const onItemClick = jest.fn();
  const onClick = jest.fn();
  utils.renderMenu({ onItemClick }, { value: 'Middle', onClick });
  utils.clickMenuButton();

  // hover a menu item
  const middleItem = utils.queryMenuItem('Middle');
  fireEvent.mouseMove(middleItem);
  utils.expectMenuItemToBeHover(middleItem, true);
  expect(middleItem).toHaveFocus();

  // unhover a menu item
  fireEvent.mouseLeave(middleItem);
  utils.expectMenuItemToBeHover(middleItem, false);
  expect(middleItem).toHaveFocus(); // still keep focus
  fireEvent.keyDown(middleItem, { key: 'Enter' });
  expect(onItemClick).not.toHaveBeenCalled();
  expect(onClick).not.toHaveBeenCalled();
  utils.expectMenuToBeOpen(true);

  // hover menu items one after the other
  const firstItem = utils.queryMenuItem('First');
  fireEvent.mouseMove(firstItem);
  expect(firstItem).toHaveFocus();
  utils.expectMenuItemToBeHover(firstItem, true);
  utils.expectMenuItemToBeHover(middleItem, false);

  fireEvent.mouseMove(middleItem);
  expect(middleItem).toHaveFocus();
  utils.expectMenuItemToBeHover(firstItem, false);
  utils.expectMenuItemToBeHover(middleItem, true);

  fireEvent.keyDown(middleItem, { key: 'Enter' });
  expect(onItemClick).toHaveBeenLastCalledWith(utils.clickEvent({ key: 'Enter', value: 'Middle' }));
  expect(onClick).toHaveBeenLastCalledWith(utils.clickEvent({ key: 'Enter', value: 'Middle' }));
  expect(onItemClick).toHaveBeenCalledTimes(1);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('MenuItem keeps hover after focusing something inside it', () => {
  utils.renderMenu(undefined, { children: <button>Click</button> });
  utils.clickMenuButton();

  const menuItem = utils.queryMenuItem('Click');
  fireEvent.mouseMove(menuItem);
  expect(menuItem).toHaveFocus();
  utils.expectMenuItemToBeHover(menuItem, true);

  act(() => queryByRole('button', { name: 'Click' }).focus());
  expect(menuItem).not.toHaveFocus();
  utils.expectMenuItemToBeHover(menuItem, true);
});

test('Disabled menu item', () => {
  const onClick = jest.fn();
  utils.renderMenu({ onClick }, { disabled: true });
  utils.clickMenuButton();

  const disabledItem = utils.queryMenuItem('Middle');
  utils.expectToBeDisabled(disabledItem, true);
  fireEvent.mouseMove(disabledItem);
  utils.expectMenuItemToBeHover(disabledItem, false, true);
  fireEvent.click(disabledItem);
  expect(onClick).not.toHaveBeenCalled();
  utils.expectMenuToBeOpen(true);

  const menuItem = utils.queryMenuItem('First');
  utils.expectToBeDisabled(menuItem, false);
  utils.expectMenuItemToBeChecked(menuItem);
  fireEvent.mouseMove(menuItem);
  utils.expectMenuItemToBeHover(menuItem, true);

  // Menu item loses hover state when losing focus
  act(() => utils.queryMenu().focus());
  utils.expectMenuItemToBeHover(menuItem, false);
});

test('Children of MenuItem is a function', () => {
  const renderFn = jest.fn();
  utils.renderMenu(null, { children: renderFn }, false);
  utils.clickMenuButton();

  fireEvent.keyDown(utils.queryMenu(), { key: 'ArrowDown' });
  fireEvent.keyDown(utils.queryMenu(), { key: 'ArrowDown' });
  expect(renderFn).toHaveBeenLastCalledWith(expect.objectContaining({ hover: true }));
  fireEvent.keyDown(utils.queryMenu(), { key: 'ArrowDown' });
  expect(renderFn).toHaveBeenCalledTimes(3);
});

test('Additional props are forwarded to MenuItem', () => {
  const onMouseMove = jest.fn();
  const onKeyDown = jest.fn();
  utils.renderMenu(null, {
    ['aria-label']: 'test',
    randomattr: 'random',
    onMouseMove,
    onKeyDown
  });
  utils.clickMenuButton();

  const menuItem = screen.queryByText('Middle');
  expect(menuItem).toHaveAttribute('aria-label', 'test');
  expect(menuItem).toHaveAttribute('randomattr', 'random');
  fireEvent.mouseMove(menuItem);
  expect(onMouseMove).toHaveBeenCalledTimes(1);
  fireEvent.keyDown(menuItem, { key: 'Enter' });
  expect(onKeyDown).toHaveBeenCalledTimes(1);
});

test('FocusableItem', () => {
  const renderFn = jest.fn();
  const itemRef = createRef();
  render(
    <Menu menuButton={<MenuButton>Menu</MenuButton>}>
      <MenuItem>First</MenuItem>
      <FocusableItem ref={itemRef}>
        {({ ref, hover, closeMenu }) => {
          renderFn(hover);
          return (
            <button ref={ref} className={hover ? 'hover' : undefined} onClick={() => closeMenu()}>
              Close
            </button>
          );
        }}
      </FocusableItem>
      <MenuDivider />
      <MenuHeader>Header</MenuHeader>
      <MenuItem>Last</MenuItem>
    </Menu>
  );

  expect(itemRef.current).toBeNull();
  utils.clickMenuButton({ name: 'Menu' });
  expect(itemRef.current).toHaveClass('szh-menu__item--focusable');
  utils.expectMenuToBeOpen(true);
  expect(renderFn).toHaveBeenLastCalledWith(false);

  const button = queryByRole('button', { name: 'Close' });
  fireEvent.mouseMove(button);
  expect(button).toHaveFocus();
  expect(button).toHaveClass('hover');
  expect(renderFn).toHaveBeenLastCalledWith(true);

  fireEvent.keyDown(button, { key: 'ArrowDown' });
  expect(button).not.toHaveFocus();
  expect(button).not.toHaveClass('hover');
  expect(renderFn).toHaveBeenLastCalledWith(false);

  fireEvent.keyDown(utils.queryMenu(), { key: 'ArrowDown' });
  fireEvent.keyDown(utils.queryMenu(), { key: 'ArrowDown' });
  expect(button).toHaveFocus();
  expect(button).toHaveClass('hover');
  expect(renderFn).toHaveBeenLastCalledWith(true);
  expect(renderFn).toHaveBeenCalledTimes(8);

  fireEvent.click(button);
  utils.expectMenuToBeOpen(false);
});
