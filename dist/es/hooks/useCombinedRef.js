import { useMemo } from 'react';

function setRef(ref, instance) {
  typeof ref === 'function' ? ref(instance) : ref.current = instance;
}
var useCombinedRef = function useCombinedRef(refA, refB) {
  return useMemo(function () {
    if (!refA) return refB;
    if (!refB) return refA;
    return function (instance) {
      setRef(refA, instance);
      setRef(refB, instance);
    };
  }, [refA, refB]);
};

export { useCombinedRef };
