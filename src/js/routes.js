import React from 'react';
import { Switch, Route } from 'react-router-dom';

import asyncRoute from './async-route';
import AuthenticatedRoute from './components/elements/AuthenticatedRoute';

// Routes
const ExternalLoginView = asyncRoute(() => import(/* webpackChunkName: 'external-login' */ './components/views/ExternalLoginView'));
const LoginView = asyncRoute(() => import(/* webpackChunkName: 'login' */ './components/views/LoginView'));
const HomeView = asyncRoute(() => import(/* webpackChunkName: 'home' */ './components/views/HomeView'));
const ProfileView = asyncRoute(() => import(/* webpackChunkName: 'profile' */ './components/views/ProfileView'));
const AccountView = asyncRoute(() => import(/* webpackChunkName: 'account' */ './components/views/AccountView'));
const UsersView = asyncRoute(() => import(/* webpackChunkName: 'users' */ './components/views/UsersView'));

// Navigation
const routes = (
  <Switch>
    <Route path='/external-login' exact component={ExternalLoginView} />
    <Route path='/login' exact component={LoginView} />
    <Route path='/home' component={HomeView} />
    <AuthenticatedRoute path='/profile' exact component={ProfileView} />
    <AuthenticatedRoute path='/account' exact component={AccountView} />    
    <AuthenticatedRoute path='/users' exact component={UsersView} />
  </Switch>
);

export default routes;
