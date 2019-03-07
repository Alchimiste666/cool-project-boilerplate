import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { isEmail } from 'validator';

import { InputText, Password } from './controls';

export const validateForm = values => {

    const { username, password } = values;

    const errors = {};

    if (!username) {
        errors.username = 'AUTHENTICATION.FORM_VALIDATION.MISSING_USERNAME';

    } else if (!isEmail(username)) {
        errors.username = 'AUTHENTICATION.FORM_VALIDATION.INVALID_USERNAME';
    }

    if (!password) {
        errors.password = 'AUTHENTICATION.FORM_VALIDATION.MISSING_PASSWORD';
    }

    return errors;
};

let LoginForm = props => {

    const { formatMessage } = props.intl;

    const { handleSubmit, invalid } = props;

    return (
        <div class="ui-sm-8 ui-md-6 ui-lg-4 ui-xl-3">
            <form onSubmit={handleSubmit}>

                <div class="ui-g-12">
                    <Field type="text" component={InputText} name="username" label={formatMessage({ id: 'AUTHENTICATION.USERNAME' })} required />
                </div>

                <div class="ui-g-12">
                    <Field type="password" component={Password} name="password" label={formatMessage({ id: 'AUTHENTICATION.PASSWORD' })} required />
                </div>

                <div class="ui-g-12">
                    <Link to="/password-recovery">
                        <FormattedMessage id='AUTHENTICATION.FORGOT_PASSWORD' />
                    </Link>
                </div>

                <div class="ui-g-12">
                    <button class="button button-submit" type="submit" disabled={invalid}>
                        <FormattedMessage id='AUTHENTICATION.LOGIN' />
                    </button>
                </div>

            </form>
        </div>
    );
};

LoginForm = injectIntl(LoginForm);

// Form should have a unique name
export default reduxForm({ form: 'loginForm', validate: validateForm, initialValues: { rememberMe: true }, destroyOnUnmount: false })(LoginForm);
