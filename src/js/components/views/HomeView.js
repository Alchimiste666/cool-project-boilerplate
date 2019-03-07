import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

class HomeView extends Component {

    render() {
        return (
            <h1><FormattedMessage id="NAVIGATION.HOME" /></h1>
        );
    }

}

export default connect()(HomeView);
