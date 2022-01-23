import { screen, fireEvent } from '@testing-library/react';
import * as utils from './utils';

const { queryByRole } = screen;

test('className and styles props', () => {
  const menuClassName = 'my-class1 my-class2';
  const baseStyle = {
    backgroundColor: 'yellow',
    fontSize: '1.2rem'
  };
  const styles = {
    ...baseStyle,
    type: {
      $checkbox: {
        color: 'red'
      }
    },
    $hover: {
      color: 'green'
    },
    active: {
      color: 'blue'
    }
  };

  utils.renderMenu({ menuClassName }, { styles, type: 'checkbox' });
  utils.clickMenuButton();
  expect(utils.queryMenu()).toHaveClass(menuClassName);

  const menuItem = queryByRole('menuitemcheckbox', { name: 'Middle' });
  expect(menuItem).toHaveStyle({ ...baseStyle, color: 'red' });

  fireEvent.mouseMove(menuItem);
  expect(menuItem).toHaveStyle({ ...baseStyle, color: 'green' });

  fireEvent.keyDown(menuItem, { key: ' ' });
  expect(menuItem).toHaveStyle({ ...baseStyle, color: 'blue' });
});

test('className and styles props as functions', () => {
  const menuClassName = jest.fn();
  const styles = jest.fn();
  utils.renderMenu({ menuClassName }, { styles }, false);
  utils.clickMenuButton();
  expect(menuClassName).toHaveBeenLastCalledWith(
    expect.objectContaining({
      state: 'open',
      dir: 'bottom'
    })
  );
  expect(styles).toHaveBeenLastCalledWith(
    expect.objectContaining({
      hover: false,
      active: false
    })
  );

  // For testing className and styles memorisation
  fireEvent.mouseMove(queryByRole('menuitem', { name: 'First' }));
  fireEvent.mouseMove(queryByRole('menuitem', { name: 'Last' }));

  const menuItem = queryByRole('menuitem', { name: 'Middle' });
  fireEvent.mouseMove(menuItem);
  expect(styles).toHaveBeenLastCalledWith(
    expect.objectContaining({
      hover: true,
      active: false
    })
  );

  fireEvent.keyDown(menuItem, { key: 'Enter' });
  expect(styles).toHaveBeenLastCalledWith(
    expect.objectContaining({
      hover: true,
      active: true
    })
  );

  expect(menuClassName).toHaveBeenCalledTimes(1);
  expect(styles).toHaveBeenCalledTimes(3);
});
