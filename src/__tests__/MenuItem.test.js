import React from 'react';
import {
  Menu,
  MenuItem,
  FocusableItem,
  MenuHeader,
  MenuDivider,
  MenuButton,
  MenuRadioGroup
} from '../';
import { screen, render, fireEvent } from '@testing-library/react';
import * as utils from './utils';

const { queryByRole, queryAllByRole } = screen;
const LastItem = utils.LastItem;

test('Test radio items', () => {
  const onItemClick = jest.fn();
  const onChange = jest.fn();
  const getMenu = (value) => (
    <Menu onItemClick={onItemClick} menuButton={<MenuButton>Color</MenuButton>}>
      <MenuRadioGroup value={value} name="color" onRadioChange={onChange}>
        <MenuItem value="red">Red</MenuItem>
        <MenuItem value="green">Green</MenuItem>
        <MenuItem value="blue">Blue</MenuItem>
        {'falsy'.length === 0 && <MenuItem value="black">Black</MenuItem>}
        <LastItem />
      </MenuRadioGroup>
    </Menu>
  );

  const { rerender } = render(getMenu('green'));
  utils.clickMenuButton();
  const menuItems = queryAllByRole('menuitemradio');
  expect(menuItems).toHaveLength(4);
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
        <MenuItem value="red">Red</MenuItem>
        <MenuItem value="green">Green</MenuItem>
      </MenuRadioGroup>
    </Menu>
  );
  utils.clickMenuButton();

  utils.expectMenuToBeOpen(true);
  fireEvent.click(queryByRole('menuitemradio', { name: 'Red' }));
  utils.expectMenuToBeOpen(true);
});

test('Test check box items', () => {
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

test('Hover and press a menu item', () => {
  utils.renderMenu();
  utils.clickMenuButton();

  // hover and press a menu item
  const menuItem = utils.queryMenuItem('Middle');
  fireEvent.mouseEnter(menuItem);
  fireEvent.pointerDown(menuItem);
  utils.expectMenuItemToBeHover(menuItem, true);
  utils.expectMenuItemToBeActive(menuItem, true);
  expect(menuItem).toHaveAttribute('tabindex', '0');
  expect(menuItem).toHaveFocus();

  // unhover and release pressing a menu item
  fireEvent.mouseLeave(menuItem);
  fireEvent.pointerUp(menuItem);
  utils.expectMenuItemToBeHover(menuItem, false);
  utils.expectMenuItemToBeActive(menuItem, false);
  expect(menuItem).toHaveAttribute('tabindex', '-1');
  expect(menuItem).toHaveFocus(); // still keep focus

  // hover menu items one after the other
  const oneItem = utils.queryMenuItem('First');
  const anothorItem = utils.queryMenuItem('Last');

  fireEvent.mouseEnter(oneItem);
  expect(oneItem).toHaveFocus();
  utils.expectMenuItemToBeHover(oneItem, true);
  utils.expectMenuItemToBeHover(anothorItem, false);

  fireEvent.mouseEnter(anothorItem);
  expect(anothorItem).toHaveFocus();
  utils.expectMenuItemToBeHover(oneItem, false);
  utils.expectMenuItemToBeHover(anothorItem, true);
});

test('Pointer press and leave a menu item', () => {
  utils.renderMenu();
  utils.clickMenuButton();

  const menuItem = utils.queryMenuItem('Middle');
  fireEvent.mouseEnter(menuItem);
  fireEvent.pointerDown(menuItem);
  fireEvent.mouseLeave(menuItem);
  fireEvent.pointerLeave(menuItem);
  utils.expectMenuItemToBeHover(menuItem, false);
  utils.expectMenuItemToBeActive(menuItem, false);
  expect(menuItem).toHaveFocus();

  // Subsequent key pressing is ignored
  fireEvent.keyDown(menuItem, { key: 'Enter' });
  utils.expectMenuItemToBeHover(menuItem, false);
  utils.expectMenuItemToBeActive(menuItem, false);
});

test('keyDown on one item and keyUp on another will not trigger click event', () => {
  const onItemClick = jest.fn();
  utils.renderMenu({ onItemClick }, { value: 'Middle' });
  utils.clickMenuButton();

  const menuItem = utils.queryMenuItem('First');
  fireEvent.mouseEnter(menuItem);
  fireEvent.keyDown(menuItem, { key: 'Enter' });
  utils.expectMenuItemToBeHover(menuItem, true);
  utils.expectMenuItemToBeActive(menuItem, true);

  // Move to next item without releasing 'Enter' key
  fireEvent.keyDown(menuItem, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(menuItem, false);
  utils.expectMenuItemToBeActive(menuItem, false);

  const anothorItem = utils.queryMenuItem('Middle');
  utils.expectMenuItemToBeHover(anothorItem, true);
  utils.expectMenuItemToBeActive(anothorItem, false);
  expect(anothorItem).toHaveFocus();

  // Releasing 'Enter' key on this item will not trigger click event
  fireEvent.keyUp(anothorItem, { key: 'Enter' });
  utils.expectMenuItemToBeHover(anothorItem, true);
  expect(onItemClick).not.toHaveBeenCalled();

  fireEvent.keyDown(anothorItem, { key: 'Enter' });
  fireEvent.keyUp(anothorItem, { key: 'Enter' });
  expect(onItemClick).toHaveBeenLastCalledWith(utils.clickEvent({ key: 'Enter', value: 'Middle' }));
});

test('MenuItem keeps hover and active states after focusing something inside it', () => {
  utils.renderMenu(undefined, { children: <button>Click</button> });
  utils.clickMenuButton();

  const menuItem = utils.queryMenuItem('Click');
  fireEvent.mouseEnter(menuItem);
  fireEvent.pointerDown(menuItem);
  expect(menuItem).toHaveFocus();
  utils.expectMenuItemToBeHover(menuItem, true);
  utils.expectMenuItemToBeActive(menuItem, true);

  queryByRole('button', { name: 'Click' }).focus();
  expect(menuItem).not.toHaveFocus();
  utils.expectMenuItemToBeHover(menuItem, true);
  utils.expectMenuItemToBeActive(menuItem, true);
});

test('Disabled menu item', () => {
  const onClick = jest.fn();
  utils.renderMenu({ onClick }, { disabled: true });
  utils.clickMenuButton();

  const disabledItem = utils.queryMenuItem('Middle');
  utils.expectToBeDisabled(disabledItem, true);
  fireEvent.mouseEnter(disabledItem);
  fireEvent.pointerDown(disabledItem);
  utils.expectMenuItemToBeHover(disabledItem, false);
  utils.expectMenuItemToBeActive(disabledItem, false);
  fireEvent.mouseEnter(disabledItem);
  expect(onClick).not.toHaveBeenCalled();
  utils.expectMenuToBeOpen(true);

  const menuItem = utils.queryMenuItem('First');
  utils.expectToBeDisabled(menuItem, false);
  utils.expectMenuItemToBeChecked(menuItem);
  fireEvent.mouseEnter(menuItem);
  utils.expectMenuItemToBeHover(menuItem, true);

  // Menu item loses hover state when losing focus
  utils.queryMenu().focus();
  utils.expectMenuItemToBeHover(menuItem, false);
});

test('Children of MenuItem is a function', () => {
  const renderFn = jest.fn();
  utils.renderMenu(null, { children: renderFn });
  utils.clickMenuButton();

  fireEvent.keyDown(utils.queryMenu(), { key: 'ArrowDown' });
  fireEvent.keyDown(utils.queryMenu(), { key: 'ArrowDown' });
  expect(renderFn).toHaveBeenLastCalledWith(expect.objectContaining({ hover: true }));
  fireEvent.keyDown(utils.queryMenu(), { key: 'ArrowDown' });
  expect(renderFn).toHaveBeenCalledTimes(3);
});

test('Additional props are forwarded to MenuItem', () => {
  const onMouseEnter = jest.fn();
  const onKeyDown = jest.fn();
  utils.renderMenu(null, {
    ['aria-label']: 'test',
    randomattr: 'random',
    onMouseEnter,
    onKeyDown
  });
  utils.clickMenuButton();

  const menuItem = screen.queryByText('Middle');
  expect(menuItem).toHaveAttribute('aria-label', 'test');
  expect(menuItem).toHaveAttribute('randomattr', 'random');
  fireEvent.mouseEnter(menuItem);
  expect(onMouseEnter).toHaveBeenCalledTimes(1);
  fireEvent.keyDown(menuItem, { key: 'Enter' });
  expect(onKeyDown).toHaveBeenCalledTimes(1);
});

test('Test FocusableItem', () => {
  const renderFn = jest.fn();
  const itemRef = React.createRef();
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

  expect(itemRef.current).toBe(null);
  utils.clickMenuButton({ name: 'Menu' });
  expect(itemRef.current).toHaveClass('szh-menu__item--focusable');
  utils.expectMenuToBeOpen(true);
  expect(renderFn).toHaveBeenLastCalledWith(false);

  const button = queryByRole('button', { name: 'Close' });
  fireEvent.mouseEnter(button);
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
  expect(renderFn).toHaveBeenCalledTimes(4);

  fireEvent.click(button);
  utils.expectMenuToBeOpen(false);
});
