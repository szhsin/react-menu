import { useContext, useEffect } from 'react';
import { useItemEffect } from './useItemEffect.js';
import { SettingsContext, MenuListItemContext, HoverActionTypes } from '../utils/constants.js';

var useItemState = function useItemState(itemRef, focusRef, isHovering, isDisabled) {
  var _useContext = useContext(SettingsContext),
    submenuCloseDelay = _useContext.submenuCloseDelay;
  var _useContext2 = useContext(MenuListItemContext),
    isParentOpen = _useContext2.isParentOpen,
    submenuCtx = _useContext2.submenuCtx,
    dispatch = _useContext2.dispatch,
    updateItems = _useContext2.updateItems;
  var setHover = function setHover() {
    !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);
  };
  var unsetHover = function unsetHover() {
    !isDisabled && dispatch(HoverActionTypes.UNSET, itemRef.current);
  };
  var onBlur = function onBlur(e) {
    if (isHovering && !e.currentTarget.contains(e.relatedTarget)) unsetHover();
  };
  var onPointerMove = function onPointerMove(e) {
    if (!isDisabled) {
      e.stopPropagation();
      submenuCtx.on(submenuCloseDelay, setHover, setHover);
    }
  };
  var onPointerLeave = function onPointerLeave(_, keepHover) {
    submenuCtx.off();
    !keepHover && unsetHover();
  };
  useItemEffect(isDisabled, itemRef, updateItems);
  useEffect(function () {
    if (isHovering && isParentOpen) {
      focusRef.current && focusRef.current.focus();
    }
  }, [focusRef, isHovering, isParentOpen]);
  return {
    setHover: setHover,
    onBlur: onBlur,
    onPointerMove: onPointerMove,
    onPointerLeave: onPointerLeave
  };
};

export { useItemState };
