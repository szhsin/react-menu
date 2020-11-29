import { useEffect, useLayoutEffect } from 'react'

// Get around a warning when using useLayoutEffect on the server.
// https://github.com/reduxjs/react-redux/blob/b48d087d76f666e1c6c5a9713bbec112a1631841/src/utils/useIsomorphicLayoutEffect.js#L12
// https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
// https://github.com/facebook/react/issues/14927#issuecomment-549457471

const useIsomorphicLayoutEffect =
    typeof window !== 'undefined' &&
        typeof window.document !== 'undefined' &&
        typeof window.document.createElement !== 'undefined'
        ? useLayoutEffect
        : useEffect;

export { useIsomorphicLayoutEffect as useLayoutEffect };
