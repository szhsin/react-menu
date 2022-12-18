import { useRef, useContext, useEffect } from 'react';
import { ItemSettingsContext, MenuListItemContext, HoverActionTypes } from '../utils';
import { useItemEffect } from './useItemEffect';

// This hook includes some common stateful logic in MenuItem and FocusableItem
export const useItemState = (itemRef, focusRef, isHovering, isDisabled, disableFocus) => {
  const { submenuCloseDelay } = useContext(ItemSettingsContext);
  const { isParentOpen, isSubmenuOpen, dispatch, updateItems } = useContext(MenuListItemContext);
  const timeoutId = useRef(0);

  const setHover = () => {
    !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);
  };

  const unsetHover = () => {
    !isDisabled && dispatch(HoverActionTypes.UNSET, itemRef.current);
  };

  const onBlur = (e) => {
    // Focus has moved out of the entire item
    // It handles situation such as clicking on a sibling disabled menu item
    if (isHovering && !e.currentTarget.contains(e.relatedTarget)) unsetHover();
  };

  const onPointerMove = () => {
    if (isSubmenuOpen) {
      if (!timeoutId.current)
        timeoutId.current = setTimeout(() => {
          timeoutId.current = 0;
          setHover();
        }, submenuCloseDelay);
    } else {
      setHover();
    }
  };

  const onPointerLeave = (_, keepHover) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = 0;
    }

    !keepHover && unsetHover();
  };

  useItemEffect(isDisabled, itemRef, updateItems);
  useEffect(() => () => clearTimeout(timeoutId.current), []);
  useEffect(() => {
    // Don't set focus when parent menu is closed, otherwise focus will be lost
    // and onBlur event will be fired with relatedTarget setting as null.
    if (!disableFocus && isHovering && isParentOpen) {
      focusRef.current && focusRef.current.focus();
    }
  }, [focusRef, isHovering, isParentOpen, disableFocus]);

  return {
    setHover,
    onBlur,
    onPointerMove,
    onPointerLeave
  };
};
