import {
  menuContainerClass,
  menuButtonClass,
  menuClass,
  menuArrowClass,
  menuItemClass,
  menuDividerClass,
  menuHeaderClass,
  menuGroupClass,
  radioGroupClass,
  subMenuClass
} from '../utils';

const bem = (block) => (element) => (modifier) => {
  let selector = `.${block}`;
  if (element) selector += `__${element}`;
  if (modifier) selector += `--${modifier}`;
  return selector;
};

const createSelector = (blockElement, modifiers = []) => {
  const selectorObj = {};
  Object.defineProperty(selectorObj, 'name', {
    value: blockElement(),
    enumerable: true
  });

  modifiers.forEach((modifier) => {
    const selector = modifier
      .split('-')
      .reduce((prev, curr) => `${prev}${curr[0].toUpperCase()}${curr.slice(1)}`);
    Object.defineProperty(selectorObj, selector, {
      value: blockElement(modifier),
      enumerable: true
    });
  });

  return selectorObj;
};

const createModifiers = (name, values) => values.map((value) => `${name}-${value}`);

const directions = createModifiers('dir', ['left', 'right', 'top', 'bottom']);
const menuBlock = bem(menuClass);
const menuSelector = createSelector(menuBlock(), [
  ...createModifiers('state', ['opening', 'open', 'closing', 'closed']),
  ...createModifiers('align', ['start', 'center', 'end']),
  ...directions
]);
const menuArrowSelector = createSelector(menuBlock(menuArrowClass), directions);
const menuItemSelector = createSelector(menuBlock(menuItemClass), [
  'hover',
  'disabled',
  'anchor',
  'checked',
  'open',
  'submenu',
  'focusable',
  'type-radio',
  'type-checkbox'
]);

const menuDividerSelector = createSelector(menuBlock(menuDividerClass));
const menuHeaderSelector = createSelector(menuBlock(menuHeaderClass));
const menuGroupSelector = createSelector(menuBlock(menuGroupClass));
const radioGroupSelector = createSelector(menuBlock(radioGroupClass));
const submenuSelector = createSelector(menuBlock(subMenuClass));
const menuContainerSelector = createSelector(bem(menuContainerClass)(), ['itemTransition']);
const menuButtonSelector = createSelector(bem(menuButtonClass)(), ['open']);

export {
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
};
