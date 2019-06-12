// primereact
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

// Font awesome icons
import 'font-awesome/css/font-awesome.css';

// Application styles
import '../scss/app.scss';

import "core-js/stable";
import "regenerator-runtime/runtime";

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';

import { getAuthentication, setAuthorizationHeader, enableTokenAutoRefresh, setAuthenticationInterceptor } from './utils/authentication.utils';
import { loginSuccess } from './actions/authentication.actions';

import RootView from './components/views/RootView';

setAuthenticationInterceptor(store);

// Set jwt token if present
let authentication = getAuthentication();

if (authentication !== null) {
    setAuthorizationHeader(authentication.token);
    enableTokenAutoRefresh(authentication.token);
    store.dispatch(loginSuccess(authentication.currentUser));
}

render(
    <Provider store={store}>
        <RootView />
    </Provider>
    , document.getElementById('app')
);

