import { useRef, useEffect } from 'react';
import { safeCall } from '../utils/utils.js';

var useMenuChange = function useMenuChange(onMenuChange, isOpen) {
  var prevOpen = useRef(isOpen);
  useEffect(function () {
    if (prevOpen.current !== isOpen) safeCall(onMenuChange, {
      open: isOpen
    });
    prevOpen.current = isOpen;
  }, [onMenuChange, isOpen]);
};

export { useMenuChange };
