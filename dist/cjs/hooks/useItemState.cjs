'use strict';

var react = require('react');
var useItemEffect = require('./useItemEffect.cjs');
var useMouseOver = require('./useMouseOver.cjs');
var constants = require('../utils/constants.cjs');

const useItemState = (itemRef, focusRef, isHovering, isDisabled) => {
  const [mouseOver, mouseOverStart, mouseOverEnd] = useMouseOver.useMouseOver(isHovering);
  const {
    submenuCloseDelay
  } = react.useContext(constants.SettingsContext);
  const {
    isParentOpen,
    submenuCtx,
    dispatch,
    updateItems
  } = react.useContext(constants.MenuListItemContext);
  const setHover = () => {
    !isHovering && !isDisabled && dispatch(constants.HoverActionTypes.SET, itemRef.current);
  };
  const unsetHover = () => {
    !isDisabled && dispatch(constants.HoverActionTypes.UNSET, itemRef.current);
  };
  const onBlur = e => {
    if (isHovering && !e.currentTarget.contains(e.relatedTarget)) unsetHover();
  };
  const onPointerMove = e => {
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
  useItemEffect.useItemEffect(isDisabled, itemRef, updateItems);
  react.useEffect(() => {
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

exports.useItemState = useItemState;
