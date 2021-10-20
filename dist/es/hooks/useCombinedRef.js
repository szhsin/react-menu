import { useMemo } from 'react';

var setRef = function setRef(ref, element) {
  if (typeof ref === 'function') {
    ref(element);
  } else if (ref) {
    ref.current = element;
  }
};

var useCombinedRef = function useCombinedRef(refA, refB) {
  return useMemo(function () {
    if (!refA) return refB;
    if (!refB) return refA;
    return function (element) {
      setRef(refA, element);
      setRef(refB, element);
    };
  }, [refA, refB]);
};

export { useCombinedRef };
