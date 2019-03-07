import axios from 'axios';
import { stringify } from 'query-string';
import { push } from 'react-router-redux';
import { createAction } from 'redux-actions';

import { getAuthentication, setAuthorizationHeader, setAuthentication, clearAuthentication, enableTokenAutoRefresh } from '../utils/authentication.utils';

import { AUTH_REQUEST_CONFIG, REDIRECT_URI, TOKEN_GRANT_URL, TOKEN_CHECK_URL, TOKEN_REVOKE_URL } from '../configuration/app.configuration';

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const SESSION_TIMEOUT = 'SESSION_TIMEOUT';

export function login(code) {
  return dispatch => {

    dispatch(authenticationPending());

    const requestData = stringify({ grant_type: 'authorization_code', redirect_uri: REDIRECT_URI, code });

    return axios.post(TOKEN_GRANT_URL, requestData, AUTH_REQUEST_CONFIG)
      .then(({ data: token }) => {
        
        if (token === undefined) {
          console.log(token);
          return Promise.reject(new Error('Invalid authentication response !'));
        }
        
        // Set authorization header in HTTP calls
        setAuthorizationHeader(token);
        
        const validationRequestData = stringify({
          token: token.access_token
        });

        return axios
          .post(TOKEN_CHECK_URL, validationRequestData, AUTH_REQUEST_CONFIG)
          .then(({ data: currentUser }) => {

            const authentication = { authenticated: true , token, currentUser };

            // Set user authentication
            setAuthentication(authentication);

            // Auto-refresh access token
            enableTokenAutoRefresh(token);

            // Set authenticated user
            dispatch(loginSuccess(currentUser));

            // Call login success callback
            const redirectUrl = sessionStorage.getItem("postLoginRedirectUrl");
            dispatch(push(redirectUrl || '/'));

          });
      })
      .catch(error => {
        console.error(error);
        dispatch(loginFailure(error));
      });
  };
}

export function logout() {
  return dispatch => {

    const cleanUp = () => {
      clearAuthentication();
      dispatch(push('/'));
    };
        
    const authentication = getAuthentication();

    if (authentication === null || authentication.token === null) {
      dispatch(logoutSuccess());
      cleanUp();
      return;
    }

    const requestData = stringify({ token: authentication.token.access_token });

    return axios.post(TOKEN_REVOKE_URL, requestData)
      .then(() => {
        dispatch(logoutSuccess());
      })
      .catch(error => {
        console.error(error);
        dispatch(logoutFailure(error));
      })
      .finally(cleanUp);
  };
}

export const authenticationPending = createAction(AUTHENTICATION_PENDING);

export const loginSuccess = createAction(LOGIN_SUCCESS, currentUser => ({ currentUser }));

export const loginFailure = createAction(LOGIN_FAILURE);

export const logoutSuccess = createAction(LOGOUT_SUCCESS);

export const logoutFailure = createAction(LOGOUT_FAILURE);

export function sessionTimeout() {
  return dispatch => {
    dispatch({ type: SESSION_TIMEOUT });

    // Clear user authentication
    clearAuthentication();

    dispatch(logoutSuccess());

    // Redirect to index page
    dispatch(push('/'));
  };
}

