import { createRef, useState, useRef } from 'react';
import { ControlledMenu, MenuItem, useHover, useMenuState } from './entry';
import { screen, fireEvent, waitFor, act } from '@testing-library/react';
import * as utils from './utils';

const { render } = utils;
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

test('ControlledMenu with an anchor element; ref is forwarded', async () => {
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

  const ref = createRef();
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
  await waitFor(() => utils.expectMenuToHaveFocus());

  // Cause menu to lose focus
  queryByRole('button').focus();
  expect(onClose).toHaveBeenLastCalledWith({ reason: 'blur' });

  // Close and re-open menu
  rerender(getMenu({ ...props, state: 'closed' }));
  rerender(getMenu({ ...props, state: 'open' }));
  await waitFor(() => utils.expectMenuToHaveFocus());

  // Try to close menu with ESC key
  fireEvent.keyDown(utils.queryMenu(), { key: 'Escape' });
  expect(onClose).toHaveBeenLastCalledWith({ reason: 'cancel', key: 'Escape' });

  // Click on a menu item
  fireEvent.click(utils.queryMenuItem('Middle'));
  expect(onItemClick).toHaveBeenLastCalledWith(utils.clickEvent({ value: 'Middle' }));
  expect(onClose).toHaveBeenLastCalledWith({ value: 'Middle', reason: 'click' });

  // Set state to undefined, expect menu to be removed from DOM
  rerender(getMenu({ ...props, state: undefined }));
  expect(ref.current).toBeNull();
  utils.expectMenuToBeInTheDocument(false);
});

test.each([undefined, {}])(
  'ControlledMenu warns when open by default without anchor',
  (anchorRef) => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    render(getMenu({ state: 'open', anchorRef }));
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('anchorRef or anchorPoint'));
    warnSpy.mockRestore();
    utils.expectMenuToBeOpen(true);
  }
);

test('ControlledMenu as context menu', () => {
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

  expect(container.querySelector('.szh-menu-container')).toBeNull();
  expect(container.querySelector('.szh-menu')).toBeNull();
  expect(document.querySelector('.szh-menu-container')).toBeInTheDocument();
  utils.expectMenuToBeInTheDocument(true);
});

const TestPortal = () => {
  const [target, setTarget] = useState();
  return (
    <div>
      <div data-testid="menu-container">{getMenu({ portal: { target } })}</div>
      <div data-testid="portal-container" ref={setTarget} />
    </div>
  );
};

test('Portal will render ControlledMenu into target element', () => {
  render(<TestPortal />);
  expect(screen.getByTestId('menu-container')).not.toContainElement(utils.queryMenu());
  expect(screen.getByTestId('portal-container')).toContainElement(utils.queryMenu());
});

const HoverMenu = () => {
  const ref = useRef(null);
  const [menuState, toggleMenu] = useMenuState({ initialMounted: true });
  const { anchorProps, hoverProps } = useHover(menuState.state, toggleMenu, {
    openDelay: 100,
    closeDelay: 200
  });

  return (
    <>
      <button data-testid="anchor" ref={ref} {...anchorProps}>
        Anchor
      </button>

      <ControlledMenu
        {...hoverProps}
        {...menuState}
        anchorRef={ref}
        onClose={() => toggleMenu(false)}
      >
        <MenuItem>Item</MenuItem>
      </ControlledMenu>
    </>
  );
};

test('Hover menu', async () => {
  render(<HoverMenu />);

  const anchor = screen.getByTestId('anchor');
  const menu = utils.queryMenu();

  fireEvent.mouseEnter(anchor);
  await waitFor(() => utils.expectMenuToBeOpen(true));

  fireEvent.mouseLeave(anchor);
  await utils.delayFor(100);
  fireEvent.mouseEnter(menu);
  await utils.delayFor(200);
  utils.expectMenuToBeOpen(true);

  fireEvent.mouseLeave(menu);
  await utils.delayFor(100);
  fireEvent.mouseEnter(anchor);
  await utils.delayFor(200);
  utils.expectMenuToBeOpen(true);

  fireEvent.mouseLeave(anchor);
  await utils.delayFor(100);
  fireEvent.mouseEnter(anchor);
  await utils.delayFor(200);
  utils.expectMenuToBeOpen(true);

  fireEvent.mouseLeave(anchor);
  await waitFor(() => utils.expectMenuToBeOpen(false));

  fireEvent.mouseEnter(anchor);
  await utils.delayFor(50);
  fireEvent.mouseLeave(anchor);
  await utils.delayFor(100);
  utils.expectMenuToBeOpen(false);

  fireEvent.mouseEnter(anchor);
  await waitFor(() => utils.expectMenuToBeOpen(true));

  fireEvent.mouseLeave(anchor);
  fireEvent.mouseEnter(menu);
  await utils.delayFor(300);
  utils.expectMenuToBeOpen(true);

  fireEvent.mouseLeave(menu);
  await waitFor(() => utils.expectMenuToBeOpen(false));

  fireEvent.mouseEnter(anchor);
  await waitFor(() => utils.expectMenuToBeOpen(true));
  fireEvent.mouseDown(anchor);
  fireEvent.click(anchor);
  act(() => anchor.focus());
  await waitFor(() => utils.expectMenuToBeOpen(false));

  fireEvent.mouseDown(anchor);
  fireEvent.click(anchor);
  utils.expectMenuToBeOpen(true);
});
