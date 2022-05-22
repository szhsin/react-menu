import { useMemo } from 'react';

var useBEM = function useBEM(_ref) {
  var block = _ref.block,
      element = _ref.element,
      modifiers = _ref.modifiers,
      className = _ref.className;
  return useMemo(function () {
    var blockElement = element ? block + "__" + element : block;
    var classString = blockElement;

    for (var _i2 = 0, _Object$keys2 = Object.keys(modifiers || {}); _i2 < _Object$keys2.length; _i2++) {
      var name = _Object$keys2[_i2];
      var value = modifiers[name];

      if (value) {
        classString += " " + blockElement + "--";
        classString += value === true ? name : name + "-" + value;
      }
    }

    var expandedClassName = typeof className === 'function' ? className(modifiers) : className;

    if (typeof expandedClassName === 'string') {
      expandedClassName = expandedClassName.trim();
      if (expandedClassName) classString += " " + expandedClassName;
    }

    return classString;
  }, [block, element, modifiers, className]);
};

export { useBEM };
