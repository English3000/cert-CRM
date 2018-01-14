// In ./components, page-level files. Folders for their components.
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute, AuthRoute } from './utils/routing';
import HomePage from './components/HomePage';
import CustomersIndexPageContainer from './components/CustomersIndexPageContainer';

export default () => (
  <div>
    <Switch>
      <AuthRoute exact path='/' component={HomePage}/>
      <ProtectedRoute exact path='/customers' component={CustomersIndexPageContainer}/>
    </Switch>
  </div>
);
