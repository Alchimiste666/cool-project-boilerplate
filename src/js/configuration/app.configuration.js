// API URLs and application constants

const CLIENT_ID = "CLIENT_ID";

export const AUTH_REQUEST_CONFIG = {
  headers: {
    Authorization: "Basic " + btoa(CLIENT_ID + ":"),
    "Content-Type": "application/x-www-form-urlencoded"
  }
};

// Authentication related URLS
export const REDIRECT_URI = window.location.origin + "/external-login";

export const AUTHORIZATION_URL = `${API_URL}/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;

export const TOKEN_GRANT_URL = `${API_URL}/oauth/token`;

export const TOKEN_CHECK_URL = `${API_URL}/oauth/check_token`;

export const TOKEN_REVOKE_URL = `${API_URL}/oauth/revoke_token`;

// API URLs

export const USERS_API_URL = `${API_URL}/vendor/backofficeusers`;
