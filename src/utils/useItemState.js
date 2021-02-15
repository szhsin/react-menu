import {
    useRef,
    useContext,
    useCallback,
    useEffect
} from 'react';
import {
    MenuListContext,
    HoverIndexActionTypes,
    SUBMENU_CLOSE_DELAY
} from './constants';


// This hook includes some common stateful logic in MenuItem and FocusableItem
export const useItemState = (isDisabled, index) => {
    const ref = useRef(null);
    const { isParentOpen, hoverIndex, isSubmenuOpen, dispatch } = useContext(MenuListContext);
    const isHovering = hoverIndex === index;
    const timeoutId = useRef();

    useEffect(() => {
        // Don't set focus when parent menu is closed, otherwise focus will be lost
        // and onBlur event will be fired with relatedTarget setting as null.
        if (isHovering && isParentOpen) {
            ref.current && ref.current.focus();
        }
    }, [isHovering, isParentOpen]);

    const setHover = useCallback(() => {
        if (!isDisabled) dispatch({ type: HoverIndexActionTypes.SET, index });
    }, [isDisabled, dispatch, index]);

    const onBlur = useCallback(e => {
        // Focus has moved out of the entire item
        // It handles situation such as clicking on a sibling disabled menu item
        if (!e.currentTarget.contains(e.relatedTarget)) {
            dispatch({ type: HoverIndexActionTypes.UNSET, index });
        }
    }, [dispatch, index]);

    const onMouseEnter = useCallback(() => {
        if (isSubmenuOpen) {
            timeoutId.current = setTimeout(setHover, SUBMENU_CLOSE_DELAY);
        } else {
            setHover();
        }
    }, [isSubmenuOpen, setHover]);

    const onMouseLeave = useCallback((_, keepHover) => {
        timeoutId.current && clearTimeout(timeoutId.current);
        if (!keepHover) dispatch({ type: HoverIndexActionTypes.UNSET, index });
    }, [dispatch, index]);

    return {
        ref,
        isHovering,
        setHover,
        onBlur,
        onMouseEnter,
        onMouseLeave
    };
}
