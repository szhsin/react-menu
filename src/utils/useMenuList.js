import { useRef, useCallback, useMemo } from 'react';
import { keyCodes } from './constants';


export const useMenuList = (animation, onClick, onClose) => {

    const containerRef = useRef(null);

    const settings = useMemo(() => ({
        animation
    }), [animation]);

    const eventHandlers = useMemo(() => ({
        handleClick(event, isStopPropagation, isKeyboardEvent) {
            onClose(isKeyboardEvent);
            if (!isStopPropagation) onClick && onClick(event);
        }
    }), [onClick, onClose]);

    const handleKeyDown = useCallback(e => {
        switch (e.keyCode) {
            case keyCodes.ESC:
                onClose(true);
                break;
        }
    }, [onClose]);

    const handleBlur = useCallback(e => {
        if (!containerRef.current.contains(e.relatedTarget)) {
            console.log(e.relatedTarget);
            onClose();
        }
    }, [onClose]);

    return {
        containerRef, settings, eventHandlers,
        onKeyDown: handleKeyDown, onBlur: handleBlur
    };
}
