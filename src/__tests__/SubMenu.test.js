import React from 'react';
import { Menu } from '../components/Menu';
import { MenuItem } from '../components/MenuItem';
import { FocusableItem } from '../components/FocusableItem';
import { MenuButton } from '../components/MenuButton';
import { SubMenu } from '../components/SubMenu';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime.js';
import * as utils from './utils';

const renderMenu = (props, itemProps, submenuProps) => render(
    <Menu menuButton={<MenuButton>Menu</MenuButton>} animation={false} {...props}>
        <MenuItem>One</MenuItem>
        <SubMenu label="Submenu" {...submenuProps}>
            <MenuItem>First</MenuItem>
            <MenuItem children="Middle" {...itemProps} />
            <MenuItem>Last</MenuItem>
        </SubMenu>
        <MenuItem>Two</MenuItem>
    </Menu>
);

test('Open and close submenu, and activate submenu item with mouse and keyboard', async () => {
    const menuItemText = 'Save';
    const onClick = jest.fn();
    const onChange = jest.fn();
    const onItemClick = jest.fn();
    const { container } = renderMenu({ onClick }, {
        children: menuItemText,
        value: menuItemText,
        onClick: onItemClick
    }, { onChange });

    utils.clickMenuButton();
    const menuOptions = { name: 'Menu', container };
    const submenuOptions = { name: 'Submenu', container };
    const submenuItem = utils.queryMenuItem('Submenu');

    // Open submenu with click event
    utils.expectMenuToBeInTheDocument(false, submenuOptions);
    utils.expectToBeDisabled(submenuItem, false);
    fireEvent.click(submenuItem);
    utils.expectMenuToBeOpen(true, submenuOptions);
    expect(onChange).toHaveBeenLastCalledWith({ open: true });
    await waitFor(() => expect(utils.queryMenu(submenuOptions)).toHaveFocus());

    // Hovering an item in the parent menu list will close submenu
    fireEvent.mouseEnter(utils.queryMenuItem('One'));
    await waitFor(() => utils.expectMenuToBeOpen(false, submenuOptions));
    expect(onChange).toHaveBeenLastCalledWith({ open: false });
    expect(utils.queryMenuItem('One')).toHaveFocus();

    // Open submenu with mouse enter event
    fireEvent.mouseEnter(submenuItem);
    await waitFor(() => utils.expectMenuToBeOpen(true, submenuOptions));
    await waitFor(() => expect(utils.queryMenu(submenuOptions)).toHaveFocus());
    fireEvent.mouseEnter(utils.queryMenuItem('One'));

    // Mouse enter and leave submenu item in short succession will not open submenu
    fireEvent.mouseEnter(submenuItem);
    fireEvent.mouseLeave(submenuItem);
    await waitFor(() => new Promise(resolve => setTimeout(resolve, 500)));
    utils.expectMenuToBeOpen(false, submenuOptions);

    // Open submenu with right arrow key
    fireEvent.mouseEnter(submenuItem);
    utils.expectMenuItemToBeHover(submenuItem, true);
    expect(submenuItem).toHaveFocus();
    fireEvent.keyDown(submenuItem, { key: 'ArrowRight' });
    utils.expectMenuItemToBeActive(submenuItem, true);
    fireEvent.keyUp(submenuItem, { key: 'ArrowRight' });
    utils.expectMenuItemToBeActive(submenuItem, false);
    utils.expectMenuToBeOpen(true, submenuOptions);
    await waitFor(() => utils.expectMenuItemToBeHover(utils.queryMenuItem('First'), true));
    utils.expectMenuItemToBeHover(submenuItem, true);

    // Close submenu with left arrow key
    fireEvent.keyDown(utils.queryMenu(submenuOptions), { key: 'ArrowLeft' });
    utils.expectMenuToBeOpen(false, submenuOptions);

    // Open submenu with enter key
    expect(submenuItem).toHaveFocus();
    fireEvent.keyDown(submenuItem, { key: 'Enter' });
    fireEvent.keyUp(submenuItem, { key: 'Enter' });
    utils.expectMenuToBeOpen(true, submenuOptions);
    await waitFor(() => expect(utils.queryMenuItem('First')).toHaveFocus());

    // Close menu with ESC key
    fireEvent.keyDown(utils.queryMenuItem('First'), { key: 'Escape' });
    utils.expectMenuToBeOpen(false, submenuOptions);
    utils.expectMenuToBeOpen(false, menuOptions);

    // Open submenu
    utils.clickMenuButton();
    fireEvent.mouseEnter(submenuItem);
    await waitFor(() => expect(utils.queryMenu(submenuOptions)).toHaveFocus());
    utils.expectMenuItemToBeHover(submenuItem, true);
    utils.expectMenuToBeOpen(true, submenuOptions);
    // When submenu item receives focus, submenu is closed
    submenuItem.focus();
    utils.expectMenuItemToBeHover(submenuItem, true);
    utils.expectMenuToBeOpen(false, submenuOptions);

    fireEvent.click(submenuItem);
    await waitFor(() => expect(utils.queryMenu(submenuOptions)).toHaveFocus());
    // When something outside submenu item receives focus, 
    // submenu is closed and submenu item loses hover state
    utils.queryMenu(menuOptions).focus();
    utils.expectMenuItemToBeHover(submenuItem, false);
    utils.expectMenuToBeOpen(false, submenuOptions);

    // Open submenu and click a menu item, expecting onClick to fire on the menu item and root menu
    utils.clickMenuButton();
    fireEvent.click(submenuItem);
    fireEvent.click(utils.queryMenuItem(menuItemText));
    expect(onItemClick).toHaveBeenLastCalledWith({ value: menuItemText, checked: false });
    expect(onClick).toHaveBeenLastCalledWith({ value: menuItemText, checked: false });
    utils.expectMenuToBeOpen(false, menuOptions);

    // Activate submenu item with space key
    utils.clickMenuButton();
    fireEvent.click(submenuItem);
    await waitFor(() => expect(utils.queryMenu(submenuOptions)).toHaveFocus());
    fireEvent.keyDown(utils.queryMenu(submenuOptions), { key: 'ArrowDown' });
    fireEvent.keyDown(utils.queryMenu(submenuOptions), { key: 'ArrowDown' });
    fireEvent.keyDown(utils.queryMenuItem(menuItemText), { key: ' ' });
    fireEvent.keyUp(utils.queryMenuItem(menuItemText), { key: ' ' });
    expect(onItemClick).toHaveBeenLastCalledWith({ value: menuItemText, key: ' ', checked: false });
    expect(onClick).toHaveBeenLastCalledWith({ value: menuItemText, key: ' ', checked: false });
    utils.expectMenuToBeOpen(false, menuOptions);
});

test('Delay closing submenu when hovering items in parent menu list', async () => {
    const { container } = render(
        <Menu menuButton={<MenuButton>Menu</MenuButton>} animation={false}>
            <MenuItem disabled>Disabled</MenuItem>
            <SubMenu label="Submenu1">
                <MenuItem>1</MenuItem>
                <MenuItem>2</MenuItem>
            </SubMenu>
            <SubMenu label="Submenu2">
                <MenuItem>3</MenuItem>
                <MenuItem>4</MenuItem>
            </SubMenu>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <FocusableItem>
                {({ ref }) => <input ref={ref} type="text" />}
            </FocusableItem>
        </Menu>
    );

    const submenuOptions1 = { name: 'Submenu1', container };
    const submenuOptions2 = { name: 'Submenu2', container };
    utils.clickMenuButton();
    fireEvent.click(utils.queryMenuItem('Submenu1'));
    utils.expectMenuToBeOpen(true, submenuOptions1);

    const quickEnterLeave = async (item) => {
        fireEvent.mouseEnter(item);
        await waitFor(() => new Promise(resolve => setTimeout(resolve, 100)));
        fireEvent.mouseLeave(item);
        utils.expectMenuToBeOpen(true, submenuOptions1);
    }

    await quickEnterLeave(utils.queryMenuItem('Submenu2'));
    await quickEnterLeave(utils.queryMenuItem('Two'));
    await quickEnterLeave(container.querySelector('.rc-menu__item--focusable'));

    fireEvent.mouseEnter(utils.queryMenuItem('Disabled'));
    await waitFor(() => new Promise(resolve => setTimeout(resolve, 500)));
    utils.expectMenuToBeOpen(true, submenuOptions1);

    fireEvent.mouseEnter(utils.queryMenuItem('Submenu2'));
    await waitFor(() => utils.expectMenuToBeOpen(true, submenuOptions2));
    utils.expectMenuToBeOpen(false, submenuOptions1);
});

test('Submenu is disabled', () => {
    const { container } = renderMenu(null, null, { disabled: true });
    utils.clickMenuButton();
    const submenuItem = utils.queryMenuItem('Submenu');

    expect(submenuItem).toHaveClass('rc-menu__item--disabled');
    utils.expectToBeDisabled(submenuItem, true);
    fireEvent.click(submenuItem);
    utils.expectMenuToBeInTheDocument(false, { name: 'Submenu', container });

    // Disabled item is skipped in keyboard navigation
    fireEvent.keyDown(utils.queryMenu(), { key: 'ArrowDown' });
    utils.expectMenuItemToBeHover(utils.queryMenuItem('One'), true);
    fireEvent.keyDown(utils.queryMenu(), { key: 'ArrowDown' });
    utils.expectMenuItemToBeHover(utils.queryMenuItem('Two'), true);
    utils.expectMenuItemToBeHover(submenuItem, false);
});
