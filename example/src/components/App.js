import { useEffect } from 'react';
import { useSnapshot } from 'reactish-state';
import { useRouter } from 'next/router';
import { bem, useLayoutEffect } from '../utils';
import { hydrate, domInfoState, isTocOpenState, toastState, showBannerState } from '../store';
import { Header } from './Header';
import { Footer } from './Footer';

const App = ({ children }) => {
  const showBanner = useSnapshot(showBannerState);
  const toast = useSnapshot(toastState);

  useLayoutEffect(() => {
    hydrate();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const info = {
        // Viewport size
        vWidth: document.documentElement.clientWidth,
        vHeight: window.innerHeight,
        navbarHeight: document.querySelector('#header').offsetHeight
      };

      if (info.vWidth > 950) isTocOpenState.set(false);
      domInfoState.set(info);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [/* effect dep */ showBanner]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => toastState.set(null), 2500);
    return () => clearTimeout(id);
  }, [toast]);

  const router = useRouter();
  useEffect(() => {
    isTocOpenState.set(false);
  }, [/* effect dep */ router]);

  return (
    <>
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
    </>
  );
};

export default App;
