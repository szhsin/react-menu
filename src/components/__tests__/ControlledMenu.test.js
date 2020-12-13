import React from 'react';
import { ControlledMenu } from '../ControlledMenu';
import { MenuItem } from '../MenuItem';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime.js';
import * as utils from './utils';

const { queryByRole } = screen;

const getMenu = (props) => (
    <>
        <button />
        <ControlledMenu animation={false} {...props}>
            <MenuItem>First</MenuItem>
            <MenuItem value='Middle'>Middle</MenuItem>
            <MenuItem>Last</MenuItem>
        </ControlledMenu>
    </>
);

test('Test ControlledMenu with an anchor element', async () => {
    const onClose = jest.fn();
    const onClick = jest.fn();
    const anchorRef = {
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

    const props = { anchorRef, onClose, onClick };
    const { rerender } = render(getMenu({ ...props, isOpen: false }));
    utils.expectMenuToBeOpen(false);

    // Open menu
    rerender(getMenu({ ...props, isOpen: true }));
    utils.expectMenuToBeOpen(true);
    await waitFor(() => expect(utils.queryMenu()).toHaveFocus());

    // Cause menu to lose focus
    queryByRole('button').focus();
    expect(onClose).toHaveBeenLastCalledWith({ reason: 'blur' });

    // Close and re-open menu
    rerender(getMenu({ ...props, isOpen: false }));
    rerender(getMenu({ ...props, isOpen: true }));
    await waitFor(() => expect(utils.queryMenu()).toHaveFocus());

    // Try to close menu with ESC key
    fireEvent.keyDown(utils.queryMenu(), { key: 'Escape' });
    expect(onClose).toHaveBeenLastCalledWith({ reason: 'cancel', key: 'Escape' });

    // Click on a menu item
    fireEvent.click(utils.queryMenuItem('Middle'));
    expect(onClick).toHaveBeenLastCalledWith({ value: 'Middle' });
    expect(onClose).toHaveBeenLastCalledWith({ reason: 'click' });

    // Set isMounted to false, expect menu to be removed from DOM
    rerender(getMenu({ ...props, isMounted: false }));
    utils.expectMenuToBeInTheDocument(false);
});

test('Test ControlledMenu as context menu', () => {
    const anchorPoint = { x: 0, y: 0 };
    const props = { anchorPoint };

    const { rerender } = render(getMenu({ ...props, isOpen: false }));
    utils.expectMenuToBeOpen(false);

    // Open and close menu
    rerender(getMenu({ ...props, isOpen: true }));
    utils.expectMenuToBeOpen(true);
    rerender(getMenu({ ...props, isOpen: false }));
    utils.expectMenuToBeOpen(false);
});

test('Portal will render ControlledMenu into document.body', () => {
    const { container } = render(getMenu({ portal: true }));
    utils.clickMenuButton();

    expect(container.querySelector('.rc-menu-container')).toBe(null);
    expect(container.querySelector('.rc-menu')).toBe(null);
    expect(document.querySelector('.rc-menu-container')).toBeInTheDocument();
    utils.expectMenuToBeInTheDocument(true);
});
