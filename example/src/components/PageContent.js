import React, { useEffect } from 'react';
import {
    Switch,
    Route,
    useLocation
} from 'react-router-dom';
import { Usage } from './Usage';
import { ComponentApi } from './ComponentApi';
import { StyleGuide } from './StyleGuide';


export const PageContent = React.memo(function PageContent() {

    const location = useLocation();
    useEffect(() => {
        if (!location.hash) window.scrollTo(0, 0);
    }, [location]);

    return (
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
    );
});
