import React, { Component } from "react";
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import ResultsPage from './components/ResultsPage';
import { LayoutLanding } from './layouts/LayoutLanding';
import { LayoutOther } from './layouts/LayoutOther';

function App() {

  return (
    <BrowserRouter>
      <Switch>
        <RouteWrapper exact path="/" component={LandingPage} layout={LayoutLanding} />
        <RouteWrapper path="/results" component={ResultsPage} layout={LayoutOther} />
      </Switch>
    </BrowserRouter>
  );
}

function RouteWrapper({ component: Component, layout: Layout, ...rest}) {
  return (
    <Route {...rest} render={(props) =>
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    } />
  );
}

export default App;