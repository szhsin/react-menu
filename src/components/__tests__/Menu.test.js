import { screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime.js';
import * as utils from './utils';

const { queryByRole, queryAllByRole } = screen;

test.each([false, true])(
    'Menu is unmounted before opening and closes after losing focus (portal = %s)',
    async (portal) => {
        utils.renderMenu({ portal });

        // menu is unmounted
        utils.expectButtonToBeExpanded(false);
        utils.expectMenuToBeInTheDocument(false);
        expect(queryByRole('menuitem')).not.toBeInTheDocument();

        // Click the menu button, menu is expected to mount and open, and get focus
        utils.clickMenuButton();
        utils.expectButtonToBeExpanded(true);
        utils.expectMenuToBeOpen(true);
        expect(utils.queryMenu()).toHaveAttribute('aria-label', 'Open');
        await waitFor(() => expect(utils.queryMenu()).toHaveFocus());
        const menuItems = queryAllByRole('menuitem');
        expect(menuItems).toHaveLength(3);
        menuItems.forEach(item => utils.expectMenuItemToBeHover(item, false));

        // focus something outside menu, expecting menu to close but keep mounted
        queryByRole('button').focus();
        utils.expectButtonToBeExpanded(false);
        utils.expectMenuToBeOpen(false);
    });

test.each([false, true])(
    'Menu is removed from DOM after closing when keepMounted is false (portal = %s)',
    async (portal) => {
        utils.renderMenu({ portal, keepMounted: false });
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
    expect(onItemClick).toHaveBeenLastCalledWith({ value: menuItemText, checked: false });
    expect(onClick).toHaveBeenLastCalledWith({ value: menuItemText, checked: false });
    expect(onChange).toHaveBeenLastCalledWith({ open: false });
    expect(onChange).toHaveBeenCalledTimes(2);

    // menu closes after clicking a menu item
    utils.expectButtonToBeExpanded(false);
    utils.expectMenuToBeOpen(false);
});

test.each([false, true])(
    'Open and close menu with keyboard (portal = %s)',
    async (portal) => {
        utils.renderMenu({ portal });
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

test('Additional props are forwarded to Menu', () => {
    const onMouseEnter = jest.fn();
    const onKeyDown = jest.fn();
    utils.renderMenu({
        ['aria-label']: 'test',
        ['aria-haspopup']: true,
        randomattr: 'random',
        onMouseEnter,
        onKeyDown
    });
    utils.clickMenuButton();

    const menu = utils.queryMenu()
    expect(menu).toHaveAttribute('aria-label', 'test');
    expect(menu).toHaveAttribute('aria-haspopup', 'true');
    expect(menu).toHaveAttribute('randomattr', 'random');
    fireEvent.mouseEnter(menu);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    fireEvent.keyDown(menu, { key: 'ArrowDown' });
    expect(onKeyDown).toHaveBeenCalledTimes(1);
});

test('Portal will render Menu into document.body', () => {
    const { container } = utils.renderMenu({ portal: true });
    utils.clickMenuButton();

    expect(container.querySelector('.rc-menu-container')).toBe(null);
    expect(container.querySelector('.rc-menu')).toBe(null);
    expect(document.querySelector('.rc-menu-container')).toBeInTheDocument();
    utils.expectMenuToBeInTheDocument(true);
});

test('Use keepOpen of onClick to customise when menu is closed', () => {
    utils.renderMenu({
        onClick: e => e.keepOpen = true
    }, {
        onClick: e => e.keepOpen = false
    });
    utils.clickMenuButton();

    utils.expectMenuToBeOpen(true);
    fireEvent.click(utils.queryMenuItem('Middle'));
    utils.expectMenuToBeOpen(false);

    utils.clickMenuButton();
    utils.expectMenuToBeOpen(true);
    fireEvent.click(utils.queryMenuItem('First'));
    utils.expectMenuToBeOpen(true);
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
