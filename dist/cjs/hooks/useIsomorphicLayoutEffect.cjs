'use strict';

var react = require('react');

const useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? react.useLayoutEffect : react.useEffect;

exports.useLayoutEffect = useIsomorphicLayoutEffect;
