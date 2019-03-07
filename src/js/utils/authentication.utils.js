import axios from 'axios';
import { stringify } from 'query-string';
import { now } from 'lodash-es';

import { AUTH_REQUEST_CONFIG, AUTHORIZATION_URL, TOKEN_GRANT_URL } from '../configuration/app.configuration';
import { sessionTimeout } from '../actions/authentication.actions';

const AUTHENTICATION_KEY = 'authentication';

export function isUserAuthenticated() {
    const authentication = getAuthentication();
    return (authentication !== null);
}

export function userHasRole(roleName) {
    const authentication = getAuthentication();
    return (authentication == null) ? false : authentication.currentUser.authorities.includes(roleName);
}

export function getAuthentication() {
    let authentication = localStorage.getItem(AUTHENTICATION_KEY);

    if (authentication !== null) {
        authentication = JSON.parse(authentication);

        if (authentication.token.expires_at <= now()) {
            clearAuthentication();
            return null;
        }
    }

    return authentication;
}

export function setAuthentication(authentication) {
    localStorage.setItem(AUTHENTICATION_KEY, JSON.stringify(authentication));
}

export function clearAuthentication() {
    // Delete authention token from browser coookies
    localStorage.removeItem(AUTHENTICATION_KEY);

    // Unset authorization header in HTTP calls
    setAuthorizationHeader(null);
}

export function setAuthorizationHeader(token) {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token.access_token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export function enableTokenAutoRefresh(token) {
    // Set up Auto-refresh access token before expiry
    const expiresIn = token.expires_in;
    const delay = (expiresIn > 30 ? expiresIn - 30 : expiresIn) * 1000;
    setTimeout(refreshToken, delay);
}

function refreshToken() {
    let authentication = getAuthentication();

    const refreshRequestData = stringify({
        grant_type: 'refresh_token',
        refresh_token: authentication.token.refresh_token
    });

    return axios
        .post(TOKEN_GRANT_URL, refreshRequestData, AUTH_REQUEST_CONFIG)
        .then(
            ({ data: token }) => {
                // Update current authentication token
                authentication.token = token;

                setAuthentication(authentication);

                // Update default authorization header
                setAuthorizationHeader(token);

                enableTokenAutoRefresh(token);

                return token;
            },
            error => {
                // Log refresh token error
                console.error(error.message || error);

                if (error.response && error.response.status === 401) {
                    // If refresh token fails with 401. That means the refresh token is no longer valid. Dispatch session timeout
                    console.error('Refresh token no longer valid.');

                    // Save current URL and forward and forward to external login page
                    sessionStorage.setItem("postLoginRedirectUrl", this.props.location.pathname);

                    window.location = AUTHORIZATION_URL;
                }
            });
}

export function setAuthenticationInterceptor(store) {

    const responseErrorHandler = error => {

        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry && getAuthentication() !== null) {

            originalRequest._retry = true;

            // Refresh access token
            return refreshToken()
                .then(
                    ({ data: token }) => {
                        // Update original request authorization header
                        originalRequest.headers['Authorization'] = 'Bearer ' + token.access_token;

                        // Retry original request
                        return axios(originalRequest);
                    },
                    error => {
                        // Log refresh token error
                        console.error(error.message || error);

                        if (error.response && error.response.status === 401) {
                            // If refresh token fails with 401. That means the refresh token is no longer valid. Dispatch session timeout
                            store.dispatch(sessionTimeout());
                        }
                    });
        }

        return Promise.reject(error);
    };

    axios.interceptors.response
        // Set global axios request success and error handlers
        .use(response => response, responseErrorHandler);
}
