import { useState } from 'react';

var useClick = function useClick(state, onToggle) {
  if (process.env.NODE_ENV !== 'production' && typeof onToggle !== 'function') {
    throw new Error('[React-Menu] useClick/useHover requires a function in the second parameter.');
  }
  var _useState = useState({}),
    skipOpen = _useState[0];
  return {
    onMouseDown: function onMouseDown() {
      skipOpen.v = state && state !== 'closed';
    },
    onClick: function onClick(e) {
      return skipOpen.v ? skipOpen.v = false : onToggle(true, e);
    }
  };
};

export { useClick };
