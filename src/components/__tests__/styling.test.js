import React from 'react';
import { Menu } from '../Menu';
import { MenuItem } from '../MenuItem';
import { MenuButton } from '../MenuButton';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import * as utils from './utils';

const { queryByRole } = screen;

const renderMenu = (props, itemProps) => render(
    <Menu menuButton={<MenuButton>Menu</MenuButton>} {...props}>
        <MenuItem {...itemProps}>First</MenuItem>
        <MenuItem>Last</MenuItem>
    </Menu>
);

test('className and styles props', () => {
    const className = 'my-class1 my-class2';
    const baseStyle = {
        backgroundColor: 'yellow',
        fontSize: '1.2rem'
    };
    const styles = {
        ...baseStyle,
        type: {
            checkbox: {
                color: 'red'
            }
        },
        hover: {
            color: 'green'
        },
        active: {
            color: 'blue'
        }
    };

    renderMenu({ className }, { styles, type: 'checkbox' });
    utils.clickMenuButton();
    expect(utils.queryMenu()).toHaveClass(className);

    const menuItem = queryByRole('menuitemcheckbox', { name: 'First' })
    expect(menuItem).toHaveStyle({ ...baseStyle, color: 'red' });

    fireEvent.mouseEnter(menuItem);
    expect(menuItem).toHaveStyle({ ...baseStyle, color: 'green' });

    fireEvent.keyDown(menuItem, { key: ' ' });
    expect(menuItem).toHaveStyle({ ...baseStyle, color: 'blue' });
});

test('className and styles props as functions', () => {
    const className = jest.fn();
    const styles = jest.fn();
    renderMenu({ className }, { styles });
    utils.clickMenuButton();
    expect(className).toHaveBeenLastCalledWith(expect.objectContaining({
        open: true,
        dir: 'bottom'
    }));

    const menuItem = queryByRole('menuitem', { name: 'First' })
    fireEvent.mouseEnter(menuItem);
    expect(styles).toHaveBeenLastCalledWith(expect.objectContaining({
        hover: true
    }));

    fireEvent.keyDown(menuItem, { key: 'Enter' });
    expect(styles).toHaveBeenLastCalledWith(expect.objectContaining({
        hover: true,
        active: true
    }));
});
