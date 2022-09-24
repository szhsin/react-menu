import { useMemo } from 'react';

// Adapted from material-ui
// https://github.com/mui-org/material-ui/blob/f996027d00e7e4bff3fc040786c1706f9c6c3f82/packages/material-ui-utils/src/useForkRef.ts

function setRef(ref, instance) {
  typeof ref === 'function' ? ref(instance) : (ref.current = instance);
}

export const useCombinedRef = (refA, refB) =>
  useMemo(() => {
    if (!refA) return refB;
    if (!refB) return refA;

    return (instance) => {
      setRef(refA, instance);
      setRef(refB, instance);
    };
  }, [refA, refB]);
