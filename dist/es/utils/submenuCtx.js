const createSubmenuCtx = () => {
  let timer,
    count = 0;
  return {
    toggle: isOpen => {
      isOpen ? count++ : count--;
      count = Math.max(count, 0);
    },
    on: (closeDelay, pending, settled) => {
      if (count) {
        if (!timer) timer = setTimeout(() => {
          timer = 0;
          pending();
        }, closeDelay);
      } else {
        settled?.();
      }
    },
    off: () => {
      if (timer) {
        clearTimeout(timer);
        timer = 0;
      }
    }
  };
};

export { createSubmenuCtx };
