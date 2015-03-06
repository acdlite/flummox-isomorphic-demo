import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import AppHandler from './components/AppHandler';
import StargazerGridHandler from './components/StargazerGridHandler';

let Routes = (
  <Route name="app" path="/" handler={AppHandler}>
    <Route name="stargazerGridHandler" path="/stargazers/:owner/:repo" handler={StargazerGridHandler} />
  </Route>
);

export default Routes;
