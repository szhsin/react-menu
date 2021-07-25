import { useMemo } from 'react';

// Adapted from material-ui
// https://github.com/mui-org/material-ui/blob/f996027d00e7e4bff3fc040786c1706f9c6c3f82/packages/material-ui-utils/src/useForkRef.ts

const setRef = (ref, element) => {
    if (typeof ref === 'function') {
        ref(element);
    } else if (ref) {
        ref.current = element;
    }
}

export const useCombinedRef = (refA, refB) => useMemo(() => {
    if (!refA) return refB;
    if (!refB) return refA;

    return element => {
        setRef(refA, element);
        setRef(refB, element);
    };
}, [refA, refB]);
