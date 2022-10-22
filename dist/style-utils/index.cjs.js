'use strict';

var menuContainerClass = 'szh-menu-container';
var menuClass = 'szh-menu';
var menuButtonClass = 'szh-menu-button';
var menuArrowClass = 'arrow';
var menuItemClass = 'item';
var menuDividerClass = 'divider';
var menuHeaderClass = 'header';
var menuGroupClass = 'group';
var subMenuClass = 'submenu';
var radioGroupClass = 'radio-group';

var bem = function bem(block) {
  return function (element) {
    return function (modifier) {
      var selector = "." + block;
      if (element) selector += "__" + element;
      if (modifier) selector += "--" + modifier;
      return selector;
    };
  };
};

var createSelector = function createSelector(blockElement, modifiers) {
  if (modifiers === void 0) {
    modifiers = [];
  }

  var selectorObj = {};
  Object.defineProperty(selectorObj, 'name', {
    value: blockElement(),
    enumerable: true
  });
  modifiers.forEach(function (modifier) {
    var selector = modifier.split('-').reduce(function (prev, curr) {
      return "" + prev + curr[0].toUpperCase() + curr.slice(1);
    });
    Object.defineProperty(selectorObj, selector, {
      value: blockElement(modifier),
      enumerable: true
    });
  });
  return selectorObj;
};

var directions = ['dir-left', 'dir-right', 'dir-top', 'dir-bottom'];
var menuBlock = /*#__PURE__*/bem(menuClass);
var menuSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(), /*#__PURE__*/['state-opening', 'state-open', 'state-closing', 'state-closed'].concat(directions));
var menuArrowSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(menuArrowClass), directions);
var menuItemSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(menuItemClass), ['hover', 'disabled', 'anchor', 'checked', 'open', 'submenu', 'focusable', 'type-radio', 'type-checkbox']);
var menuDividerSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(menuDividerClass));
var menuHeaderSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(menuHeaderClass));
var menuGroupSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(menuGroupClass));
var radioGroupSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(radioGroupClass));
var submenuSelector = /*#__PURE__*/createSelector( /*#__PURE__*/menuBlock(subMenuClass));
var menuContainerSelector = /*#__PURE__*/createSelector( /*#__PURE__*/ /*#__PURE__*/bem(menuContainerClass)(), ['itemTransition']);
var menuButtonSelector = /*#__PURE__*/createSelector( /*#__PURE__*/ /*#__PURE__*/bem(menuButtonClass)(), ['open']);

exports.menuArrowSelector = menuArrowSelector;
exports.menuButtonSelector = menuButtonSelector;
exports.menuContainerSelector = menuContainerSelector;
exports.menuDividerSelector = menuDividerSelector;
exports.menuGroupSelector = menuGroupSelector;
exports.menuHeaderSelector = menuHeaderSelector;
exports.menuItemSelector = menuItemSelector;
exports.menuSelector = menuSelector;
exports.radioGroupSelector = radioGroupSelector;
exports.submenuSelector = submenuSelector;
