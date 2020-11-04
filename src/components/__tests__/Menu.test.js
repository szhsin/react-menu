import React from 'react';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuButton } from '../MenuButton';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime.js';

const renderMenu = (props, itemProps = { children: 'Save' }) => render(
    <Menu menuButton={<MenuButton>open</MenuButton>} animation={false} {...props}>
        <MenuItem>New</MenuItem>
        <MenuItem {...itemProps} />
        <MenuItem>Close</MenuItem>
    </Menu>
);

test('test menu', async () => {
    const onClick = jest.fn();
    const onSaveClick = jest.fn();
    const { queryByRole, queryAllByRole } = renderMenu({ onClick }, {
        children: 'Save',
        value: 'save',
        onClick: onSaveClick
    });

    // menu is unmounted
    const menuButton = queryByRole('button');
    expect(menuButton).toBeInTheDocument();
    expect(queryByRole('menu')).not.toBeInTheDocument();
    expect(queryByRole('menuitem')).not.toBeInTheDocument();

    // Click the menu button, menu is expected to mount and open, and get focus
    fireEvent.click(menuButton, { detail: 1 });
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(queryByRole('menu')).toHaveClass('rc-menu--open');
    await waitFor(() => expect(queryByRole('menu')).toHaveFocus());
    const menuItems = queryAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);
    menuItems.forEach(
        item => expect(item).not.toHaveClass('rc-menu__item--hover')
    );

    // hover and press a menu item
    let menuItem = queryByRole('menuitem', { name: 'Save' });
    fireEvent.mouseEnter(menuItem);
    fireEvent.pointerDown(menuItem, { target: { setPointerCapture: jest.fn() } });
    expect(menuItem).toHaveClass('rc-menu__item--hover');
    expect(menuItem).toHaveClass('rc-menu__item--active');
    expect(menuItem).toHaveAttribute('tabindex', '0');
    expect(menuItem).toHaveFocus();

    // unhover and release pressing a menu item
    fireEvent.mouseLeave(menuItem);
    fireEvent.lostPointerCapture(menuItem);
    expect(menuItem).not.toHaveClass('rc-menu__item--hover');
    expect(menuItem).not.toHaveClass('rc-menu__item--active');
    expect(menuItem).toHaveAttribute('tabindex', '-1');
    expect(menuItem).toHaveFocus();

    // click a menu item, expecting onClick fires on the menu item and menu
    fireEvent.click(menuItem);
    expect(onSaveClick).toHaveBeenCalledWith({ value: 'save' });
    expect(onClick).toHaveBeenCalledWith({ value: 'save' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(queryByRole('menu')).not.toHaveClass('rc-menu--open');

    // press ArrowDown key on menu button, expecting menu opens and first menu item get focus
    menuButton.focus();
    fireEvent.keyDown(menuButton, { key: 'ArrowDown' });
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(queryByRole('menu')).toHaveClass('rc-menu--open');
    menuItem = queryByRole('menuitem', { name: 'New' });
    await waitFor(() => expect(menuItem).toHaveFocus());
    expect(menuItem).toHaveClass('rc-menu__item--hover');

    // focus something out of menu, expecting menu to close but keep mounted
    menuButton.focus();
    expect(queryByRole('menu')).not.toHaveClass('rc-menu--open');
});

test('menu is unmounted after closing', async () => {
    const { queryByRole } = renderMenu({ keepMounted: false });
    expect(queryByRole('menu')).not.toBeInTheDocument();

    fireEvent.click(queryByRole('button'));
    expect(queryByRole('menu')).toBeInTheDocument();
    await waitFor(() => expect(queryByRole('menu')).toHaveFocus());

    queryByRole('button').focus();
    expect(queryByRole('menu')).not.toBeInTheDocument();
});
