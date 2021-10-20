import { useTransition } from 'react-transition-state';
import { getTransition } from '../utils/utils.js';
import { MenuStateMap } from '../utils/constants.js';

var useMenuState = function useMenuState(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      initialMounted = _ref.initialMounted,
      unmountOnClose = _ref.unmountOnClose,
      transition = _ref.transition,
      transitionTimeout = _ref.transitionTimeout;

  var _useTransition = useTransition({
    mountOnEnter: !initialMounted,
    unmountOnExit: unmountOnClose,
    timeout: transitionTimeout,
    enter: getTransition(transition, 'open'),
    exit: getTransition(transition, 'close')
  }),
      state = _useTransition[0],
      toggleMenu = _useTransition[1],
      endTransition = _useTransition[2];

  return {
    state: MenuStateMap[state],
    toggleMenu: toggleMenu,
    endTransition: endTransition
  };
};

export { useMenuState };
