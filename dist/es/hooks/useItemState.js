import { useContext, useEffect } from 'react';
import { useItemEffect } from './useItemEffect.js';
import { SettingsContext, MenuListItemContext, HoverActionTypes } from '../utils/constants.js';

const useItemState = (itemRef, focusRef, isHovering, isDisabled) => {
  const {
    submenuCloseDelay
  } = useContext(SettingsContext);
  const {
    isParentOpen,
    submenuCtx,
    dispatch,
    updateItems
  } = useContext(MenuListItemContext);
  const setHover = () => {
    !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);
  };
  const unsetHover = () => {
    !isDisabled && dispatch(HoverActionTypes.UNSET, itemRef.current);
  };
  const onBlur = e => {
    if (isHovering && !e.currentTarget.contains(e.relatedTarget)) unsetHover();
  };
  const onPointerMove = e => {
    if (!isDisabled) {
      e.stopPropagation();
      submenuCtx.on(submenuCloseDelay, setHover, setHover);
    }
  };
  const onPointerLeave = (_, keepHover) => {
    submenuCtx.off();
    !keepHover && unsetHover();
  };
  useItemEffect(isDisabled, itemRef, updateItems);
  useEffect(() => {
    if (isHovering && isParentOpen) {
      focusRef.current && focusRef.current.focus();
    }
  }, [focusRef, isHovering, isParentOpen]);
  return {
    setHover,
    onBlur,
    onPointerMove,
    onPointerLeave
  };
};

export { useItemState };
