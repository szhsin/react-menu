import React from 'react';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { FocusableItem } from '../FocusableItem';
import { MenuHeader } from '../MenuHeader';
import { MenuDivider } from '../MenuDivider';
import { MenuButton } from '../MenuButton';
import { MenuRadioGroup } from '../MenuRadioGroup';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as utils from './utils';

const { queryByRole, queryAllByRole } = screen;
const LastItem = utils.LastItem;

test('Test radio items', () => {
    const onChange = jest.fn();
    const getMenu = value => (
        <Menu menuButton={<MenuButton>Color</MenuButton>}>
            <MenuRadioGroup value={value} name="color" onChange={onChange}>
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
    menuItems.forEach(item => expect(item).toHaveClass('rc-menu__item--type-radio'));
    utils.expectMenuItemToBeChecked(queryByRole('menuitemradio', { name: 'Green' }), true);

    fireEvent.click(queryByRole('menuitemradio', { name: 'Blue' }));
    expect(onChange).toHaveBeenLastCalledWith({ name: 'color', value: 'blue' });
    rerender(getMenu('blue'));
    utils.expectMenuItemToBeChecked(queryByRole('menuitemradio', { name: 'Blue' }), true);
    utils.expectMenuItemToBeChecked(queryByRole('menuitemradio', { name: 'Green' }), false);
    utils.expectMenuToBeOpen(false);
});

test('Use keepOpen of onChange to customise when menu is closed', () => {
    render(
        <Menu menuButton={<MenuButton>Color</MenuButton>}>
            <MenuRadioGroup value="green"
                onChange={e => e.keepOpen = true}>
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
    const onClick = jest.fn();
    const getMenu = isBold => (
        <Menu menuButton={<MenuButton>Text style</MenuButton>}>
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
    menuItems.forEach(item => expect(item).toHaveClass('rc-menu__item--type-checkbox'));
    utils.expectMenuItemToBeChecked(queryByRole('menuitemcheckbox', { name: 'Bold' }), true);
    utils.expectMenuItemToBeChecked(queryByRole('menuitemcheckbox', { name: 'Italic' }), false);

    fireEvent.click(queryByRole('menuitemcheckbox', { name: 'Bold' }));
    expect(onClick).toHaveBeenLastCalledWith({ checked: false });
    rerender(getMenu(false));
    utils.expectMenuItemToBeChecked(queryByRole('menuitemcheckbox', { name: 'Bold' }), false);
    utils.expectMenuToBeOpen(false);
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
    const onClick = jest.fn();
    utils.renderMenu({ onClick }, { value: 'Middle' });
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
    expect(onClick).not.toHaveBeenCalled();

    fireEvent.keyDown(anothorItem, { key: 'Enter' });
    fireEvent.keyUp(anothorItem, { key: 'Enter' });
    expect(onClick).toHaveBeenLastCalledWith({ key: 'Enter', value: 'Middle', checked: false })
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
    render(
        <Menu menuButton={<MenuButton>Menu</MenuButton>}>
            <FocusableItem>
                {({ ref, hover, closeMenu }) => (
                    <button ref={ref}
                        className={hover ? 'hover' : undefined}
                        onClick={() => closeMenu()}>
                        Close
                    </button>
                )}
            </FocusableItem>
            <MenuDivider />
            <MenuHeader>Header</MenuHeader>
            <MenuItem>Last</MenuItem>
        </Menu>
    );

    utils.clickMenuButton({ name: 'Menu' });
    utils.expectMenuToBeOpen(true);

    const button = queryByRole('button', { name: 'Close' });
    fireEvent.mouseEnter(button);
    expect(button).toHaveFocus();
    expect(button).toHaveClass('hover');

    fireEvent.keyDown(button, { key: 'ArrowDown' });
    expect(button).not.toHaveFocus();
    expect(button).not.toHaveClass('hover');

    fireEvent.keyDown(utils.queryMenuItem('Last'), { key: 'ArrowUp' });
    expect(button).toHaveFocus();
    expect(button).toHaveClass('hover');

    fireEvent.click(button);
    utils.expectMenuToBeOpen(false);
});
