import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class ProfileView extends Component {

    render() {
        return (
            <h1><FormattedMessage id="NAVIGATION.PROFILE" /></h1>
        );
    }

}

export default connect()(ProfileView);
