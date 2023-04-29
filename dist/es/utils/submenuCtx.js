var createSubmenuCtx = function createSubmenuCtx() {
  var timer,
    count = 0;
  return {
    toggle: function toggle(isOpen) {
      isOpen ? count++ : count--;
      count = Math.max(count, 0);
    },
    on: function on(closeDelay, pending, settled) {
      if (count) {
        if (!timer) timer = setTimeout(function () {
          timer = 0;
          pending();
        }, closeDelay);
      } else {
        settled == null ? void 0 : settled();
      }
    },
    off: function off() {
      if (timer) {
        clearTimeout(timer);
        timer = 0;
      }
    }
  };
};

export { createSubmenuCtx };
