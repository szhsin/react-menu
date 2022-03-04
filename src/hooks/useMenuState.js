import { useTransition } from 'react-transition-state';
import { MenuStateMap, getTransition } from '../utils';

export const useMenuState = ({
  initialMounted,
  unmountOnClose,
  transition,
  transitionTimeout
} = {}) => {
  const [state, toggleMenu, endTransition] = useTransition({
    mountOnEnter: !initialMounted,
    unmountOnExit: unmountOnClose,
    timeout: transitionTimeout,
    enter: getTransition(transition, 'open'),
    exit: getTransition(transition, 'close')
  });

  return [{ state: MenuStateMap[state], endTransition }, toggleMenu];
};
