import { useTransition } from 'react-transition-state';
import { getTransition } from '../utils/utils.js';
import { MenuStateMap } from '../utils/constants.js';

const useMenuState = ({
  initialOpen,
  initialMounted,
  unmountOnClose,
  transition,
  transitionTimeout = 500
} = {}) => {
  const [{
    status
  }, toggleMenu, endTransition] = useTransition({
    initialEntered: initialOpen,
    mountOnEnter: !initialMounted,
    unmountOnExit: unmountOnClose,
    timeout: transitionTimeout,
    enter: getTransition(transition, 'open'),
    exit: getTransition(transition, 'close')
  });
  return [{
    state: MenuStateMap[status],
    endTransition
  }, toggleMenu];
};

export { useMenuState };
