import { useRef, useCallback, useMemo } from 'react';
import { KeyCodes } from './constants';


export const useMenuList = (animation, onClick, onClose) => {

    const containerRef = useRef(null);

    const settings = useMemo(() => ({
        animation
    }), [animation]);

    const eventHandlers = useMemo(() => ({
        handleClick(event, isStopPropagation, isCheckorRadio) {
            // According to WAI-ARIA Authoring Practices 1.1
            // Keep menu open when check or radio is invoked by SPACE key
            if (!isCheckorRadio || event.keyCode !== KeyCodes.SPACE) {
                onClose(event);
            }

            if (!isStopPropagation) onClick && onClick(event);
        }
    }), [onClick, onClose]);

    const handleKeyDown = useCallback(({ keyCode }) => {
        switch (keyCode) {
            case KeyCodes.ESC:
                onClose({ keyCode });
                break;
        }
    }, [onClose]);

    const handleBlur = useCallback(e => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            onClose({});
        }
    }, [onClose]);

    return {
        containerRef, settings, eventHandlers,
        onKeyDown: handleKeyDown, onBlur: handleBlur
    };
}
