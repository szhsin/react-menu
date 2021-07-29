import { useState, useCallback, useMemo } from 'react';
import { Keys } from '../utils';

// This function receive customKey as a single value rather than an array;
// It's intentional for keeping the argument's identity stable across each render.
export const useActiveState = (isHovering, isDisabled, customKey) => {
    const [active, setActive] = useState(false);
    const activeKeys = useMemo(() =>
        [Keys.SPACE, Keys.ENTER,
        ...(customKey ? [customKey] : [])],
        [customKey]);

    const cancelActive = useCallback(() => setActive(false), []);

    return {
        isActive: active,

        onPointerDown: useCallback(() => {
            if (!isDisabled) setActive(true);
        }, [isDisabled]),

        onPointerUp: cancelActive,

        onPointerLeave: cancelActive,

        onKeyDown: useCallback(e => {
            if (isHovering && !isDisabled && activeKeys.includes(e.key)) {
                setActive(true);
            }
        }, [isHovering, isDisabled, activeKeys]),

        onKeyUp: useCallback(e => {
            if (activeKeys.includes(e.key)) {
                setActive(false);
            }
        }, [activeKeys]),

        onBlur: useCallback(e => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
                setActive(false);
            }
        }, [])
    }
}
