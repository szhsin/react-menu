/* eslint-disable react/no-children-prop */
import React from 'react';
import { applyHOC, applyStatics, Menu, MenuItem, MenuButton } from '../../';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';

const { queryByRole } = screen;

/* eslint-disable-next-line jest/valid-expect */
const expectToBe = (value, truthy) => (truthy ? expect(value) : expect(value).not);

export const delayFor = (delay) =>
  waitFor(() => new Promise((resolve) => setTimeout(resolve, delay)));

export const queryMenu = ({ name, container } = {}) =>
  name ? container.querySelector(`ul[aria-label="${name}"]`) : queryByRole('menu');

export const expectMenuToBeInTheDocument = (truthy, options) =>
  expectToBe(queryMenu(options), truthy).toBeInTheDocument();

export const expectMenuToBeOpen = (truthy, options) =>
  expectToBe(queryMenu(options), truthy).toHaveClass('szh-menu--state-open');

export const expectMenuToHaveState = (state, truthy, options) =>
  expectToBe(queryMenu(options), truthy).toHaveClass(`szh-menu--state-${state}`);

export const expectButtonToBeExpanded = (truthy) =>
  expect(queryByRole('button')).toHaveAttribute('aria-expanded', String(truthy));

export const expectToBeDisabled = (element, truthy) => {
  if (truthy) {
    expect(element).toHaveAttribute('aria-disabled', 'true');
  } else {
    expect(element).not.toHaveAttribute('aria-disabled');
  }
};

export const expectMenuItemToBeHover = (menuItem, truthy) =>
  expectToBe(menuItem, truthy).toHaveClass('szh-menu__item--hover');

export const expectMenuItemToBeActive = (menuItem, truthy) =>
  expectToBe(menuItem, truthy).toHaveClass('szh-menu__item--active');

export const expectMenuItemToBeChecked = (menuItem, truthy) => {
  expectToBe(menuItem, truthy).toHaveClass('szh-menu__item--checked');
  if (truthy !== undefined) {
    expect(menuItem).toHaveAttribute('aria-checked', String(truthy));
  } else {
    expect(menuItem).not.toHaveAttribute('aria-checked');
  }
};

export const clickMenuButton = ({ name, keyboard } = {}) => {
  const menuButton = queryByRole('button', { name });
  if (keyboard) menuButton.focus();
  fireEvent.click(menuButton, { detail: keyboard ? 0 : 1 });
};

export const queryMenuItem = (name) => queryByRole('menuitem', { name });

export const clickEvent = (event) => ({
  ...event,
  syntheticEvent: expect.objectContaining(
    event.key ? { type: 'keyup', key: event.key } : { type: 'click' }
  )
});

const enhance = (WrappedComponent, value) => {
  const Enhance = (props) => <WrappedComponent children={value} value={value} {...props} />;
  Enhance.displayName = `Enhance${value}`;
  return Enhance;
};

export const FirstItem = applyStatics(MenuItem)(enhance(MenuItem, 'First'));
export const LastItem = applyHOC(enhance)(MenuItem, 'Last');

export const renderMenu = (props, itemProps) =>
  render(
    <Menu menuButton={<MenuButton>Open</MenuButton>} {...props}>
      <span className="some-class">Some texts</span>
      <FirstItem />
      <div>
        <MenuItem children="Middle" {...itemProps} />
        <LastItem />
      </div>
    </Menu>
  );
