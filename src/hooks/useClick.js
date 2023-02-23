import { useState } from 'react';

const useClick = (state, onToggle) => {
  if (process.env.NODE_ENV !== 'production' && typeof onToggle !== 'function') {
    throw new Error('[React-Menu] useClick/useHover requires a function in the second parameter.');
  }

  const [skipOpen] = useState({});

  return {
    onMouseDown: () => {
      skipOpen.v = state && state !== 'closed';
    },
    onClick: (e) => (skipOpen.v ? (skipOpen.v = false) : onToggle(true, e))
  };
};

export { useClick };
