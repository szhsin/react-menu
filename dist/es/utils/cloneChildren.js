import { Children, cloneElement } from 'react';
import { isProd, getName } from './utils.js';

var cloneChildren = function cloneChildren(children, startIndex, inRadioGroup) {
  if (startIndex === void 0) {
    startIndex = 0;
  }

  var index = startIndex;
  var descendOverflow = false;
  var items = Children.map(children, function (child) {
    if (child === undefined || child === null) return null;
    if (!child.type) return child;
    var name = getName(child.type);

    switch (name) {
      case 'MenuItem':
        {
          if (inRadioGroup) {
            var props = {
              type: 'radio'
            };
            if (!child.props.disabled) props.index = index++;
            return /*#__PURE__*/cloneElement(child, props);
          }
        }

      case 'SubMenu':
      case 'FocusableItem':
        return child.props.disabled ? child : /*#__PURE__*/cloneElement(child, {
          index: index++
        });

      default:
        {
          var innerChildren = child.props.children;
          if (innerChildren === null || typeof innerChildren !== 'object') return child;
          var desc = cloneChildren(innerChildren, index, inRadioGroup || name === 'MenuRadioGroup');
          index = desc.index;

          if (name === 'MenuGroup') {
            var takeOverflow = !!child.props.takeOverflow;
            var descOverflow = desc.descendOverflow;
            if (!isProd && (descendOverflow === descOverflow ? descOverflow : takeOverflow)) throw new Error('[React-Menu] Only one MenuGroup in a menu is allowed to have takeOverflow prop.');
            descendOverflow = descendOverflow || descOverflow || takeOverflow;
          }

          return /*#__PURE__*/cloneElement(child, {
            children: desc.items
          });
        }
    }
  });
  return {
    items: items,
    index: index,
    descendOverflow: descendOverflow
  };
};

export { cloneChildren };
