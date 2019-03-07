import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { Menu } from 'primereact/menu';

import { logout } from "../../actions/authentication.actions";
import { loadEnglish, loadFrench } from "../../actions/localization.actions";

class Navigation extends Component {

  render() {

    const { locale, loadEnglish, loadFrench, intl: { formatMessage } } = this.props;

    const languageMenuItems = [
      { label: formatMessage({ id: 'LOCALE.ENGLISH' }), icon: 'flag flag-united-kingdom', command: loadEnglish },
      { label: formatMessage({ id: 'LOCALE.FRENCH' }), icon: 'flag flag-france', command: loadFrench }
    ];

    return (
      <div class="navigation-container">

        <div class="navigation">
          <NavLink to="/home" activeclass="active">
            <i class="fa fa-server" aria-hidden="true" /> <FormattedMessage id="NAVIGATION.HOME" />
          </NavLink>
          <NavLink to="/account" activeclass="active">
            <i class="fa fa-handshake-o" aria-hidden="true" /> <FormattedMessage id="NAVIGATION.ACCOUNT" />
          </NavLink>
          <NavLink to="/profile" activeclass="active">
            <i class="fa fa-user" aria-hidden="true" /> <FormattedMessage id="NAVIGATION.PROFILE" />
          </NavLink>
        </div>

        <div class="locale-switch-container">
          <i id="locale-switch" class="fa fa-globe" aria-hidden="true" onClick={(event) => this.menu.toggle(event)}>
            <Menu model={languageMenuItems} popup={true} ref={el => this.menu = el} />
            <span>{locale.toUpperCase()}</span>
          </i>
        </div>

      </div>
    );
  }

}

const mapStateToProps = state => ({
  locale: state.intl.locale,
  routing: state.routing
});

Navigation = connect(mapStateToProps, { loadEnglish, loadFrench, logout })(Navigation);

export default injectIntl(Navigation);
