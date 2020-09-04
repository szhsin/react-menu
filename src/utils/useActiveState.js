import { useState, useCallback } from 'react';
import { keyCodes } from './constants';

export const useActiveState = (...customKeyCodes) => {
    const [active, setActive] = useState(false);
    const activeKeyCodes = [keyCodes.SPACE, keyCodes.RETURN, ...customKeyCodes];

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
        }, []),

        onKeyUp: useCallback(e => {
            if (activeKeyCodes.includes(e.keyCode)) {
                setActive(false);
            }
        }, []),

        onBlur: useCallback(e => {
            setActive(false);
        }, [])
    };
}
