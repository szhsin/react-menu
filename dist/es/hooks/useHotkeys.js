import { useEffect } from 'react';

var useHotkeys = function useHotkeys(onClick) {
  var hotKeys = function hotKeys() {};

  useEffect(function () {
    function logKey(e) {
      console.log('keydown', e.key);
      e.key === 'k' && onClick(e);
    }

    document.addEventListener('keydown', logKey);
    return function () {
      document.removeEventListener('keydown', logKey);
    };
  }, [onClick]);
  return hotKeys;
};

export { useHotkeys };
