import React, { useEffect, useContext } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { SettingContext, TocContext } from '../utils';
import { Usage } from './Usage';
import { PageView } from './PageView';
import styleGuide from '../data/styleGuide';
import documentation from '../data/documentation';
import { NotFound } from './NotFound';

export const PageContent = React.memo(function PageContent() {
  const location = useLocation();
  const { showBanner } = useContext(SettingContext);
  const { setTocOpen } = useContext(TocContext);
  useEffect(() => {
    if (!location.hash) window.scrollTo(0, 0);

    setTocOpen(false);
  }, [location, setTocOpen]);

  return (
    <div id="content" style={showBanner ? { marginTop: '40px' } : undefined}>
      <Switch>
        <Route exact path="/">
          <Usage />
        </Route>
        <Route path="/docs">
          <PageView id="documentation" data={documentation} />
        </Route>
        <Route path="/style-guide">
          <PageView id="style-guide" data={styleGuide} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
});
