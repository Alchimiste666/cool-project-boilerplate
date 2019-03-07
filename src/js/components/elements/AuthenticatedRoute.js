// External Login Screen (OAUTH AUTHORIZATION CODE)

// Step 1
// /oauth/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=http://localhost:7070/external-login

// Step 2
// curl -X POST --user CLIENT_ID: /oauth/token -d grant_type=authorization_code -d redirect_uri=http://localhost:7070/external-login -d code=COSrKa

// import React, { Component } from 'react';
// import { Route } from 'react-router-dom';

// import { isUserAuthenticated } from '../../utils/authentication.utils';
// import { AUTHORIZATION_URL } from '../../configuration/app.configuration';

// export default class AuthenticatedRoute extends Component {

//     componentDidMount() {
//         // Save origin URL and forward to it after successful authentication
//         sessionStorage.setItem("postLoginRedirectUrl", this.props.location.pathname);
//     }

//     redirectToExternalLoginUrl() {
//         window.location = AUTHORIZATION_URL;
//         return null;
//     }

//     render() {
//         const { component: Component, ...routeProps } = this.props;

//         return (
//             <Route {...routeProps} render={props => (
//                 isUserAuthenticated() ? (<Component {...props} />) : (<Route component={this.redirectToExternalLoginUrl} />)
//             )} />
//         );
//     }
// }

// Embedded Login Screen

import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class AuthenticatedRoute extends Component {

  render() {

    const { authentication: { authenticated }, component: Component, ...routeProps } = this.props;

    return (
      <Route {...routeProps} render={props => (
        authenticated ? (<Component {...props} />) : (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
      )} />
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
});

export default connect(mapStateToProps)(AuthenticatedRoute);
