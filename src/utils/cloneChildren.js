import { Children, cloneElement } from 'react';
import { getName } from './utils';

export const cloneChildren = (children, startIndex = 0, inRadioGroup) => {
  let index = startIndex;
  let descendOverflow = false;

  const items = Children.map(children, (child) => {
    if (child === undefined || child === null) return null;
    if (!child.type) return child;

    const name = getName(child.type);
    switch (name) {
      case 'MenuItem': {
        if (inRadioGroup) {
          const props = { type: 'radio' };
          if (!child.props.disabled) props.index = index++;
          return cloneElement(child, props);
        }
      } // Fall through when inRadioGroup is false
      case 'SubMenu': // eslint-disable-line no-fallthrough
      case 'FocusableItem':
        return child.props.disabled ? child : cloneElement(child, { index: index++ });

      default: {
        const innerChildren = child.props.children;
        if (innerChildren === null || typeof innerChildren !== 'object') return child;
        const desc = cloneChildren(innerChildren, index, inRadioGroup || name === 'MenuRadioGroup');
        index = desc.index;

        if (name === 'MenuGroup') {
          const takeOverflow = !!child.props.takeOverflow;
          const descOverflow = desc.descendOverflow;
          // https://stackoverflow.com/questions/3076078/check-if-at-least-two-out-of-three-booleans-are-true
          if (
            process.env.NODE_ENV !== 'production' &&
            (descendOverflow === descOverflow ? descOverflow : takeOverflow)
          ) {
            throw new Error(
              '[React-Menu] Only one MenuGroup in a menu is allowed to have takeOverflow prop.'
            );
          }
          descendOverflow = descendOverflow || descOverflow || takeOverflow;
        }
        return cloneElement(child, { children: desc.items });
      }
    }
  });

  return { items, index, descendOverflow };
};
