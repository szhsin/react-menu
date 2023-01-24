import React from 'react';
import { useTheme, themeState } from '../store';
import { bem } from '../utils';

export const ThemeSwitch = React.memo(function ThemeSwitch() {
  const { isDark, theme } = useTheme();

  return (
    <input
      className={bem('theme-switch', null, { theme })}
      type="checkbox"
      onChange={(e) => themeState.set(e.target.checked ? 'dark' : 'light')}
      checked={isDark}
    />
  );
});
