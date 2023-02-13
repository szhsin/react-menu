import { useState, useMemo } from 'react';

const useHover = (toggle, { openDelay = 100, closeDelay = 200 } = {}) => {
  const [config] = useState({});

  return useMemo(() => {
    if (process.env.NODE_ENV !== 'production' && typeof toggle !== 'function') {
      throw new Error('[React-Menu] useHover requires a toggle function in the first parameter.');
    }

    const clearTimer = () => clearTimeout(config.t);
    const delayAction = (toOpen) => () => {
      clearTimer();
      config.t = setTimeout(() => toggle(toOpen), toOpen ? openDelay : closeDelay);
    };
    const props = {
      onPointerEnter: delayAction(true),
      onPointerLeave: delayAction(false)
    };

    return {
      anchorProps: props,
      hoverProps: { ...props, onPointerEnter: clearTimer }
    };
  }, [toggle, config, openDelay, closeDelay]);
};

export { useHover };
