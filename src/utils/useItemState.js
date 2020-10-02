import {
    useRef,
    useContext,
    useCallback,
    useEffect
} from 'react';
import {
    MenuListContext,
    HoverIndexActionTypes
} from './constants';


// This hook includes some common stateful logic in MenuItem and FocusableItem
export const useItemState = (disabled, index) => {
    const ref = useRef(null);
    const { isParentOpen, hoverIndex, hoverIndexDispatch } = useContext(MenuListContext);
    const isHovering = hoverIndex === index;
    const isDisabled = disabled ? true : undefined;

    useEffect(() => {
        // Don't set focus when parent menu is closed, otherwise focus will be lost
        // and onBlur event will be fired with relatedTarget setting as null.
        if (isHovering && isParentOpen) {
            ref.current && ref.current.focus();
        }
    }, [isHovering, isParentOpen]);

    return {
        ref,

        isHovering,

        isDisabled,

        setHover: useCallback(() => {
            if (!isDisabled) hoverIndexDispatch({ type: HoverIndexActionTypes.SET, index });
        }, [isDisabled, hoverIndexDispatch, index]),

        unsetHover: useCallback(e => {
            // It handles situation such as clicking on a sibling disabled menu item
            if (!e.currentTarget.contains(e.relatedTarget)) {
                hoverIndexDispatch({ type: HoverIndexActionTypes.UNSET, index });
            }
        }, [hoverIndexDispatch, index])
    };
}
