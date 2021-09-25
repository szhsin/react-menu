import { useState } from 'react';
import { Keys } from '../utils';

export const useActiveState = (isHovering, isDisabled, ...moreKeys) => {
    const [active, setActive] = useState(false);
    const activeKeys = [Keys.ENTER, Keys.SPACE, ...moreKeys];

    const cancelActive = () => active && setActive(false);

    return {
        isActive: active,

        onPointerDown: () => {
            if (!isDisabled) setActive(true);
        },

        onPointerUp: cancelActive,

        onPointerLeave: cancelActive,

        onKeyDown: e => {
            if (!active && isHovering && !isDisabled && activeKeys.indexOf(e.key) !== -1) {
                setActive(true);
            }
        },

        onKeyUp: e => {
            if (activeKeys.indexOf(e.key) !== -1) {
                setActive(false);
            }
        },

        onBlur: e => {
            if (active && !e.currentTarget.contains(e.relatedTarget)) {
                setActive(false);
            }
        }
    }
}
