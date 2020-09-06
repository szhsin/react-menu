import { useRef, useCallback, useMemo } from 'react';
import { keyCodes } from './constants';


export const useMenuList = (onClick, onClose) => {

    const containerRef = useRef(null);

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
            onClose();
        }
    }, [onClose]);

    return {
        containerRef, eventHandlers,
        onKeyDown: handleKeyDown, onBlur: handleBlur
    };
}
