const menuContainerClass = 'szh-menu-container';
const menuClass = 'szh-menu';
const menuButtonClass = 'szh-menu-button';
const menuArrowClass = 'arrow';
const menuItemClass = 'item';
const menuDividerClass = 'divider';
const menuHeaderClass = 'header';
const menuGroupClass = 'group';
const subMenuClass = 'submenu';
const radioGroupClass = 'radio-group';

const bem = block => element => modifier => {
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
  modifiers.forEach(modifier => {
    const selector = modifier.split('-').reduce((prev, curr) => `${prev}${curr[0].toUpperCase()}${curr.slice(1)}`);
    Object.defineProperty(selectorObj, selector, {
      value: blockElement(modifier),
      enumerable: true
    });
  });
  return selectorObj;
};
const createModifiers = (name, values) => values.map(value => `${name}-${value}`);
const directions = /*#__PURE__*/createModifiers('dir', ['left', 'right', 'top', 'bottom']);
const menuBlock = /*#__PURE__*/bem(menuClass);
const menuSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(), [...createModifiers('state', ['opening', 'open', 'closing', 'closed']), ...createModifiers('align', ['start', 'center', 'end']), ...directions]);
const menuArrowSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(menuArrowClass), directions);
const menuItemSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(menuItemClass), ['hover', 'disabled', 'anchor', 'checked', 'open', 'submenu', 'focusable', 'type-radio', 'type-checkbox']);
const menuDividerSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(menuDividerClass));
const menuHeaderSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(menuHeaderClass));
const menuGroupSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(menuGroupClass));
const radioGroupSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(radioGroupClass));
const submenuSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(subMenuClass));
const menuContainerSelector = /*#__PURE__*/createSelector( /*#__PURE__*/ /*#__PURE__*/bem(menuContainerClass)(), ['itemTransition']);
const menuButtonSelector = /*#__PURE__*/createSelector( /*#__PURE__*/ /*#__PURE__*/bem(menuButtonClass)(), ['open']);

export { menuArrowSelector, menuButtonSelector, menuContainerSelector, menuDividerSelector, menuGroupSelector, menuHeaderSelector, menuItemSelector, menuSelector, radioGroupSelector, submenuSelector };
