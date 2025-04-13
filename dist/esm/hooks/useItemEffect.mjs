import { useLayoutEffect as useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect.mjs';

const useItemEffect = (isDisabled, itemRef, updateItems) => {
  useIsomorphicLayoutEffect(() => {
    if (process.env.NODE_ENV !== 'production' && !updateItems) {
      throw new Error(`[React-Menu] This menu item or submenu should be rendered under a menu: ${itemRef.current.outerHTML}`);
    }
    if (isDisabled) return;
    const item = itemRef.current;
    updateItems(item, true);
    return () => {
      updateItems(item);
    };
  }, [isDisabled, itemRef, updateItems]);
};

export { useItemEffect };
