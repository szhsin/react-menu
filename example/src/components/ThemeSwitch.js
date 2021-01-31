import React, { useContext } from 'react';
import { bem, SettingContext } from '../utils';


export const ThemeSwitch = React.memo(function ThemeSwitch() {
    const { isDark, theme, setTheme } = useContext(SettingContext);

    return (
        <input className={bem('theme-switch', null, { theme })}
            type="checkbox"
            onChange={e => setTheme(e.target.checked ? 'dark' : 'light')}
            checked={isDark} />
    );
});
