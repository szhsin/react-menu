/* eslint-disable react/no-children-prop */
import { StrictMode } from 'react';
import { Menu, MenuItem, MenuButton } from './entry';
import { screen, render as libRender, fireEvent, waitFor } from '@testing-library/react';

const StrictModeWrapper = ({ children }) => <StrictMode>{children}</StrictMode>;
export const render = (ui, options) => libRender(ui, { wrapper: StrictModeWrapper, ...options });

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
    expect(element).not.toHaveAttribute('tabindex');
  } else {
    expect(element).not.toHaveAttribute('aria-disabled');
    expect(element).toHaveAttribute('tabindex');
  }
};

export const expectMenuItemToBeHover = (menuItem, truthy, disabled) => {
  expectToBe(menuItem, truthy).toHaveClass('szh-menu__item--hover');
  !disabled && expect(menuItem).toHaveAttribute('tabindex', truthy ? '0' : '-1');
};

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
    event.key ? { type: 'keydown', key: event.key } : { type: 'click' }
  )
});

const enhance = (WrappedComponent, value) => {
  const Enhance = (props) => <WrappedComponent children={value} value={value} {...props} />;
  Enhance.displayName = `Enhance${value}`;
  return Enhance;
};

export const FirstItem = enhance(MenuItem, 'First');
export const LastItem = enhance(MenuItem, 'Last');

export const renderMenu = (props, itemProps, strictMode = true) =>
  (strictMode ? render : libRender)(
    <Menu menuButton={<MenuButton>Open</MenuButton>} {...props}>
      <span className="some-class">Some texts</span>
      <FirstItem />
      <div>
        <MenuItem children="Middle" {...itemProps} />
        <LastItem />
      </div>
    </Menu>
  );
