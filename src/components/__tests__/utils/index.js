import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

const { queryByRole } = screen;

const expectToBe = (value, truthy) => truthy ? expect(value) : expect(value).not;

export const queryMenu = ({ name, container } = {}) => name
    ? container.querySelector(`ul[aria-label="${name}"]`)
    : queryByRole('menu');

export const expectMenuToBeInTheDocument = (truthy, options) =>
    expectToBe(queryMenu(options), truthy).toBeInTheDocument();

export const expectMenuToBeOpen = (truthy, options) =>
    expectToBe(queryMenu(options), truthy).toHaveClass('rc-menu--open');

export const expectButtonToBeExpanded = truthy =>
    expect(queryByRole('button')).toHaveAttribute('aria-expanded', String(truthy));

export const expectMenuItemToBeHover = (menuItem, truthy) =>
    expectToBe(menuItem, truthy).toHaveClass('rc-menu__item--hover');

export const expectMenuItemToBeActive = (menuItem, truthy) =>
    expectToBe(menuItem, truthy).toHaveClass('rc-menu__item--active');

export const clickMenuButton = keyboard => {
    const menuButton = queryByRole('button');
    if (keyboard) menuButton.focus();
    fireEvent.click(menuButton, { detail: keyboard ? 0 : 1 });
}

export const queryMenuItem = name => queryByRole('menuitem', { name });
