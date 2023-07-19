/**
 * @jest-environment node
 */

import { renderToString } from 'react-dom/server';
import { MenuItem, Menu, MenuButton } from './entry';

const getMenu = (props) => (
  <main>
    <Menu menuButton={<MenuButton>Open</MenuButton>} initialMounted {...props}>
      <MenuItem>Item</MenuItem>
    </Menu>
  </main>
);

describe('Server rendering', () => {
  test('portal is not provided', () => {
    expect(renderToString(getMenu())).toContain(
      '</button><div class="szh-menu-container" style="position:absolute"><ul role="menu"'
    );
  });

  test('portal is true', () => {
    expect(renderToString(getMenu({ portal: true }))).toContain(
      '</button><div class="szh-menu-container" style="position:absolute"><ul role="menu"'
    );
  });

  test('portal.target is null', () => {
    expect(renderToString(getMenu({ portal: { target: null } }))).toContain(
      '</button><div class="szh-menu-container" style="position:absolute"><ul role="menu"'
    );
  });

  test('portal.stablePosition is true', () => {
    expect(renderToString(getMenu({ portal: { stablePosition: true } }))).toContain(
      '</button></main>'
    );
  });

  test('initialMounted is false', () => {
    expect(renderToString(getMenu({ initialMounted: false }))).toContain('</button></main>');
  });
});
