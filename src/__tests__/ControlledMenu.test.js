import React from 'react';
import { ControlledMenu, MenuItem } from '../';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import * as utils from './utils';

const { queryByRole } = screen;

const getMenu = (props) => (
  <>
    <button />
    <ControlledMenu state="closed" {...props}>
      <MenuItem>First</MenuItem>
      <MenuItem value="Middle">Middle</MenuItem>
      <MenuItem>Last</MenuItem>
    </ControlledMenu>
  </>
);

test('Test ControlledMenu with an anchor element; ref is forwarded', async () => {
  const onClose = jest.fn();
  const onItemClick = jest.fn();
  const mockRef = {
    current: {
      getBoundingClientRect: () => ({
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: 0,
        height: 0
      })
    }
  };

  const ref = React.createRef();
  const props = {
    ref,
    anchorRef: mockRef,
    boundingBoxRef: mockRef,
    onClose,
    onItemClick,
    viewScroll: 'auto'
  };
  const { rerender } = render(getMenu({ ...props }));
  utils.expectMenuToBeOpen(false);
  expect(ref.current).toHaveAttribute('role', 'menu');

  // Open menu
  rerender(getMenu({ ...props, state: 'open' }));
  utils.expectMenuToBeOpen(true);
  await waitFor(() => expect(utils.queryMenu()).toHaveFocus());

  // Cause menu to lose focus
  queryByRole('button').focus();
  expect(onClose).toHaveBeenLastCalledWith({ reason: 'blur' });

  // Close and re-open menu
  rerender(getMenu({ ...props, state: 'closed' }));
  rerender(getMenu({ ...props, state: 'open' }));
  await waitFor(() => expect(utils.queryMenu()).toHaveFocus());

  // Try to close menu with ESC key
  fireEvent.keyDown(utils.queryMenu(), { key: 'Escape' });
  expect(onClose).toHaveBeenLastCalledWith({ reason: 'cancel', key: 'Escape' });

  // Click on a menu item
  fireEvent.click(utils.queryMenuItem('Middle'));
  expect(onItemClick).toHaveBeenLastCalledWith(utils.clickEvent({ value: 'Middle' }));
  expect(onClose).toHaveBeenLastCalledWith({ value: 'Middle', reason: 'click' });

  // Set state to undefined, expect menu to be removed from DOM
  rerender(getMenu({ ...props, state: undefined }));
  expect(ref.current).toBe(null);
  utils.expectMenuToBeInTheDocument(false);
});

test('Test ControlledMenu as context menu', () => {
  const anchorPoint = { x: 0, y: 0 };
  const props = { anchorPoint };

  const { rerender } = render(getMenu({ ...props }));
  utils.expectMenuToBeOpen(false);

  // Open and close menu
  rerender(getMenu({ ...props, state: 'open' }));
  utils.expectMenuToBeOpen(true);
  rerender(getMenu({ ...props, state: 'closed' }));
  utils.expectMenuToBeOpen(false);
});

test('Portal will render ControlledMenu into document.body', () => {
  const { container } = render(getMenu({ portal: true }));

  expect(container.querySelector('.szh-menu-container')).toBe(null);
  expect(container.querySelector('.szh-menu')).toBe(null);
  expect(document.querySelector('.szh-menu-container')).toBeInTheDocument();
  utils.expectMenuToBeInTheDocument(true);
});
