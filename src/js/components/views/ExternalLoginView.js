import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { login } from '../../actions/authentication.actions';
import { Spinner } from '../elements/Spinners';

class ExternalLoginView extends Component {

    componentDidMount() {
        const { login } = this.props;
        const { search } = this.props.location;
        
        const query = queryString.parse(search);

        if (query.code !== undefined) {
            login(query.code);
        }
    }

    render() {
        const { loading, error } = this.props.authentication;

        return (
            <div class="ui-g-12">

                <div class="ui-g-12">
                    {error && <h3 class="text-error"><FormattedMessage id='AUTHENTICATION.LOGIN_FAILURE' /></h3>}
                    {error && <h4 class="text-error">{error.message}</h4>}
                </div>

                <div>
                    {loading && <Spinner />}
                    {!loading && error && <p class="text-error">{error}</p>}
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    authentication: state.authentication,
    localization: state.intl
});

export default connect(mapStateToProps, { login })(ExternalLoginView);
