import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { capitalize } from 'lodash-es';
import { Menu } from 'primereact/menu';
import UserAvatar from 'react-user-avatar';

import { logout } from '../../actions/authentication.actions';
import { navigateTo } from '../../actions/routing.actions';

class Authentication extends Component {

  render() {
    const { authentication: { authenticated, currentUser }, logout, navigateTo, intl: { formatMessage } } = this.props;

    if (authenticated) {

      let fullName = '';

      if (currentUser) {
        fullName = `${capitalize(currentUser.first_name)} ${capitalize(currentUser.last_name)}`;
      }

      const items = [
        { label: formatMessage({ id: 'NAVIGATION.PROFILE' }), icon: 'pi pi-fw pi-user', command: () => navigateTo('/profile') },
        { label: formatMessage({ id: 'NAVIGATION.ACCOUNT' }), icon: 'pi pi-fw pi-cog', command: () => navigateTo('/account') },
        { label: formatMessage({ id: 'AUTHENTICATION.LOGOUT' }), icon: 'pi pi-fw pi-sign-out', command: logout },
      ];

      return (
        <div class="authentication">

          <Menu model={items} popup={true} ref={el => this.menu = el} />

          <span class="username" onClick={(event) => this.menu.toggle(event)}>
            <UserAvatar size="40" name={fullName} color="#329FB4" />
            {fullName && <span>{fullName}</span>}
            <i class="pi pi-angle-down"></i>
          </span>

        </div>
      );

    } else {
      return null;
    }
  }

}

const mapStateToProps = state => ({
  authentication: state.authentication
});

Authentication = connect(mapStateToProps, { logout, navigateTo })(Authentication);

export default injectIntl(Authentication);
