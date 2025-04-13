'use strict';

var useIsomorphicLayoutEffect = require('./useIsomorphicLayoutEffect.cjs');

const useItemEffect = (isDisabled, itemRef, updateItems) => {
  useIsomorphicLayoutEffect.useLayoutEffect(() => {
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

exports.useItemEffect = useItemEffect;
