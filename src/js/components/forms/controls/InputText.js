import React from 'react';

import { FormattedMessage } from 'react-intl';
import { InputText } from 'primereact/components/inputtext/InputText';

export default ({ input, keyfilter, label, required, disabled, size, meta: { touched, error } }) => (
  <div class="input-field input-text">
    <div class="input-label">
      {label && <label><FormattedMessage id={label} defaultMessage={label} />{required && <span> *</span>}</label>}
    </div>
    <div class="input-control-container">
      <div class="input-control">
        <InputText {...input} keyfilter={keyfilter} autoComplete={input.name} disabled={disabled} size={size} />
      </div>
      <div class="input-error">
        {touched && error && <span class="input-field-error"><FormattedMessage id={error} /></span>}
      </div>
    </div>
  </div>
);
