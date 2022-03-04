import { useState, useCallback, useRef } from 'react';
import { HoverActionTypes, indexOfNode } from '../utils';

export const useItems = (menuRef) => {
  const [hoverItem, setHoverItem] = useState();
  const stateRef = useRef({
    items: [],
    hoverIndex: -1,
    sorted: false
  });
  const mutableState = stateRef.current;

  const updateItems = useCallback(
    (item, isMounted) => {
      const { items } = mutableState;
      if (!item) {
        mutableState.items = [];
      } else if (isMounted) {
        items.push(item);
      } else {
        const index = items.indexOf(item);
        if (index > -1) items.splice(index, 1);
      }
      mutableState.hoverIndex = -1;
      mutableState.sorted = false;
    },
    [mutableState]
  );

  const dispatch = useCallback(
    (actionType, item, nextIndex) => {
      const { items, hoverIndex } = mutableState;
      const sortItems = () => {
        if (mutableState.sorted) return;
        const orderedNodes = menuRef.current.querySelectorAll('.szh-menu__item');
        items.sort((a, b) => indexOfNode(orderedNodes, a) - indexOfNode(orderedNodes, b));
        mutableState.sorted = true;
      };

      let index = -1,
        newItem = undefined;
      switch (actionType) {
        case HoverActionTypes.RESET:
          break;

        case HoverActionTypes.SET:
          newItem = item;
          break;

        case HoverActionTypes.UNSET:
          newItem = (prevItem) => (prevItem === item ? undefined : prevItem);
          break;

        case HoverActionTypes.FIRST:
          sortItems();
          index = 0;
          newItem = items[index];
          break;

        case HoverActionTypes.LAST:
          sortItems();
          index = items.length - 1;
          newItem = items[index];
          break;

        case HoverActionTypes.SET_INDEX:
          sortItems();
          index = nextIndex;
          newItem = items[index];
          break;

        case HoverActionTypes.INCREASE:
          sortItems();
          index = hoverIndex;
          if (index < 0) index = items.indexOf(item);
          index++;
          if (index >= items.length) index = 0;
          newItem = items[index];
          break;

        case HoverActionTypes.DECREASE:
          sortItems();
          index = hoverIndex;
          if (index < 0) index = items.indexOf(item);
          index--;
          if (index < 0) index = items.length - 1;
          newItem = items[index];
          break;

        default:
          if (process.env.NODE_ENV !== 'production')
            throw new Error(`[React-Menu] Unknown hover action type: ${actionType}`);
      }

      if (!newItem) index = -1;
      setHoverItem(newItem);
      mutableState.hoverIndex = index;
    },
    [menuRef, mutableState]
  );

  return { hoverItem, dispatch, updateItems };
};
