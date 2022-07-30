import { useState, useRef, useCallback } from 'react';
import { HoverActionTypes } from '../utils/constants.js';
import { indexOfNode } from '../utils/utils.js';

var useItems = function useItems(menuRef, focusRef) {
  var _useState = useState(),
      hoverItem = _useState[0],
      setHoverItem = _useState[1];

  var stateRef = useRef({
    items: [],
    hoverIndex: -1,
    sorted: false
  });
  var mutableState = stateRef.current;
  var updateItems = useCallback(function (item, isMounted) {
    var items = mutableState.items;

    if (!item) {
      mutableState.items = [];
    } else if (isMounted) {
      items.push(item);
    } else {
      var index = items.indexOf(item);

      if (index > -1) {
        items.splice(index, 1);

        if (item.contains(document.activeElement)) {
          focusRef.current.focus();
          setHoverItem();
        }
      }
    }

    mutableState.hoverIndex = -1;
    mutableState.sorted = false;
  }, [mutableState, focusRef]);
  var dispatch = useCallback(function (actionType, item, nextIndex) {
    var items = mutableState.items,
        hoverIndex = mutableState.hoverIndex;

    var sortItems = function sortItems() {
      if (mutableState.sorted) return;
      var orderedNodes = menuRef.current.querySelectorAll('.szh-menu__item');
      items.sort(function (a, b) {
        return indexOfNode(orderedNodes, a) - indexOfNode(orderedNodes, b);
      });
      mutableState.sorted = true;
    };

    var index = -1,
        newItem = undefined;

    switch (actionType) {
      case HoverActionTypes.RESET:
        break;

      case HoverActionTypes.SET:
        newItem = item;
        break;

      case HoverActionTypes.UNSET:
        newItem = function newItem(prevItem) {
          return prevItem === item ? undefined : prevItem;
        };

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
        if (process.env.NODE_ENV !== 'production') throw new Error("[React-Menu] Unknown hover action type: " + actionType);
    }

    if (!newItem) index = -1;
    setHoverItem(newItem);
    mutableState.hoverIndex = index;
  }, [menuRef, mutableState]);
  return {
    hoverItem: hoverItem,
    dispatch: dispatch,
    updateItems: updateItems
  };
};

export { useItems };
