import React, { Fragment } from 'react';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { InputTextarea } from 'primereact/inputtextarea';

export default ({ input, label, required, meta: { touched, error }, maxLengthCountdown, styleClass }) => {

  const showError = touched && error;

  return (
    <div class="input-field input-textarea">
      {(label !== undefined || maxLengthCountdown !== undefined) && (
        <Fragment>
          <div class="ui-g-8">
            {label && <label><FormattedMessage id={label} defaultMessage={label} />{required && <span> *</span>}</label>}
          </div>
          <div class="ui-g-4">
            {maxLengthCountdown !== undefined && (
              <label class={classNames('text-area-countdown', { 'input-field-error': maxLengthCountdown <= 0 })}>
                {maxLengthCountdown} <FormattedMessage id='GLOBAL.CHARACTERS_REMAINING' />
              </label>
            )}
          </div>
        </Fragment>
      )}
      <div class={classNames('ui-g-12', styleClass || '', { 'input-field-error': showError })}>
        <InputTextarea class={classNames({ 'field-error': showError })} {...input} rows={5} cols={30} autoResize={true} />
      </div>
      {showError && <div class="ui-g-12">
        <span class="input-field-error"><FormattedMessage id={error} /></span>
      </div>}
    </div>
  );
};
