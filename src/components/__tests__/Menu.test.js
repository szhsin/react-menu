import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime.js';
import * as utils from './utils';

const { queryByRole, queryAllByRole } = screen;

test('Menu is unmounted before opening and closes after losing focus', async () => {
    utils.renderMenu();

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
    utils.renderMenu({ keepMounted: false });
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
    utils.renderMenu({ onClick, onChange }, {
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

test('Open and close menu with keyboard', async () => {
    utils.renderMenu();
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
    utils.renderMenu();
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
    const { container } = utils.renderMenu({
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
