import React from 'react';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuButton } from '../MenuButton';
import { MenuRadioGroup } from '../MenuRadioGroup';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime.js';
import * as utils from './utils';

const { queryByRole, queryAllByRole } = screen;

test('Test radio items', () => {
    const onChange = jest.fn();
    const getMenu = value => (
        <Menu menuButton={<MenuButton>Color</MenuButton>}>
            <MenuRadioGroup value={value} name="color" onChange={onChange}>
                <MenuItem value="red">Red</MenuItem>
                <MenuItem value="green">Green</MenuItem>
                <MenuItem value="blue">Blue</MenuItem>
            </MenuRadioGroup>
        </Menu>
    );

    const { rerender } = render(getMenu('green'));
    utils.clickMenuButton();
    const menuItems = queryAllByRole('menuitemradio');
    expect(menuItems).toHaveLength(3);
    menuItems.forEach(item => expect(item).toHaveClass('rc-menu__item--type-radio'));
    utils.expectMenuItemToBeChecked(queryByRole('menuitemradio', { name: 'Green' }), true);

    fireEvent.click(queryByRole('menuitemradio', { name: 'Blue' }));
    expect(onChange).toHaveBeenLastCalledWith({ name: 'color', value: 'blue' });
    rerender(getMenu('blue'));
    utils.expectMenuItemToBeChecked(queryByRole('menuitemradio', { name: 'Blue' }), true);
    utils.expectMenuItemToBeChecked(queryByRole('menuitemradio', { name: 'Green' }), false);
    utils.expectMenuToBeOpen(false);
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
