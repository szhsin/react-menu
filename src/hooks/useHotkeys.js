import { useEffect } from 'react';

export const useHotkeys = (onClick) => {
  const hotKeys = () => {};

  useEffect(() => {
    function logKey(e) {
      console.log('keydown', e.key);
      e.key === 'k' && onClick(e);
    }

    document.addEventListener('keydown', logKey);

    return () => {
      document.removeEventListener('keydown', logKey);
    };
  }, [onClick]);

  return hotKeys;
};
