import { useRef, useState, useEffect, useCallback } from 'react';

const UNMOUNTED = 'unmounted';
const ENTERING = 'entering';
const ENTERED = 'entered';
const EXITING = 'exiting';
const EXITED = 'exited';

const startOrEnd = unmounted => unmounted ? UNMOUNTED : EXITED;

const updateState = (nextState, setState, latestState, timeoutId) => {
    clearTimeout(timeoutId.current);
    setState(nextState);
    latestState.current = nextState;
};

export const useTransition = ({
    initialEntered,
    mountOnEnter,
    unmountOnExit,
    timeout,
    enter = true,
    exit = true
} = {}) => {
    const [state, setState] = useState(initialEntered ? ENTERED : startOrEnd(mountOnEnter));
    const latestState = useRef(state);
    const timeoutId = useRef();

    let enterTimeout, exitTimeout;
    if (typeof timeout === 'object') {
        enterTimeout = timeout.enter;
        exitTimeout = timeout.exit;
    } else {
        enterTimeout = exitTimeout = timeout;
    }

    const endTransition = useCallback(() => {
        let nextState;
        if (latestState.current === ENTERING) {
            nextState = ENTERED;
        } else if (latestState.current === EXITING) {
            nextState = startOrEnd(unmountOnExit);
        }
        if (nextState) {
            updateState(nextState, setState, latestState, timeoutId);
        }
    }, [unmountOnExit]);

    const setNextState = useCallback(nextState => {
        updateState(nextState, setState, latestState, timeoutId);
        if (enterTimeout >= 0 && nextState === ENTERING) {
            timeoutId.current = setTimeout(endTransition, enterTimeout);
        } else if (exitTimeout >= 0 && nextState === EXITING) {
            timeoutId.current = setTimeout(endTransition, exitTimeout);
        }
    }, [enterTimeout, exitTimeout, endTransition]);

    const transition = useCallback(toEnter => {
        const enterStage = latestState.current === ENTERING || latestState.current === ENTERED;
        if (typeof toEnter !== 'boolean') toEnter = !enterStage;

        if (toEnter) {
            if (!enterStage) {
                setNextState(enter ? ENTERING : ENTERED);
            }
        } else {
            if (enterStage) {
                setNextState(exit ? EXITING : startOrEnd(unmountOnExit));
            }
        }
    }, [enter, exit, unmountOnExit, setNextState]);

    useEffect(() => () => clearTimeout(timeoutId.current), []);

    return { state, transition, endTransition };
};
