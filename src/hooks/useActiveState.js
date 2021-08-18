import { useState } from 'react';
import { Keys } from '../utils';

export const useActiveState = (isHovering, isDisabled, ...moreKeys) => {
    const [active, setActive] = useState(false);
    const activeKeys = [Keys.SPACE, Keys.ENTER, ...moreKeys];

    const cancelActive = () => setActive(false);

    return {
        isActive: active,

        onPointerDown: () => {
            if (!isDisabled) setActive(true);
        },

        onPointerUp: cancelActive,

        onPointerLeave: cancelActive,

        onKeyDown: e => {
            if (isHovering && !isDisabled && activeKeys.includes(e.key)) {
                setActive(true);
            }
        },

        onKeyUp: e => {
            if (activeKeys.includes(e.key)) {
                setActive(false);
            }
        },

        onBlur: e => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
                setActive(false);
            }
        }
    }
}
