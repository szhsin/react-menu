import { useTransition } from 'react-transition-state';
import { MenuStateMap, getTransition } from '../utils';

export const useMenuState = ({
  initialOpen,
  initialMounted,
  unmountOnClose,
  transition,
  transitionTimeout = 500
} = {}) => {
  const [{ status }, toggleMenu, endTransition] = useTransition({
    initialEntered: initialOpen,
    mountOnEnter: !initialMounted,
    unmountOnExit: unmountOnClose,
    timeout: transitionTimeout,
    enter: getTransition(transition, 'open'),
    exit: getTransition(transition, 'close')
  });

  return [{ state: MenuStateMap[status], endTransition }, toggleMenu];
};
