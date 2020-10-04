import React, { useEffect, useContext } from 'react';
import {
    Switch,
    Route,
    useLocation
} from 'react-router-dom';
import { TocContext } from '../utils';
import { Usage } from './Usage';
import { Docs } from './Docs';
import { StyleGuide } from './StyleGuide';
import { NotFound } from './NotFound';


export const PageContent = React.memo(function PageContent() {

    const location = useLocation();
    const { setTocOpen } = useContext(TocContext);
    useEffect(() => {
        if (!location.hash) window.scrollTo(0, 0);

        setTocOpen(false);
    }, [location, setTocOpen]);

    return (
        <div id="content">
            <Switch>
                <Route exact path="/">
                    <Usage />
                </Route>
                <Route path="/docs">
                    <Docs />
                </Route>
                <Route path="/style-guide">
                    <StyleGuide />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </div>
    );
});
