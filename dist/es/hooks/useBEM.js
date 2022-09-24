import { useMemo } from 'react';

var useBEM = function useBEM(_ref) {
  var block = _ref.block,
      element = _ref.element,
      modifiers = _ref.modifiers,
      className = _ref.className;
  return useMemo(function () {
    var blockElement = element ? block + "__" + element : block;
    var classString = blockElement;
    modifiers && Object.keys(modifiers).forEach(function (name) {
      var value = modifiers[name];
      if (value) classString += " " + blockElement + "--" + (value === true ? name : name + "-" + value);
    });
    var expandedClassName = typeof className === 'function' ? className(modifiers) : className;

    if (typeof expandedClassName === 'string') {
      expandedClassName = expandedClassName.trim();
      if (expandedClassName) classString += " " + expandedClassName;
    }

    return classString;
  }, [block, element, modifiers, className]);
};

export { useBEM };
