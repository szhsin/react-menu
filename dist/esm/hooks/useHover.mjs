import { useState } from 'react';
import { useClick } from './useClick.mjs';

const useHover = (isOpen, onToggle, {
  openDelay = 100,
  closeDelay = 300
} = {}) => {
  const [config] = useState({});
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
      ...useClick(isOpen, onToggle)
    },
    hoverProps: {
      ...props,
      onMouseEnter: clearTimer
    }
  };
};

export { useHover };
