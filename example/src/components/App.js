import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  bem,
  DomInfoContext,
  SettingContext,
  TocContext,
  ToastContext,
  useLayoutEffect
} from '../utils';
import { Header } from './Header';
import { Footer } from './Footer';

const App = ({ children }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [theme, setTheme] = useState('dark');
  const setAndSaveTheme = useCallback((theme) => {
    setTheme(theme);
    document.body.className = bem('szh-app', null, { theme });
    try {
      localStorage.setItem('theme', theme);
    } catch (err) {
      console.warn(err);
    }
  }, []);
  const setting = useMemo(
    () => ({
      isDark: theme === 'dark',
      theme,
      setTheme: setAndSaveTheme,
      showBanner,
      setShowBanner
    }),
    [theme, setAndSaveTheme, showBanner]
  );
  useLayoutEffect(() => {
    try {
      const theme = localStorage.getItem('theme');
      if (theme === 'light') {
        setTheme(theme);
        document.body.className = bem('szh-app', null, { theme });
      }
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const [isTocOpen, setTocOpen] = useState(false);
  const tocContext = useMemo(() => ({ isTocOpen, setTocOpen }), [isTocOpen]);

  const [domInfo, setDomInfo] = useState({});
  useEffect(() => {
    const handleResize = () => {
      const info = {
        // Viewport size
        vWidth: document.documentElement.clientWidth,
        vHeight: window.innerHeight,
        navbarHeight: document.querySelector('#header').offsetHeight
      };

      if (info.vWidth > 950) setTocOpen(false);
      setDomInfo(info);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [/* effect dep */ showBanner]);

  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(id);
  }, [toast]);

  const router = useRouter();
  useEffect(() => {
    setTocOpen(false);
  }, [/* effect dep */ router]);

  return (
    <DomInfoContext.Provider value={domInfo}>
      <SettingContext.Provider value={setting}>
        <TocContext.Provider value={tocContext}>
          <ToastContext.Provider value={setToast}>
            <Header />
            <div id="content" style={showBanner ? { marginTop: 40 } : undefined}>
              {children}
            </div>
            <Footer />
            {toast && (
              <div className={bem('szh-app', 'toast')} role="alert">
                {toast}
              </div>
            )}
          </ToastContext.Provider>
        </TocContext.Provider>
      </SettingContext.Provider>
    </DomInfoContext.Provider>
  );
};

export default App;
