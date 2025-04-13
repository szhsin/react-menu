'use strict';

var react = require('react');

function setRef(ref, instance) {
  typeof ref === 'function' ? ref(instance) : ref.current = instance;
}
const useCombinedRef = (refA, refB) => react.useMemo(() => {
  if (!refA) return refB;
  if (!refB) return refA;
  return instance => {
    setRef(refA, instance);
    setRef(refB, instance);
  };
}, [refA, refB]);

exports.useCombinedRef = useCombinedRef;
