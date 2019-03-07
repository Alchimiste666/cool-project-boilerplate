import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Password } from 'primereact/password';

export default ({ input, label, required, size, meta: { touched, error } }) => (
    <div class="input-field input-text">
        <div class="input-label">
            {label && <label><FormattedMessage id={label} defaultMessage={label} />{required && <span> *</span>}</label>}
        </div>
        <div class="input-control-container">
            <div class="input-control">
                <Password {...input} size={size} />
            </div>
            <div class="input-error">
                {touched && error && <span class="input-field-error"><FormattedMessage id={error} /></span>}
            </div>
        </div>
    </div>
);
