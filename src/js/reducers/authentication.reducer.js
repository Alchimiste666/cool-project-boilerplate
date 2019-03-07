import { AUTHENTICATION_PENDING, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS, LOGOUT_FAILURE, SESSION_TIMEOUT } from '../actions/authentication.actions';

const INITIAL_AUTHENTICATION_STATE = {
  authenticated: false,
  currentUser: null,
  loading: false,
  error: false,
  logoutError: false,
  sessionTimeout: false
};

const authenticationReducer = (state = INITIAL_AUTHENTICATION_STATE, action = {}) => {

  switch (action.type) {

    case AUTHENTICATION_PENDING:
      return { ...state, loading: true, error: false };

    case LOGIN_SUCCESS:
      return { ...state, loading: false, authenticated: true, currentUser: action.payload.currentUser };

    case LOGIN_FAILURE:
      return { ...state, loading: false, error: true };

    case LOGOUT_SUCCESS:
      return { ...state, authenticated: false, currentUser: null, logoutError: false, sessionTimeout: false };

    case LOGOUT_FAILURE:
      return { ...state, authenticated: false, currentUser: null, logoutError: true, sessionTimeout: false };

    case SESSION_TIMEOUT:
      return { ...state, authenticated: false, currentUser: null, logoutError: false, sessionTimeout: true };

    default:
      return state;
  }
};

export default authenticationReducer;
