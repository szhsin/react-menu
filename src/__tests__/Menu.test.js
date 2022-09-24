import { screen, fireEvent, waitFor, act } from '@testing-library/react';
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
    utils.expectMenuToHaveState('opening', false);
    utils.expectMenuToBeOpen(true);
    expect(utils.queryMenu()).toHaveAttribute('aria-label', 'Open');
    await waitFor(() => utils.expectMenuToHaveFocus());
    const menuItems = queryAllByRole('menuitem');
    expect(menuItems).toHaveLength(3);
    menuItems.forEach((item) => utils.expectMenuItemToBeHover(item, false));

    // focus something outside menu, expecting menu to close but keep mounted
    act(() => queryByRole('button').focus());
    utils.expectButtonToBeExpanded(false);
    utils.expectMenuToHaveState('closing', false);
    utils.expectMenuToBeOpen(false);
  }
);

test.each([false, true])(
  'Menu moves through different states when transition is true (portal = %s)',
  async (portal) => {
    utils.renderMenu({ portal, transition: true, transitionTimeout: 20 });
    utils.clickMenuButton();
    utils.expectMenuToHaveState('opening', true);
    await waitFor(() => utils.expectMenuToHaveFocus());
    utils.expectMenuToHaveState('opening', false);
    utils.expectMenuToHaveState('open', true);

    act(() => queryByRole('button').focus());
    utils.expectMenuToHaveState('closing', true);
    await waitFor(() => utils.expectMenuToHaveState('closed', true));
    utils.expectMenuToHaveState('closing', false);
  }
);

test.each([false, true])(
  'Menu is removed from DOM after closing when unmountOnClose is true (portal = %s)',
  async (portal) => {
    utils.renderMenu({ portal, unmountOnClose: true });
    utils.expectMenuToBeInTheDocument(false);

    utils.clickMenuButton();
    utils.expectMenuToBeInTheDocument(true);
    await waitFor(() => utils.expectMenuToHaveFocus());

    act(() => queryByRole('button').focus());
    utils.expectMenuToBeInTheDocument(false);
  }
);

test('Menu is in the DOM before first opening when initialMounted is true', () => {
  utils.renderMenu({ initialMounted: true });
  utils.expectMenuToBeInTheDocument(true);
  utils.expectMenuToHaveState('closed', true);
});

test('Clicking a menu item fires onClick event and closes the menu', () => {
  const menuItemText = 'Save';
  const onClick = jest.fn();
  const onChange = jest.fn();
  const onItemClick = jest.fn();
  utils.renderMenu(
    { onItemClick, onMenuChange: onChange },
    {
      children: menuItemText,
      value: menuItemText,
      onClick
    }
  );

  // Open menu and click a menu item, expecting onClick to fire on the menu item and menu
  utils.clickMenuButton();
  expect(onChange).toHaveBeenLastCalledWith({ open: true });

  fireEvent.click(utils.queryMenuItem(menuItemText));
  expect(onClick).toHaveBeenLastCalledWith(utils.clickEvent({ value: menuItemText }));
  expect(onItemClick).toHaveBeenLastCalledWith(utils.clickEvent({ value: menuItemText }));
  expect(onChange).toHaveBeenLastCalledWith({ open: false });
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onItemClick).toHaveBeenCalledTimes(1);

  // menu closes after clicking a menu item
  utils.expectButtonToBeExpanded(false);
  utils.expectMenuToBeOpen(false);

  // onClick stopPropagation skips subsequent onItemClick
  onClick.mockImplementationOnce((e) => (e.stopPropagation = true));
  utils.clickMenuButton();
  fireEvent.click(utils.queryMenuItem(menuItemText));
  expect(onClick).toHaveBeenLastCalledWith(
    utils.clickEvent({ value: menuItemText, stopPropagation: true })
  );
  expect(onClick).toHaveBeenCalledTimes(2);
  expect(onItemClick).toHaveBeenCalledTimes(1);
  expect(onChange).toHaveBeenCalledTimes(4);
});

test.each([false, true])('Open and close menu with keyboard (portal = %s)', async (portal) => {
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
  await waitFor(() => utils.expectMenuToHaveFocus());

  const menu = utils.queryMenu();
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
  const onPointerMove = jest.fn();
  const onKeyDown = jest.fn();
  utils.renderMenu({
    ['aria-label']: 'test',
    ['aria-haspopup']: true,
    randomattr: 'random',
    onPointerMove,
    onKeyDown,
    containerProps: {
      'data-testid': 'container',
      id: 'menu-container',
      style: { color: 'blue' },
      onPointerMove,
      onKeyDown
    }
  });
  utils.clickMenuButton();

  expect(screen.getByText('Some texts')).toHaveClass('some-class');

  const container = screen.getByTestId('container');
  expect(container).toHaveAttribute('id', 'menu-container');
  expect(container).toHaveStyle({ color: 'blue', position: 'relative' });

  const menu = utils.queryMenu();
  expect(menu).toHaveAttribute('aria-label', 'test');
  expect(menu).toHaveAttribute('aria-haspopup', 'true');
  expect(menu).toHaveAttribute('randomattr', 'random');
  fireEvent.pointerMove(menu);
  expect(onPointerMove).toHaveBeenCalledTimes(2);
  fireEvent.keyDown(menu, { key: 'm' });
  expect(onKeyDown).toHaveBeenCalledTimes(2);
  expect(onKeyDown).toHaveBeenLastCalledWith(expect.objectContaining({ key: 'm' }));
});

test('Portal will render Menu into document.body', () => {
  const { container } = utils.renderMenu({ portal: true });
  utils.clickMenuButton();

  expect(container.querySelector('.szh-menu-container')).toBeNull();
  expect(container.querySelector('.szh-menu')).toBeNull();
  expect(document.querySelector('.szh-menu-container')).toBeInTheDocument();
  utils.expectMenuToBeInTheDocument(true);
});

test('Use keepOpen of onClick to customise when menu is closed', () => {
  utils.renderMenu(
    {
      onItemClick: (e) => (e.keepOpen = true)
    },
    {
      onClick: (e) => (e.stopPropagation = true)
    }
  );
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
    transition: { open: true, close: true },
    arrow: true,
    offsetX: 10,
    offsetY: -10,
    overflow: 'auto'
  });
  utils.clickMenuButton();
  expect(utils.queryMenu()).toHaveClass(`szh-menu--dir-${direction}`);
  expect(container.querySelector(`.szh-menu__arrow--dir-${direction}`)).toBeInTheDocument();
});
