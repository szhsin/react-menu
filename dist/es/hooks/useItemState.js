import { useContext, useRef, useEffect } from 'react';
import { useItemEffect } from './useItemEffect.js';
import { ItemSettingsContext, MenuListItemContext, HoverActionTypes } from '../utils/constants.js';

var useItemState = function useItemState(itemRef, focusRef, isHovering, isDisabled) {
  var _useContext = useContext(ItemSettingsContext),
      submenuCloseDelay = _useContext.submenuCloseDelay;

  var _useContext2 = useContext(MenuListItemContext),
      isParentOpen = _useContext2.isParentOpen,
      isSubmenuOpen = _useContext2.isSubmenuOpen,
      dispatch = _useContext2.dispatch,
      updateItems = _useContext2.updateItems;

  var timeoutId = useRef(0);

  var setHover = function setHover() {
    !isHovering && !isDisabled && dispatch(HoverActionTypes.SET, itemRef.current);
  };

  var unsetHover = function unsetHover() {
    !isDisabled && dispatch(HoverActionTypes.UNSET, itemRef.current);
  };

  var onBlur = function onBlur(e) {
    if (isHovering && !e.currentTarget.contains(e.relatedTarget)) unsetHover();
  };

  var onPointerMove = function onPointerMove() {
    if (isSubmenuOpen) {
      if (!timeoutId.current) timeoutId.current = setTimeout(function () {
        timeoutId.current = 0;
        setHover();
      }, submenuCloseDelay);
    } else {
      setHover();
    }
  };

  var onPointerLeave = function onPointerLeave(_, keepHover) {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = 0;
    }

    !keepHover && unsetHover();
  };

  useItemEffect(isDisabled, itemRef, updateItems);
  useEffect(function () {
    return function () {
      return clearTimeout(timeoutId.current);
    };
  }, []);
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
