import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { login } from '../../actions/authentication.actions';
import LoginForm from '../forms/LoginForm';
import { Spinner } from '../elements/Spinners';

class LoginView extends Component {

  handleLogin(credentials) {
    const { from: redirectUrl } = this.props.location.state || { from: { pathname: '/' } };
    this.props.login(credentials, redirectUrl);
  }

  render() {
    const { loading, error } = this.props.authenticationState;

    return (
      <div class="ui-g-12">

        <div class="notification-container ui-g-12">
          {error && <h3 class="text-error"><FormattedMessage id='AUTHENTICATION.LOGIN_FAILURE' /></h3>}
          {error && <h4 class="text-error">{error.message}</h4>}
        </div>

        <div>
          {loading ? <Spinner /> : <LoginForm onSubmit={this.handleLogin.bind(this)} />}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  authenticationState: state.authentication,
  localizationState: state.intl
});

export default connect(mapStateToProps, { login })(LoginView);
