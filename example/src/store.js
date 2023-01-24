import { state, useSnapshot } from 'reactish-state';
import { bem } from './utils';

export const showBannerState = state(false);
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
  localStorage.setItem('theme', theme);
});
export const hydrate = () => {
  const theme = localStorage.getItem('theme');
  if (theme === 'light') themeState.set(theme);
};
