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
export const useItemState = (isDisabled, index) => {
    const ref = useRef(null);
    const { isParentOpen, hoverIndex, dispatch } = useContext(MenuListContext);
    const isHovering = hoverIndex === index;

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

        setHover: useCallback(() => {
            if (!isDisabled) dispatch({ type: HoverIndexActionTypes.SET, index });
        }, [isDisabled, dispatch, index]),

        unsetHover: useCallback(() => {
            dispatch({ type: HoverIndexActionTypes.UNSET, index });
        }, [dispatch, index])
    };
}
