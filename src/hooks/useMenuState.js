import { useTransition } from './useTransition';
import { getTransition } from '../utils';

const STATE_MAP = {
    entering: 'opening',
    entered: 'open',
    exiting: 'closing',
    exited: 'closed',
    unmounted: 'unmounted'
};

export const useMenuState = ({
    initialMounted,
    unmountOnClose,
    transition
} = {}) => {
    const { state, transition: toggleMenu, endTransition } = useTransition({
        mountOnEnter: !initialMounted,
        unmountOnExit: unmountOnClose,
        enter: getTransition(transition, 'open'),
        exit: getTransition(transition, 'close')
    });

    return {
        state: STATE_MAP[state],
        toggleMenu,
        endTransition
    };
}
