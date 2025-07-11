/* eslint-disable react/no-children-prop */
import { createRef, useState, useEffect } from 'react';
import { Menu, MenuItem, FocusableItem, MenuButton, SubMenu } from './entry';
import { fireEvent, waitFor, screen, act } from '@testing-library/react';
import { axe } from 'jest-axe';
import * as utils from './utils';

const { render } = utils;

const renderMenu = (props, itemProps, submenuProps, buttonProps) =>
  render(
    <Menu
      menuButton={<MenuButton {...buttonProps}>Menu</MenuButton>}
      submenuOpenDelay={90}
      {...props}
    >
      <MenuItem>One</MenuItem>
      <SubMenu label="Submenu" {...submenuProps}>
        <MenuItem>First</MenuItem>
        <MenuItem children="Middle" {...itemProps} />
        <MenuItem>Last</MenuItem>
      </SubMenu>
      <MenuItem>Two</MenuItem>
    </Menu>
  );

test('Open and close submenu with mouse', async () => {
  const onChange = jest.fn();
  renderMenu(null, null, { onMenuChange: onChange });
  utils.clickMenuButton();
  const submenuOptions = { name: 'Submenu' };
  const submenuItem = utils.queryMenuItem('Submenu');

  // Open submenu with click event
  utils.expectMenuToBeInTheDocument(false, submenuOptions);
  utils.expectToBeDisabled(submenuItem, false);
  fireEvent.click(submenuItem);
  utils.expectMenuItemToBeHover(submenuItem, true);
  utils.expectMenuToBeOpen(true, submenuOptions);
  expect(utils.queryMenu(submenuOptions)).toHaveClass('szh-menu--dir-right');
  expect(onChange).toHaveBeenLastCalledWith({ open: true });
  expect(screen.getAllByRole('menuitem')).toHaveLength(6);
  await waitFor(() => utils.expectMenuToHaveFocus(submenuOptions));

  // Hovering an item in the parent menu list will close submenu
  fireEvent.pointerMove(utils.queryMenuItem('One'));
  await waitFor(() => utils.expectMenuToBeOpen(false, submenuOptions));
  await waitFor(() => expect(onChange).toHaveBeenLastCalledWith({ open: false }));
  expect(utils.queryMenuItem('One')).toHaveFocus();

  // Mouse enter and leave submenu item in short succession will not open submenu
  fireEvent.pointerMove(submenuItem);
  await utils.delayFor(60);
  fireEvent.pointerLeave(submenuItem);
  await utils.delayFor(400);
  utils.expectMenuToBeOpen(false, submenuOptions);

  // Open submenu with mouse enter event
  fireEvent.pointerMove(submenuItem);
  utils.expectMenuItemToBeHover(submenuItem, true);
  await waitFor(() => utils.expectMenuToBeOpen(true, submenuOptions));
  await waitFor(() => utils.expectMenuToHaveFocus(submenuOptions));

  // Click submenu item, submenu keeps open and hovered
  fireEvent.click(submenuItem);
  submenuItem.focus();
  await waitFor(() => utils.expectMenuToHaveFocus(submenuOptions));
  utils.expectMenuItemToBeHover(submenuItem, true);
  utils.expectMenuToBeOpen(true, submenuOptions);

  expect(onChange).toHaveBeenCalledTimes(3);
});

test('Open and close submenu with keyboard', async () => {
  const onChange = jest.fn();
  renderMenu(null, null, { onMenuChange: onChange });
  utils.clickMenuButton();
  const menuOptions = { name: 'Menu' };
  const submenuOptions = { name: 'Submenu' };
  const submenuItem = utils.queryMenuItem('Submenu');

  // Open submenu with right arrow key
  fireEvent.keyDown(submenuItem, { key: 'ArrowDown' });
  fireEvent.keyDown(submenuItem, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(submenuItem, true);
  fireEvent.keyDown(submenuItem, { key: 'ArrowRight' });
  utils.expectMenuToBeOpen(true, submenuOptions);
  await waitFor(() => utils.expectMenuItemToBeHover(utils.queryMenuItem('First'), true));
  utils.expectMenuItemToBeHover(submenuItem, true);

  // Close submenu with left arrow key
  fireEvent.keyDown(utils.queryMenu(submenuOptions), { key: 'ArrowLeft' });
  utils.expectMenuToBeOpen(false, submenuOptions);

  // Open submenu with enter key
  expect(submenuItem).toHaveFocus();
  fireEvent.keyDown(submenuItem, { key: 'Enter' });
  utils.expectMenuToBeOpen(true, submenuOptions);
  await waitFor(() => expect(utils.queryMenuItem('First')).toHaveFocus());

  // Close menu with ESC key
  fireEvent.keyDown(utils.queryMenuItem('First'), { key: 'Escape' });
  utils.expectMenuToBeOpen(false, submenuOptions);
  utils.expectMenuToBeOpen(false, menuOptions);

  expect(onChange).toHaveBeenCalledTimes(4);
});

test('onItemClick and onClick are fired when activating item with mouse or keyboard', async () => {
  const menuItemText = 'Save';
  const onClick = jest.fn();
  const onItemClick = jest.fn();
  renderMenu(
    { onItemClick },
    {
      children: menuItemText,
      value: menuItemText,
      onClick
    }
  );

  utils.clickMenuButton();
  const menuOptions = { name: 'Menu' };
  const submenuOptions = { name: 'Submenu' };
  const submenuItem = utils.queryMenuItem('Submenu');

  // Open submenu and click a menu item, expecting onClick to fire on the menu item and root menu
  fireEvent.click(submenuItem);
  fireEvent.click(utils.queryMenuItem(menuItemText));
  expect(onClick).toHaveBeenLastCalledWith(utils.clickEvent({ value: menuItemText }));
  expect(onItemClick).toHaveBeenLastCalledWith(utils.clickEvent({ value: menuItemText }));
  utils.expectMenuToBeOpen(false, menuOptions);

  // Activate submenu item with space key
  utils.clickMenuButton();
  fireEvent.click(submenuItem);
  await waitFor(() => utils.expectMenuToHaveFocus(submenuOptions));
  fireEvent.keyDown(utils.queryMenu(submenuOptions), { key: 'ArrowDown' });
  fireEvent.keyDown(utils.queryMenu(submenuOptions), { key: 'ArrowDown' });
  fireEvent.keyDown(utils.queryMenuItem(menuItemText), { key: ' ' });
  expect(onClick).toHaveBeenLastCalledWith(utils.clickEvent({ value: menuItemText, key: ' ' }));
  expect(onItemClick).toHaveBeenLastCalledWith(utils.clickEvent({ value: menuItemText, key: ' ' }));
  utils.expectMenuToBeOpen(false, menuOptions);
});

test('Delay closing submenu when hovering items in parent menu list', async () => {
  const submenuCloseDelay = 100;
  const { container } = render(
    <Menu menuButton={<MenuButton>Menu</MenuButton>} submenuCloseDelay={submenuCloseDelay}>
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
      <FocusableItem>{({ ref }) => <input ref={ref} type="text" />}</FocusableItem>
      <div data-testid="some-text">Some text</div>
    </Menu>
  );

  utils.clickMenuButton();
  const submenuOptions1 = { name: 'Submenu1' };
  const submenuOptions2 = { name: 'Submenu2' };
  const submenuItem1 = utils.queryMenuItem('Submenu1');

  fireEvent.click(submenuItem1);
  utils.expectMenuToBeOpen(true, submenuOptions1);

  const quickEnterLeave = async (item, delay = submenuCloseDelay - 25, beOpen = true) => {
    fireEvent.pointerMove(item);
    utils.expectMenuItemToBeMouseOver(item, true);
    await utils.delayFor(10);
    fireEvent.pointerMove(item);
    await utils.delayFor(delay - 10);
    fireEvent.pointerLeave(item);
    utils.expectMenuItemToBeMouseOver(item, false);
    await utils.delayFor(submenuCloseDelay - delay + 25);
    utils.expectMenuToBeOpen(beOpen, submenuOptions1);
  };

  await quickEnterLeave(utils.queryMenuItem('Disabled'));
  await quickEnterLeave(utils.queryMenuItem('Submenu2'));
  await quickEnterLeave(utils.queryMenuItem('Two'));
  await quickEnterLeave(container.querySelector('.szh-menu__item--focusable'));

  // submenu should stay open when mouse moves over parent menu and then re-enters the submenu
  fireEvent.pointerMove(screen.getByTestId('some-text'));
  fireEvent.pointerEnter(utils.queryMenu(submenuOptions1));
  await utils.delayFor(submenuCloseDelay + 50);
  utils.expectMenuToBeOpen(true, submenuOptions1);

  // moving over a disabled item closes the submenu
  fireEvent.pointerMove(utils.queryMenuItem('Disabled'));
  await waitFor(() => utils.expectMenuToBeOpen(false, submenuOptions1));

  // moving over a non-item element within menu closes the submenu
  fireEvent.click(submenuItem1);
  utils.expectMenuToBeOpen(true, submenuOptions1);
  fireEvent.pointerMove(screen.getByTestId('some-text'));
  await waitFor(() => utils.expectMenuToBeOpen(false, submenuOptions1));

  // moving over another submenu item closes the first submenu
  fireEvent.click(submenuItem1);
  utils.expectMenuToBeOpen(true, submenuOptions1);
  fireEvent.pointerMove(utils.queryMenuItem('Submenu2'));
  await waitFor(() => utils.expectMenuToBeOpen(true, submenuOptions2));
  utils.expectMenuToBeOpen(false, submenuOptions1);

  // clicking submenu item skips delay and open it immediately
  fireEvent.click(submenuItem1);
  utils.expectMenuItemToBeHover(submenuItem1, true);
  utils.expectMenuToBeOpen(true, submenuOptions1);
  utils.expectMenuToBeOpen(false, submenuOptions2);

  // hovering another item longer than submenuCloseDelay will close it
  await quickEnterLeave(utils.queryMenuItem('Two'), 120, false);

  // clicking another item skips delay and close submenu immediately
  fireEvent.click(submenuItem1);
  utils.expectMenuToBeOpen(true, submenuOptions1);
  fireEvent.pointerDown(utils.queryMenuItem('One'));
  utils.expectMenuItemToBeHover(utils.queryMenuItem('One'), true);
  utils.expectMenuToBeOpen(false, submenuOptions1);
});

test('Unmounting an open submenu should reset the internal state and stop introducing delays when hovering over sibling items.', () => {
  const { rerender } = render(
    <Menu menuButton={<MenuButton>Menu</MenuButton>}>
      <MenuItem>1</MenuItem>
      <SubMenu label="Submenu">
        <MenuItem>1.1</MenuItem>
        <MenuItem>1.2</MenuItem>
      </SubMenu>
    </Menu>
  );

  utils.clickMenuButton();
  fireEvent.click(utils.queryMenuItem('Submenu'));
  utils.expectMenuToBeOpen(true, { name: 'Submenu' });

  rerender(
    <Menu menuButton={<MenuButton>Menu</MenuButton>}>
      <MenuItem>1</MenuItem>
      <MenuItem>2</MenuItem>
    </Menu>
  );

  const item = utils.queryMenuItem('1');
  fireEvent.pointerMove(item);
  utils.expectMenuItemToBeHover(item, true);
});

test('openTrigger is "clickOnly"', async () => {
  renderMenu(null, null, { openTrigger: 'clickOnly' });
  utils.clickMenuButton();
  const submenuOptions = { name: 'Submenu' };
  const submenuItem = utils.queryMenuItem('Submenu');

  fireEvent.pointerMove(submenuItem);
  utils.expectMenuItemToBeHover(submenuItem, true);
  await utils.delayFor(120);
  utils.expectMenuToBeInTheDocument(false, submenuOptions);

  fireEvent.click(submenuItem);
  utils.expectMenuToBeOpen(true, submenuOptions);

  fireEvent.pointerMove(utils.queryMenuItem('One'));
  await waitFor(() => utils.expectMenuToBeOpen(false, submenuOptions));
  fireEvent.pointerMove(submenuItem);
  fireEvent.keyDown(submenuItem, { key: ' ' });
  utils.expectMenuToBeOpen(true, submenuOptions);
});

test('openTrigger is "none"', async () => {
  renderMenu(null, null, { openTrigger: 'none' });
  utils.clickMenuButton();
  const submenuOptions = { name: 'Submenu' };
  const submenuItem = utils.queryMenuItem('Submenu');

  fireEvent.pointerMove(submenuItem);
  utils.expectMenuItemToBeHover(submenuItem, true);
  await utils.delayFor(120);
  utils.expectMenuToBeInTheDocument(false, submenuOptions);

  fireEvent.click(submenuItem);
  utils.expectMenuToBeInTheDocument(false, submenuOptions);

  fireEvent.keyDown(submenuItem, { key: ' ' });
  utils.expectMenuToBeInTheDocument(false, submenuOptions);
});

test('Submenu is disabled', () => {
  const { container } = renderMenu(null, null, { disabled: true });
  utils.clickMenuButton();
  const submenuItem = utils.queryMenuItem('Submenu');

  expect(submenuItem).toHaveClass('szh-menu__item--disabled');
  utils.expectToBeDisabled(submenuItem, true);
  fireEvent.pointerMove(submenuItem);
  fireEvent.click(submenuItem);
  utils.expectMenuItemToBeHover(submenuItem, false);
  utils.expectMenuToBeInTheDocument(false, { name: 'Submenu', container });

  // Disabled item is skipped in keyboard navigation
  fireEvent.keyDown(utils.queryMenu(), { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('One'), true);
  fireEvent.keyDown(utils.queryMenu(), { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Two'), true);
  utils.expectMenuItemToBeHover(submenuItem, false);
});

test('ref is forwarded to <Menu>, <MenuButton>, <MenuItem> and <SubMenu>', () => {
  let menu, item, button;
  const ref = jest.fn((elt) => (menu = elt));
  const buttonRef = jest.fn((elt) => (button = elt));
  const itemRef = jest.fn((elt) => (item = elt));
  const submenuRef = {};
  const submenuItemRef = {};

  renderMenu(
    { ref },
    { ref: itemRef },
    { ref: submenuRef, itemProps: { ref: submenuItemRef } },
    { ref: buttonRef }
  );

  expect(buttonRef).toHaveBeenCalled();
  expect(button).toHaveAttribute('type', 'button');

  expect(ref).not.toHaveBeenCalled();
  expect(submenuItemRef.current).toBeUndefined();
  utils.clickMenuButton();
  expect(ref).toHaveBeenCalled();
  expect(menu).toHaveAttribute('role', 'menu');
  expect(menu).toHaveAttribute('aria-label', 'Menu');
  expect(submenuItemRef.current).toHaveAttribute('role', 'menuitem');
  expect(submenuItemRef.current).toHaveTextContent('Submenu');

  expect(itemRef).not.toHaveBeenCalled();
  expect(submenuRef.current).toBeUndefined();

  fireEvent.click(utils.queryMenuItem('Submenu'));
  expect(itemRef).toHaveBeenCalled();
  expect(item).toHaveAttribute('role', 'menuitem');
  expect(item).toHaveTextContent('Middle');
  expect(submenuRef.current).toHaveAttribute('role', 'menu');
  expect(submenuRef.current).toHaveAttribute('aria-label', 'Submenu');
});

test('Additional props are forwarded to submenu', async () => {
  const onPointerMove = jest.fn();
  renderMenu(null, null, {
    tabIndex: undefined,
    itemProps: {
      'aria-haspopup': false,
      randomattr: 'random',
      onPointerMove
    },
    arrow: true,
    arrowProps: {
      style: { backgroundColor: 'green' },
      className: ({ dir }) => 'arr-' + dir,
      'data-testid': 'arrow'
    }
  });
  utils.clickMenuButton();

  const menuItem = utils.queryMenuItem('Submenu');
  expect(menuItem).toHaveAttribute('aria-haspopup', 'false');
  expect(menuItem).toHaveAttribute('randomattr', 'random');
  fireEvent.pointerMove(menuItem);
  expect(onPointerMove).toHaveBeenCalledTimes(1);

  const submenuOptions = { name: 'Submenu' };
  await waitFor(() => utils.expectMenuToBeOpen(true, submenuOptions));
  expect(utils.queryMenu(submenuOptions)).not.toHaveAttribute('tabindex');

  const arrow = screen.getByTestId('arrow');
  expect(arrow).toHaveStyle({ backgroundColor: 'green' });
  expect(arrow).toHaveClass('szh-menu__arrow arr-right');
});

test('className props are added to related elements in menu and submenu', () => {
  const { container } = renderMenu(
    {
      'data-testid': 'menu',
      className: 'menu-root',
      menuClassName: 'my-menu',
      menuStyle: { color: 'green' }
    },
    null,
    {
      'data-testid': 'submenu',
      className: 'submenu-root',
      menuClassName: 'my-submenu',
      menuStyle: { color: 'red' },
      itemProps: {
        'data-testid': 'item',
        className: 'my-item',
        style: { color: 'blue' }
      }
    }
  );
  utils.clickMenuButton();

  expect(container.querySelector('.szh-menu-container')).toHaveClass('menu-root');
  expect(container.querySelector('.szh-menu__submenu')).toHaveClass('submenu-root');

  const menu = screen.getByTestId('menu');
  expect(menu).toHaveClass('my-menu');
  expect(menu).toHaveStyle('color: green');

  const submenuItem = screen.getByTestId('item');
  expect(submenuItem).toHaveClass('my-item');
  expect(submenuItem).toHaveStyle('color: blue');

  fireEvent.click(submenuItem);
  const submenu = screen.getByTestId('submenu');
  expect(submenu).toHaveClass('my-submenu');
  expect(submenu).toHaveStyle('color: red');
});

test('Open and close menu with instanceRef', async () => {
  const menuRef = createRef();
  const submenuRef = createRef();
  renderMenu({ instanceRef: menuRef }, null, { instanceRef: submenuRef });
  const menuOptions = { name: 'Menu' };
  const submenuOptions = { name: 'Submenu' };
  utils.expectMenuToBeInTheDocument(false, menuOptions);

  act(() => {
    menuRef.current.openMenu(1);
  });
  utils.expectMenuToBeOpen(true, menuOptions);
  await waitFor(() => utils.expectMenuItemToBeHover(utils.queryMenuItem('Submenu'), true));

  act(() => {
    menuRef.current.openMenu('last', true);
  });
  await waitFor(() => utils.expectMenuItemToBeHover(utils.queryMenuItem('Two'), true));

  act(() => {
    menuRef.current.closeMenu();
  });
  utils.expectMenuToBeOpen(false, menuOptions);

  act(() => {
    menuRef.current.openMenu();
  });
  act(() => {
    submenuRef.current.openMenu('first');
  });
  utils.expectMenuToBeOpen(true, menuOptions);
  utils.expectMenuToBeOpen(true, submenuOptions);
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Submenu'), true);
  await waitFor(() => utils.expectMenuItemToBeHover(utils.queryMenuItem('First'), true));

  act(() => {
    submenuRef.current.closeMenu();
  });
  utils.expectMenuToBeOpen(false, submenuOptions);
  expect(utils.queryMenuItem('Submenu')).toHaveFocus();
});

test.each([false, true])(
  'Submenu renders differently when parent menu overflow is %s',
  (overflow) => {
    renderMenu(
      {
        'data-testid': 'menu',
        overflow: overflow ? 'auto' : undefined,
        containerProps: { 'data-testid': 'container' }
      },
      null,
      { 'data-testid': 'submenu' }
    );
    utils.clickMenuButton();
    const submenuItem = utils.queryMenuItem('Submenu');
    fireEvent.click(submenuItem);

    const menu = screen.getByTestId('menu');
    const submenu = screen.getByTestId('submenu');
    expect(screen.getByTestId('container')).toContainElement(submenu);
    /* eslint-disable jest/no-conditional-expect */
    if (overflow) {
      expect(menu).not.toContainElement(submenu);
    } else {
      expect(menu).toContainElement(submenu);
    }
    /* eslint-enable jest/no-conditional-expect */
  }
);

const TestKeyboard = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setState(true), 500);
    return () => clearTimeout(id);
  }, []);

  return (
    <Menu menuButton={<MenuButton>Menu</MenuButton>}>
      <MenuItem>One</MenuItem>
      <MenuItem disabled={state}>Two</MenuItem>
      <span>
        <MenuItem>Three</MenuItem>
      </span>
      <div>
        <SubMenu label="Submenu">
          <MenuItem>Sub 1</MenuItem>
          <div>Fake item</div>
          <MenuItem disabled={!state}>Sub 2</MenuItem>
          <MenuItem>Sub 3</MenuItem>
        </SubMenu>
      </div>
      {state && <MenuItem>Four</MenuItem>}
      <MenuItem>Five</MenuItem>
    </Menu>
  );
};

test('keyboard navigation when items are mounted/unmounted and disabled/enabled', async () => {
  render(<TestKeyboard />);

  utils.clickMenuButton();
  const submenuItem = utils.queryMenuItem('Submenu');
  fireEvent.click(submenuItem);
  const menu = utils.queryMenu({ name: 'Menu' });
  const submenu = utils.queryMenu({ name: 'Submenu' });

  fireEvent.keyDown(submenu, { key: 'ArrowUp' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Sub 3'), true);
  fireEvent.keyDown(submenu, { key: 'ArrowUp' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Sub 1'), true);
  fireEvent.keyDown(submenu, { key: 'ArrowUp' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Sub 3'), true);

  fireEvent.pointerMove(utils.queryMenuItem('One'));
  await waitFor(() => utils.expectMenuItemToBeHover(utils.queryMenuItem('One'), true));
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Two'), true);
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Three'), true);
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Submenu'), true);
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Five'), true);

  await utils.delayFor(700);
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('One'), true);
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Three'), true);
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Submenu'), true);
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Four'), true);
  fireEvent.keyDown(menu, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Five'), true);

  fireEvent.click(submenuItem);
  fireEvent.keyDown(submenu, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Sub 1'), true);
  fireEvent.keyDown(submenu, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Sub 2'), true);
  fireEvent.keyDown(submenu, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Sub 3'), true);
  fireEvent.keyDown(submenu, { key: 'ArrowDown' });
  utils.expectMenuItemToBeHover(utils.queryMenuItem('Sub 1'), true);
});

describe('Menu retains focus aftering losing focused menu items', () => {
  const getMenu = (renderItem, disableItem) => (
    <Menu menuButton={<MenuButton>Menu</MenuButton>}>
      {renderItem && <MenuItem key="1">1</MenuItem>}
      <MenuItem key="2">2</MenuItem>
      <SubMenu key="3" disabled={disableItem} label="Submenu">
        <MenuItem>Sub 1</MenuItem>
      </SubMenu>
    </Menu>
  );

  test('focused menu items are removed', () => {
    const { rerender } = utils.render(getMenu(true));
    utils.clickMenuButton();
    fireEvent.keyDown(utils.queryMenu({ name: 'Menu' }), { key: 'ArrowDown' });
    expect(utils.queryMenuItem('1')).toHaveFocus();
    rerender(getMenu());
    utils.expectMenuToHaveFocus();
    utils.expectMenuToBeOpen(true, { name: 'Menu' });
    act(() => screen.getByRole('button').focus());
    utils.expectMenuToBeOpen(false, { name: 'Menu' });
  });

  test('focused menu items are disabled', () => {
    const { rerender } = utils.render(getMenu(true));
    utils.clickMenuButton();
    fireEvent.keyDown(utils.queryMenu({ name: 'Menu' }), { key: 'ArrowUp' });
    utils.expectMenuItemToBeHover(utils.queryMenuItem('Submenu'), true);
    rerender(getMenu(true, true));
    utils.expectMenuItemToBeHover(utils.queryMenuItem('Submenu'), false);
    utils.expectMenuToBeOpen(true, { name: 'Menu' });
    act(() => screen.getByRole('button').focus());
    utils.expectMenuToBeOpen(false, { name: 'Menu' });
  });
});

test.each([
  ['top', 'szh-menu--dir-right'],
  ['left', 'szh-menu--dir-left'],
  ['right', 'szh-menu--dir-right']
])('Submenu opens on the same direction as parent submenu', (direction, directionClass) => {
  render(
    <Menu menuButton={<MenuButton>Menu</MenuButton>} direction={direction}>
      <SubMenu label="Lv1">
        <SubMenu label="Lv2">
          <SubMenu label="Lv3">
            <MenuItem>item</MenuItem>
          </SubMenu>
        </SubMenu>
      </SubMenu>
    </Menu>
  );

  utils.clickMenuButton();
  fireEvent.click(utils.queryMenuItem('Lv1'));
  expect(utils.queryMenu({ name: 'Lv1' })).toHaveClass(directionClass);

  fireEvent.click(utils.queryMenuItem('Lv2'));
  expect(utils.queryMenu({ name: 'Lv2' })).toHaveClass(directionClass);

  fireEvent.click(utils.queryMenuItem('Lv3'));
  expect(utils.queryMenu({ name: 'Lv3' })).toHaveClass(directionClass);
});

test('Menu should have no axe violations', async () => {
  const { container } = renderMenu({ arrow: true });
  utils.clickMenuButton();
  fireEvent.click(utils.queryMenuItem('Submenu'));
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
