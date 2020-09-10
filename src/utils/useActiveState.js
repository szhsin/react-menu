import { useState, useCallback, useMemo } from 'react';
import { keyCodes } from './constants';

// This function receive custom KeyCode as a single value rather than an array;
// It's intentional for keeping the argument's identity stable across each render.
export const useActiveState = (customKeyCode) => {
    const [active, setActive] = useState(false);
    const activeKeyCodes = useMemo(() =>
        [keyCodes.SPACE, keyCodes.RETURN,
        ...(customKeyCode ? [customKeyCode] : [])],
        [customKeyCode]);

    return {
        active,

        onPointerDown: useCallback(e => {
            e.currentTarget.setPointerCapture(e.pointerId);
            setActive(true);
        }, []),

        onPointerUp: useCallback(e => {
            e.currentTarget.releasePointerCapture(e.pointerId);
        }, []),

        onLostPointerCapture: useCallback(e => {
            setActive(false);
        }, []),

        onKeyDown: useCallback(e => {
            if (activeKeyCodes.includes(e.keyCode)) {
                setActive(true);
            }
        }, [activeKeyCodes]),

        onKeyUp: useCallback(e => {
            if (activeKeyCodes.includes(e.keyCode)) {
                setActive(false);
            }
        }, [activeKeyCodes]),

        onBlur: useCallback(e => {
            setActive(false);
        }, [])
    }
}
