import { useRef, useEffect } from 'react';
import { safeCall } from '../utils';

export const useMenuChange = (onMenuChange, isOpen) => {
  const prevOpen = useRef(isOpen);

  useEffect(() => {
    if (prevOpen.current !== isOpen) safeCall(onMenuChange, { open: isOpen });
    prevOpen.current = isOpen;
  }, [onMenuChange, isOpen]);
};
