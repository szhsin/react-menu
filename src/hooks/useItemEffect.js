import { useEffect } from 'react';

export const useItemEffect = (isDisabled, itemRef, updateItems) => {
  useEffect(() => {
    if (isDisabled) return;
    const item = itemRef.current;
    updateItems(item, true);
    return () => {
      updateItems(item);
    };
  }, [isDisabled, itemRef, updateItems]);
};
