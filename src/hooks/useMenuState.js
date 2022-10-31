import { useCallback, useRef, useState } from 'react';
import { useTransition } from 'react-transition-state';
import { MenuStateMap, getTransition } from '../utils';

export const useMenuState = ({
  initialMounted,
  unmountOnClose,
  transition,
  transitionTimeout = 500
} = {}) => {
  const [anchorPoint, setAnchorPoint] = useState();
  const anchorRef = useRef(null);

  const [state, toggleMenu, endTransition] = useTransition({
    mountOnEnter: !initialMounted,
    unmountOnExit: unmountOnClose,
    timeout: transitionTimeout,
    enter: getTransition(transition, 'open'),
    exit: getTransition(transition, 'close')
  });

  const setAnchor = useCallback((value) => {
    if (value === null) {
      anchorRef.current = null;
      setAnchorPoint(undefined);
      return;
    }

    if (value instanceof Element) {
      anchorRef.current = value;
      setAnchorPoint(undefined);
      return;
    }

    setAnchorPoint(value);
    anchorRef.current = null;
  }, []);

  return [
    { state: MenuStateMap[state], endTransition, anchorPoint, anchorRef },
    toggleMenu,
    setAnchor
  ];
};
