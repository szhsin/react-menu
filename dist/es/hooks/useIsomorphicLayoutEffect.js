import { useLayoutEffect, useEffect } from 'react';

var useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? useLayoutEffect : useEffect;

export { useIsomorphicLayoutEffect as useLayoutEffect };
