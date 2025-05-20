import { useContext, useEffect } from 'react';
import { SettingsContext, MenuListItemContext, HoverActionTypes } from '../utils';
import { useItemEffect } from './useItemEffect';
import { useMouseOver } from './useMouseOver';

// This hook includes some common stateful logic in MenuItem and FocusableItem
export const useItemState = (itemRef, focusRef, isHovering, isDisabled) => {
  const [mouseOver, mouseOverStart, mouseOverEnd] = useMouseOver(isHovering);
  const { submenuCloseDelay } = useContext(SettingsContext);
  const { isParentOpen, submenuCtx, dispatch, updateItems } = useContext(MenuListItemContext);

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

  const onPointerMove = (e) => {
    if (!isDisabled) {
      e.stopPropagation();
      mouseOverStart();
      submenuCtx.on(submenuCloseDelay, setHover, setHover);
    }
  };

  const onPointerLeave = (_, keepHover) => {
    mouseOverEnd();
    submenuCtx.off();
    !keepHover && unsetHover();
  };

  useItemEffect(isDisabled, itemRef, updateItems);

  useEffect(() => {
    // Don't set focus when parent menu is closed, otherwise focus will be lost
    // and onBlur event will be fired with relatedTarget setting as null.
    if (isHovering && isParentOpen) {
      focusRef.current && focusRef.current.focus();
    }
  }, [focusRef, isHovering, isParentOpen]);

  return {
    mouseOver,
    setHover,
    onBlur,
    onPointerMove,
    onPointerLeave
  };
};
