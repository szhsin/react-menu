import React from 'react';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuButton } from '../MenuButton';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime.js';
import * as utils from './utils';

const { queryByRole, queryAllByRole } = screen;

const renderMenu = (props, itemProps) => render(
    <Menu menuButton={<MenuButton>Menu</MenuButton>} animation={false} {...props}>
        <MenuItem>First</MenuItem>
        <MenuItem children="Middle" {...itemProps} />
        <MenuItem>Last</MenuItem>
    </Menu>
);

test('Menu is unmounted before opening and closes after losing focus', async () => {
    renderMenu();

    // menu is unmounted
    utils.expectButtonToBeExpanded(false);
    utils.expectMenuToBeInTheDocument(false);
    expect(queryByRole('menuitem')).not.toBeInTheDocument();

    // Click the menu button, menu is expected to mount and open, and get focus
    utils.clickMenuButton();
    utils.expectButtonToBeExpanded(true);
    utils.expectMenuToBeOpen(true);
    await waitFor(() => expect(utils.queryMenu()).toHaveFocus());
    const menuItems = queryAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);
    menuItems.forEach(item => utils.expectMenuItemToBeHover(item, false));

    // focus something outside menu, expecting menu to close but keep mounted
    queryByRole('button').focus();
    utils.expectButtonToBeExpanded(false);
    utils.expectMenuToBeOpen(false);
});

test('Menu is removed from DOM after closing when keepMounted is false', async () => {
    renderMenu({ keepMounted: false });
    utils.expectMenuToBeInTheDocument(false);

    utils.clickMenuButton();
    utils.expectMenuToBeInTheDocument(true);
    await waitFor(() => expect(utils.queryMenu()).toHaveFocus());

    queryByRole('button').focus();
    utils.expectMenuToBeInTheDocument(false);
});

test('Clicking a menu item fires onClick event and closes the menu', () => {
    const menuItemText = 'Save';
    const onClick = jest.fn();
    const onChange = jest.fn();
    const onItemClick = jest.fn();
    renderMenu({ onClick, onChange }, {
        children: menuItemText,
        value: menuItemText,
        onClick: onItemClick
    });

    // Open menu and click a menu item, expecting onClick to fire on the menu item and menu
    utils.clickMenuButton();
    expect(onChange).toHaveBeenLastCalledWith({ open: true });

    fireEvent.click(utils.queryMenuItem(menuItemText));
    expect(onItemClick).toHaveBeenLastCalledWith({ value: menuItemText });
    expect(onClick).toHaveBeenLastCalledWith({ value: menuItemText });
    expect(onChange).toHaveBeenLastCalledWith({ open: false });
    expect(onChange).toHaveBeenCalledTimes(2);

    // menu closes after clicking a menu item
    utils.expectButtonToBeExpanded(false);
    utils.expectMenuToBeOpen(false);
});

test('Hover and press a menu item', () => {
    renderMenu();
    utils.clickMenuButton();

    // hover and press a menu item
    const menuItem = utils.queryMenuItem('Middle');
    fireEvent.mouseEnter(menuItem);
    fireEvent.pointerDown(menuItem, { target: { setPointerCapture: jest.fn() } });
    utils.expectMenuItemToBeHover(menuItem, true);
    utils.expectMenuItemToBeActive(menuItem, true);
    expect(menuItem).toHaveAttribute('tabindex', '0');
    expect(menuItem).toHaveFocus();

    // unhover and release pressing a menu item
    fireEvent.mouseLeave(menuItem);
    fireEvent.lostPointerCapture(menuItem);
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

test('Open and close menu with keyboard', async () => {
    renderMenu();
    utils.clickMenuButton({ keyboard: true });
    const menuButton = queryByRole('button');

    const firstItem = utils.queryMenuItem('First');
    await waitFor(() => utils.expectMenuItemToBeHover(firstItem, true));
    fireEvent.keyDown(firstItem, { key: 'Escape' });
    utils.expectMenuToBeOpen(false);
    expect(menuButton).toHaveFocus();

    fireEvent.keyDown(menuButton, { key: 'ArrowUp' });
    const lastItem = utils.queryMenuItem('Last');
    await waitFor(() => utils.expectMenuItemToBeHover(lastItem, true));
    fireEvent.keyDown(lastItem, { key: 'Escape' });

    fireEvent.keyDown(menuButton, { key: 'ArrowDown' });
    await waitFor(() => utils.expectMenuItemToBeHover(firstItem, true));
});

test('Navigate with arrow keys', async () => {
    renderMenu();
    utils.clickMenuButton();
    const menu = utils.queryMenu();
    await waitFor(() => expect(menu).toHaveFocus());

    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    utils.expectMenuItemToBeHover(utils.queryMenuItem('Last'), true);
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    utils.expectMenuItemToBeHover(utils.queryMenuItem('Middle'), true);
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    utils.expectMenuItemToBeHover(utils.queryMenuItem('First'), true);
    fireEvent.keyDown(menu, { key: 'ArrowUp' });
    utils.expectMenuItemToBeHover(utils.queryMenuItem('Last'), true);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    utils.expectMenuItemToBeHover(utils.queryMenuItem('First'), true);
});

test.each([
    ['left', 'start', 'auto'],
    ['right', 'center', 'anchor'],
    ['top', 'end', 'initial'],
    ['bottom', 'center', 'anchor']
])('Menu direction: %s, align: %s, position: %s', (direction, align, position) => {
    const { container } = renderMenu({
        direction,
        align,
        position,
        animation: true,
        arrow: true,
        offsetX: 10,
        offsetY: -10,
        overflow: 'auto'
    });
    utils.clickMenuButton();
    expect(utils.queryMenu()).toHaveClass(`rc-menu--dir-${direction}`);
    expect(container.querySelector(`.rc-menu__arrow--dir-${direction}`)).toBeInTheDocument();
});
