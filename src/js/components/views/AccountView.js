import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class AccountView extends Component {

    render() {
        return (
            <h1><FormattedMessage id="NAVIGATION.ACCOUNT" /></h1>
        );
    }

}

export default connect()(AccountView);
