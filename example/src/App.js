import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { bem, DomInfoContext, SettingContext, TocContext, ToastContext } from './utils';
import { Header } from './components/Header';
import { PageContent } from './components/PageContent';
import { Footer } from './components/Footer';


const App = () => {
    const [theme, setTheme] = useState('dark');
    const setting = useMemo(() => ({ theme }), [theme]);
    const toggleTheme = useCallback(e => setTheme(e.target.checked ? 'dark' : null), []);
    useEffect(() => {
        document.body.className = bem('rc-menu-app', null, { theme });
    }, [theme]);

    const [isTocOpen, setTocOpen] = useState(false);
    const tocContext = useMemo(
        () => ({ isTocOpen, setTocOpen }),
        [isTocOpen]);

    const [domInfo, setDomInfo] = useState({});
    useEffect(() => {
        const handleResize = () => {
            setTocOpen(false);

            const info = {
                // Viewport size
                vWidth: document.documentElement.clientWidth,
                vHeight: document.documentElement.clientHeight,

                navbarHeight: document.querySelector('#header .navbar').offsetHeight,
                // Table of Contents position
                tocPosition: getComputedStyle(document.querySelector('.table-contents'))
                    .getPropertyValue('position')
            };

            setDomInfo(info);
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

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
                        <Router basename="/react-menu">
                            <Header onToggleTheme={toggleTheme} />
                            <PageContent />
                            <Footer />
                            {toast && <div className={bem('rc-menu-app', 'toast')}
                                role="alert">{toast}</div>}
                        </Router>
                    </ToastContext.Provider>
                </TocContext.Provider>
            </SettingContext.Provider>
        </DomInfoContext.Provider>
    );
}

export default App;
