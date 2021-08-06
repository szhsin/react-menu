import { useTransition } from './useTransition';
import { MenuStateMap, getTransition } from '../utils';

export const useMenuState = ({
    initialMounted,
    unmountOnClose,
    transition,
    transitionTimeout
} = {}) => {
    const { state, transition: toggleMenu, endTransition } = useTransition({
        mountOnEnter: !initialMounted,
        unmountOnExit: unmountOnClose,
        timeout: transitionTimeout,
        enter: getTransition(transition, 'open'),
        exit: getTransition(transition, 'close')
    });

    return {
        state: MenuStateMap[state],
        toggleMenu,
        endTransition
    };
}
