import { useRef, useState, useEffect, useCallback } from 'react';

const PRE_ENTER = 0;
const ENTERING = 1;
const ENTERED = 2;
const PRE_EXIT = 3;
const EXITING = 4;
const EXITED = 5;
const UNMOUNTED = 6;
const STATES = ['preEnter', 'entering', 'entered', 'preExit', 'exiting', 'exited', 'unmounted'];

const startOrEnd = unmounted => unmounted ? UNMOUNTED : EXITED;

const updateState = (newState, setState, latestState, timeoutId) => {
    clearTimeout(timeoutId.current);
    setState(newState);
    latestState.current = newState;
};

export const useTransition = ({
    initialEntered,
    mountOnEnter,
    unmountOnExit,
    timeout,
    preState,
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
        let newState;
        switch (latestState.current) {
            case PRE_ENTER:
            case ENTERING:
                newState = ENTERED;
                break;
            case PRE_EXIT:
            case EXITING:
                newState = startOrEnd(unmountOnExit);
                break;
        }

        if (newState) {
            updateState(newState, setState, latestState, timeoutId);
        }
    }, [unmountOnExit]);

    const transitState = useCallback(newState => {
        updateState(newState, setState, latestState, timeoutId);

        switch (newState) {
            case PRE_ENTER:
            case PRE_EXIT:
                timeoutId.current = setTimeout(() => transitState(newState + 1), 0);
                break;
            case ENTERING:
                if (enterTimeout >= 0) timeoutId.current = setTimeout(endTransition, enterTimeout);
                break;
            case EXITING:
                if (exitTimeout >= 0) timeoutId.current = setTimeout(endTransition, exitTimeout);
                break;
        }
    }, [enterTimeout, exitTimeout, endTransition]);

    const transition = useCallback(toEnter => {
        const enterStage = latestState.current <= ENTERED;
        if (typeof toEnter !== 'boolean') toEnter = !enterStage;

        if (toEnter) {
            if (!enterStage) {
                transitState(enter ? (preState ? PRE_ENTER : ENTERING) : ENTERED);
            }
        } else {
            if (enterStage) {
                transitState(exit ? (preState ? PRE_EXIT : EXITING) : startOrEnd(unmountOnExit));
            }
        }
    }, [enter, exit, preState, unmountOnExit, transitState]);

    useEffect(() => () => clearTimeout(timeoutId.current), []);

    return { state: STATES[state], transition, endTransition };
};
