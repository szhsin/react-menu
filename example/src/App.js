import React, { useState, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { DomSizeContext } from './utils';
import { Header } from './components/Header';
import { Usage } from './components/Usage';
import { ComponentApi } from './components/ComponentApi';
import { StyleGuide } from './components/StyleGuide';
import { Footer } from './components/Footer';


const App = () => {
    const [domSize, setDomSize] = useState({});

    useEffect(() => {
        const handleResize = () => {
            const tocPosition = getComputedStyle(document.querySelector('.table-contents'))
                .getPropertyValue('position');
            const size = { tocPosition, navbarHeight: 0 };

            if (tocPosition === 'sticky') {
                const navbarHeight = document.querySelector('#header .navbar').offsetHeight;

                size.navbarHeight = navbarHeight;
                size.tocHeight = document.documentElement.clientHeight - navbarHeight;
            }

            setDomSize(size);
        }

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <DomSizeContext.Provider value={domSize}>
            <Router>
                <Header />

                <div id="content">
                    <Switch>
                        <Route exact path="/">
                            <Usage />
                        </Route>
                        <Route path="/components">
                            <ComponentApi />
                        </Route>
                        <Route path="/style-guide">
                            <StyleGuide />
                        </Route>
                    </Switch>
                </div>

                <Footer />
            </Router>
        </DomSizeContext.Provider>
    );
}

export default App;
