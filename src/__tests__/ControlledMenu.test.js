import React from 'react';
import { ControlledMenu, MenuItem } from '../';
import { screen, render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'regenerator-runtime/runtime.js';
import * as utils from './utils';

const { queryByRole } = screen;

const getMenu = (props) => (
    <>
        <button />
        <ControlledMenu state="closed" {...props}>
            <MenuItem>First</MenuItem>
            <MenuItem value='Middle'>Middle</MenuItem>
            <MenuItem>Last</MenuItem>
        </ControlledMenu>
    </>
);

test('Test ControlledMenu with an anchor element', async () => {
    const onClose = jest.fn();
    const onClick = jest.fn();
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

    const props = {
        anchorRef: mockRef,
        boundingBoxRef: mockRef,
        onClose, onClick,
        viewScroll: 'auto'
    };
    const { rerender } = render(getMenu({ ...props }));
    utils.expectMenuToBeOpen(false);

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
    expect(onClick).toHaveBeenLastCalledWith(utils.clickEvent({ value: 'Middle' }));
    expect(onClose).toHaveBeenLastCalledWith({ value: 'Middle', reason: 'click' });

    // Set state to undefined, expect menu to be removed from DOM
    rerender(getMenu({ ...props, state: undefined }));
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
    
    expect(container.querySelector('.rc-menu-container')).toBe(null);
    expect(container.querySelector('.rc-menu')).toBe(null);
    expect(document.querySelector('.rc-menu-container')).toBeInTheDocument();
    utils.expectMenuToBeInTheDocument(true);
});
