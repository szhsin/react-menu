import { useCallback } from 'react';
import { useTransitionState } from 'react-transition-state';
import { MenuStateMap } from '../utils/constants.js';
import { getTransition } from '../utils/utils.js';

const useMenuState = ({
  initialOpen,
  initialMounted,
  unmountOnClose,
  transition,
  transitionTimeout = 500,
  onMenuChange
} = {}) => {
  const enter = getTransition(transition, 'open');
  const exit = getTransition(transition, 'close');
  const [{
    status
  }, toggleMenu, endTransition] = useTransitionState({
    initialEntered: initialOpen,
    mountOnEnter: !initialMounted,
    unmountOnExit: unmountOnClose,
    timeout: transitionTimeout,
    enter,
    exit,
    onStateChange: useCallback(({
      current: {
        isEnter,
        isResolved
      }
    }) => {
      if (!onMenuChange || isEnter && enter && isResolved || !isEnter && exit && isResolved) {
        return;
      }
      onMenuChange({
        open: isEnter
      });
    }, [onMenuChange, enter, exit])
  });
  return [{
    state: MenuStateMap[status],
    endTransition
  }, toggleMenu];
};

export { useMenuState };
