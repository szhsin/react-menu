import { useState, useCallback, useMemo } from 'react';
import { Keys } from './constants';

// This function receive customKey as a single value rather than an array;
// It's intentional for keeping the argument's identity stable across each render.
export const useActiveState = (isHovering, customKey) => {
    const [active, setActive] = useState(false);
    const activeKeys = useMemo(() =>
        [Keys.SPACE, Keys.ENTER,
        ...(customKey ? [customKey] : [])],
        [customKey]);

    return {
        isActive: active,

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
            if (isHovering && activeKeys.includes(e.key)) {
                setActive(true);
            }
        }, [isHovering, activeKeys]),

        onKeyUp: useCallback(e => {
            if (activeKeys.includes(e.key)) {
                setActive(false);
            }
        }, [activeKeys]),

        onBlur: useCallback(e => {
            setActive(false);
        }, [])
    }
}
