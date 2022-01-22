import { useContext, useRef, useEffect } from 'react';
import { ItemSettingsContext, MenuListItemContext, HoverIndexActionTypes } from '../utils/constants.js';

var useItemState = function useItemState(ref, index, isHovering, isDisabled) {
  var _useContext = useContext(ItemSettingsContext),
      submenuCloseDelay = _useContext.submenuCloseDelay;

  var _useContext2 = useContext(MenuListItemContext),
      isParentOpen = _useContext2.isParentOpen,
      isSubmenuOpen = _useContext2.isSubmenuOpen,
      dispatch = _useContext2.dispatch;

  var timeoutId = useRef(0);

  var setHover = function setHover() {
    if (!isDisabled) dispatch({
      type: HoverIndexActionTypes.SET,
      index: index
    });
  };

  var onBlur = function onBlur(e) {
    if (isHovering && !e.currentTarget.contains(e.relatedTarget)) {
      dispatch({
        type: HoverIndexActionTypes.UNSET,
        index: index
      });
    }
  };

  var onMouseMove = function onMouseMove() {
    if (isHovering) return;

    if (isSubmenuOpen) {
      if (!timeoutId.current) timeoutId.current = setTimeout(setHover, submenuCloseDelay);
    } else {
      setHover();
    }
  };

  var onMouseLeave = function onMouseLeave(_, keepHover) {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = 0;
    }

    if (!keepHover) dispatch({
      type: HoverIndexActionTypes.UNSET,
      index: index
    });
  };

  useEffect(function () {
    return function () {
      return clearTimeout(timeoutId.current);
    };
  }, []);
  useEffect(function () {
    if (isHovering && isParentOpen) {
      ref.current && ref.current.focus();
    }
  }, [ref, isHovering, isParentOpen]);
  return {
    setHover: setHover,
    onBlur: onBlur,
    onMouseMove: onMouseMove,
    onMouseLeave: onMouseLeave
  };
};

export { useItemState };
