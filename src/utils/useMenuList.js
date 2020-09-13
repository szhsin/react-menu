import { useRef, useCallback, useMemo } from 'react';
import { KeyCodes } from './constants';
import { safeCall } from './utils';


export const useMenuList = (animation, debugging, onClick, onClose) => {

    const containerRef = useRef(null);

    const settings = useMemo(() => ({
        animation,
        debugging
    }), [animation, debugging]);

    const eventHandlers = useMemo(() => ({
        handleClick(event, isStopPropagation, isCheckorRadio) {
            // According to WAI-ARIA Authoring Practices 1.1
            // Keep menu open when check or radio is invoked by SPACE key
            if (!isCheckorRadio || event.keyCode !== KeyCodes.SPACE) {
                safeCall(onClose, event);
            }

            if (!isStopPropagation) safeCall(onClick, event);
        }
    }), [onClick, onClose]);

    const handleKeyDown = useCallback(({ keyCode }) => {
        switch (keyCode) {
            case KeyCodes.ESC:
                safeCall(onClose, { keyCode });
                break;
        }
    }, [onClose]);

    const handleBlur = useCallback(e => {
        if (!e.currentTarget.contains(e.relatedTarget) && !debugging) {
            safeCall(onClose, {});
        }
    }, [debugging, onClose]);

    return {
        containerRef, settings, eventHandlers,
        onKeyDown: handleKeyDown, onBlur: handleBlur
    };
}
