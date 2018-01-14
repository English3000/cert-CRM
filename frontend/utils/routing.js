import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser
});

const Auth = ({ currentUser, path, component: Component }) => (
  <Route path={path} render={props => (
    currentUser ? <Redirect to={'/customers'}/> :
      <Component {...props}/>
  )} />
);

const Protected = ({ currentUser, path, component: Component }) => (
  <Route path={path} render={props => (
    currentUser ? <Component {...props}/> :
      <Redirect to='/'/>
  )} />
);

export const AuthRoute = withRouter(connect(mapStateToProps)(Auth));

export const ProtectedRoute = withRouter(connect(mapStateToProps)(Protected));
