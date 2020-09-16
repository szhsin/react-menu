import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import { Header } from './components/Header';
import { Usage } from './components/Usage';
import { ComponentApi } from './components/ComponentApi';
import { StyleGuide } from './components/StyleGuide';
import { Footer } from './components/Footer';

const App = () => {
    return (
        <Router>
            <Header />

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

            <Footer />
        </Router>
    );
}

export default App;
