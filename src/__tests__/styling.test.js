import { screen, fireEvent } from '@testing-library/react';
import * as utils from './utils';

const { queryByRole } = screen;

test('className and style props', () => {
  const menuClassName = 'my-class1 my-class2';
  const itemClassName = 'my-class3 my-class4';
  const menuStyle = {
    color: 'green',
    fontSize: '1.1rem'
  };
  const itemStyle = {
    backgroundColor: 'yellow',
    fontSize: '1.2rem'
  };

  utils.renderMenu(
    { menuClassName, menuStyle },
    { className: itemClassName, style: itemStyle, type: 'checkbox' }
  );
  utils.clickMenuButton();
  const menu = utils.queryMenu();
  expect(menu).toHaveClass(menuClassName);
  expect(menu).toHaveStyle(menuStyle);

  const menuItem = queryByRole('menuitemcheckbox', { name: 'Middle' });
  expect(menuItem).toHaveClass(itemClassName);
  expect(menuItem).toHaveStyle(itemStyle);
});

test('className as functions', () => {
  const menuClassName = jest.fn();
  const itemClassName = jest.fn();
  utils.renderMenu({ menuClassName }, { className: itemClassName }, false);
  utils.clickMenuButton();
  expect(menuClassName).toHaveBeenLastCalledWith(
    expect.objectContaining({
      state: 'open',
      dir: 'bottom'
    })
  );
  expect(itemClassName).toHaveBeenLastCalledWith(
    expect.objectContaining({
      hover: false
    })
  );

  // For testing className memorisation
  fireEvent.mouseMove(queryByRole('menuitem', { name: 'First' }));
  fireEvent.mouseMove(queryByRole('menuitem', { name: 'Last' }));

  const menuItem = queryByRole('menuitem', { name: 'Middle' });
  fireEvent.mouseMove(menuItem);
  expect(itemClassName).toHaveBeenLastCalledWith(
    expect.objectContaining({
      hover: true
    })
  );

  expect(menuClassName).toHaveBeenCalledTimes(1);
  expect(itemClassName).toHaveBeenCalledTimes(2);
});
