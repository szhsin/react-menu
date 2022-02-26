import { useEffect } from 'react';

var useItemEffect = function useItemEffect(isDisabled, itemRef, updateItems) {
  useEffect(function () {
    if (isDisabled) return;
    var item = itemRef.current;
    updateItems(item, true);
    return function () {
      updateItems(item);
    };
  }, [isDisabled, itemRef, updateItems]);
};

export { useItemEffect };
