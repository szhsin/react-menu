import { state, useSnapshot } from 'reactish-state';
import { bem } from './utils';

export const showBannerState = state(true);
export const isTocOpenState = state(false);
export const toastState = state(null);

export const domInfoState = state({});
export const useDomInfo = () => useSnapshot(domInfoState);

export const themeState = state('dark');
export const useTheme = () => {
  const theme = useSnapshot(themeState);
  return {
    isDark: theme === 'dark',
    theme
  };
};
themeState.subscribe(() => {
  const theme = themeState.get();
  document.body.className = bem('szh-app', null, { theme });
  try {
    localStorage.setItem('theme', theme);
  } catch {
    // continue regardless of error
  }
});
export const hydrate = () => {
  try {
    const theme = localStorage.getItem('theme');
    if (theme === 'light') themeState.set(theme);
  } catch {
    // continue regardless of error
  }
};
