'use strict';

var react = require('react');
var useClick = require('./useClick.cjs');

const useHover = (isOpen, onToggle, {
  openDelay = 100,
  closeDelay = 300
} = {}) => {
  const [config] = react.useState({});
  const clearTimer = () => clearTimeout(config.t);
  const delayAction = toOpen => e => {
    clearTimer();
    config.t = setTimeout(() => onToggle(toOpen, e), toOpen ? openDelay : closeDelay);
  };
  const props = {
    onMouseEnter: delayAction(true),
    onMouseLeave: delayAction(false)
  };
  return {
    anchorProps: {
      ...props,
      ...useClick.useClick(isOpen, onToggle)
    },
    hoverProps: {
      ...props,
      onMouseEnter: clearTimer
    }
  };
};

exports.useHover = useHover;
