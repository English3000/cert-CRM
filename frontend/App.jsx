// In ./components, page-level files. Folders for their components.
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ProtectedRoute, AuthRoute } from './utils/routing';
import HomePageContainer from './components/HomePageContainer';
import CustomersIndexPageContainer from './components/CustomersIndexPageContainer';

export default () => (
  <div>
    <Switch>
      <AuthRoute exact path='/' component={HomePageContainer}/>
      <ProtectedRoute exact path='/customers' component={CustomersIndexPageContainer}/>
    </Switch>
  </div>
); /* for ProtectedRoute, if Customer sign-in (check currentUser.admin?),
        would add conditional redirecting to CustomerShowPageContainer */
