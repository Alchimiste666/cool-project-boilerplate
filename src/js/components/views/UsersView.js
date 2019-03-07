import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class UsersView extends Component {

    render() {
        return (
            <h1><FormattedMessage id="NAVIGATION.USERS" /></h1>
        );
    }

}

export default connect()(UsersView);
