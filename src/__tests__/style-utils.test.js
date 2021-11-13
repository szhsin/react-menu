import {
  menuContainerSelector,
  menuButtonSelector,
  menuSelector,
  menuArrowSelector,
  menuItemSelector,
  menuDividerSelector,
  menuHeaderSelector,
  menuGroupSelector,
  radioGroupSelector,
  submenuSelector
} from './entry';

test('style-utils menuSelector', () => {
  expect(menuSelector.name).toBe('.szh-menu');
  expect(menuSelector.stateOpening).toBe('.szh-menu--state-opening');
  expect(menuSelector.stateOpen).toBe('.szh-menu--state-open');
  expect(menuSelector.stateClosing).toBe('.szh-menu--state-closing');
  expect(menuSelector.stateClosed).toBe('.szh-menu--state-closed');
  expect(menuSelector.dirLeft).toBe('.szh-menu--dir-left');
  expect(menuSelector.dirRight).toBe('.szh-menu--dir-right');
  expect(menuSelector.dirTop).toBe('.szh-menu--dir-top');
  expect(menuSelector.dirBottom).toBe('.szh-menu--dir-bottom');
});

test('style-utils menuArrowSelector', () => {
  expect(menuArrowSelector.name).toBe('.szh-menu__arrow');
  expect(menuArrowSelector.dirLeft).toBe('.szh-menu__arrow--dir-left');
  expect(menuArrowSelector.dirRight).toBe('.szh-menu__arrow--dir-right');
  expect(menuArrowSelector.dirTop).toBe('.szh-menu__arrow--dir-top');
  expect(menuArrowSelector.dirBottom).toBe('.szh-menu__arrow--dir-bottom');
});

test('style-utils menuItemSelector', () => {
  expect(menuItemSelector.name).toBe('.szh-menu__item');
  expect(menuItemSelector.hover).toBe('.szh-menu__item--hover');
  expect(menuItemSelector.active).toBe('.szh-menu__item--active');
  expect(menuItemSelector.disabled).toBe('.szh-menu__item--disabled');
  expect(menuItemSelector.anchor).toBe('.szh-menu__item--anchor');
  expect(menuItemSelector.checked).toBe('.szh-menu__item--checked');
  expect(menuItemSelector.open).toBe('.szh-menu__item--open');
  expect(menuItemSelector.submenu).toBe('.szh-menu__item--submenu');
  expect(menuItemSelector.focusable).toBe('.szh-menu__item--focusable');
  expect(menuItemSelector.typeRadio).toBe('.szh-menu__item--type-radio');
  expect(menuItemSelector.typeCheckbox).toBe('.szh-menu__item--type-checkbox');
});

test('style-utils other selectors', () => {
  expect(menuContainerSelector.name).toBe('.szh-menu-container');
  expect(menuContainerSelector.itemTransition).toBe('.szh-menu-container--itemTransition');

  expect(menuButtonSelector.name).toBe('.szh-menu-button');
  expect(menuButtonSelector.open).toBe('.szh-menu-button--open');

  expect(menuDividerSelector.name).toBe('.szh-menu__divider');
  expect(menuHeaderSelector.name).toBe('.szh-menu__header');
  expect(menuGroupSelector.name).toBe('.szh-menu__group');
  expect(radioGroupSelector.name).toBe('.szh-menu__radio-group');
  expect(submenuSelector.name).toBe('.szh-menu__submenu');
});
