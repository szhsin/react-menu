import { extends as _extends } from '../_virtual/_rollupPluginBabelHelpers.js';
import { useMemo } from 'react';

var isObject = function isObject(obj) {
  return obj && typeof obj === 'object';
};

var sanitiseKey = function sanitiseKey(key) {
  return key[0] === '$' ? key.slice(1) : key;
};

var useFlatStyles = function useFlatStyles(styles, modifiers) {
  return useMemo(function () {
    if (typeof styles === 'function') return styles(modifiers);
    if (!isObject(styles)) return undefined;
    if (!modifiers) return styles;
    var style = {};

    for (var _i2 = 0, _Object$keys2 = Object.keys(styles); _i2 < _Object$keys2.length; _i2++) {
      var prop = _Object$keys2[_i2];
      var value = styles[prop];

      if (isObject(value)) {
        var modifierValue = modifiers[sanitiseKey(prop)];

        if (typeof modifierValue === 'string') {
          for (var _i4 = 0, _Object$keys4 = Object.keys(value); _i4 < _Object$keys4.length; _i4++) {
            var nestedProp = _Object$keys4[_i4];
            var nestedValue = value[nestedProp];

            if (isObject(nestedValue)) {
              if (sanitiseKey(nestedProp) === modifierValue) {
                style = _extends({}, style, nestedValue);
              }
            } else {
              style[nestedProp] = nestedValue;
            }
          }
        } else if (modifierValue) {
          style = _extends({}, style, value);
        }
      } else {
        style[prop] = value;
      }
    }

    return style;
  }, [styles, modifiers]);
};

export { useFlatStyles };
