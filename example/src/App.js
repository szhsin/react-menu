import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { bem, DomInfoContext, SettingContext, TocContext, ToastContext } from './utils';
import { Header } from './components/Header';
import { PageContent } from './components/PageContent';
import { Footer } from './components/Footer';


const App = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [theme, setTheme] = useState(() => {
        let theme
        try {
            theme = localStorage.getItem('theme');
        } catch (err) {
            console.log(err)
        }

        return theme === 'light' ? theme : 'dark';
    });
    const setAndSaveTheme = useCallback((theme) => {
        setTheme(theme);
        try {
            localStorage.setItem('theme', theme);
        } catch (err) {
            console.log(err)
        }
    }, []);
    const setting = useMemo(() => ({
        isDark: theme === 'dark',
        theme,
        setTheme: setAndSaveTheme,
        showBanner,
        setShowBanner
    }), [theme, setAndSaveTheme, showBanner]);
    useEffect(() => {
        document.body.className = bem('rc-app', null, { theme });
    }, [theme]);

    const [isTocOpen, setTocOpen] = useState(false);
    const tocContext = useMemo(() => ({ isTocOpen, setTocOpen }), [isTocOpen]);

    const [domInfo, setDomInfo] = useState({});
    useEffect(() => {
        const handleResize = () => {
            const info = {
                // Viewport size
                vWidth: document.documentElement.clientWidth,
                vHeight: window.innerHeight,

                navbarHeight: document.querySelector('#header').offsetHeight,
                // Table of Contents position
                tocPosition: getComputedStyle(document.querySelector('.table-contents'))
                    .getPropertyValue('position')
            };

            if (info.vWidth > 950) setTocOpen(false);
            setDomInfo(info);
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [showBanner]);

    const [toast, setToast] = useState(null);
    useEffect(() => {
        if (!toast) return;
        const id = setTimeout(() => setToast(null), 2500);
        return () => clearTimeout(id);
    }, [toast]);

    return (
        <DomInfoContext.Provider value={domInfo}>
            <SettingContext.Provider value={setting}>
                <TocContext.Provider value={tocContext}>
                    <ToastContext.Provider value={setToast}>
                        <Router basename="/react-menu-v1">
                            <Header />
                            <PageContent />
                            <Footer />
                            {toast && <div className={bem('rc-app', 'toast')}
                                role="alert">{toast}</div>}
                        </Router>
                    </ToastContext.Provider>
                </TocContext.Provider>
            </SettingContext.Provider>
        </DomInfoContext.Provider>
    );
}

export default App;
