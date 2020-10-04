import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DomInfoContext, TocContext, ToastContext } from './utils';
import { Header } from './components/Header';
import { PageContent } from './components/PageContent';
import { Footer } from './components/Footer';


const App = () => {
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
            <TocContext.Provider value={tocContext}>
                <ToastContext.Provider value={setToast}>
                    <Router basename="/react-menu">
                        <Header />
                        <PageContent />
                        <Footer />
                        {toast && <div className="app-toast" role="alert">{toast}</div>}
                    </Router>
                </ToastContext.Provider>
            </TocContext.Provider>
        </DomInfoContext.Provider>
    );
}

export default App;
