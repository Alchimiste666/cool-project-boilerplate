import React, { Component } from 'react';
import classNames from 'classnames';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Dropdown } from 'primereact/components/dropdown/Dropdown';

class CustomDropdown extends Component {

  constructor(props) {
    super(props);

    this.state = {
      touched: false,
      options: props.options || [],
      value: props.meta.initial
    };
  }

  /**
  * Dropdown dynamic options initialization. Based on the provided 'loadOptions' method which should return a promise with array type result.
  */
  componentDidMount() {
    this._isMounted = true;

    const { loadOptions } = this.props;

    if (typeof loadOptions === 'function') {
      loadOptions()
        .then(options => {
          if (this._isMounted) {
            this.setState({ options });
          }
        });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getOptionValue(option) {
    const { keyField } = this.props;
    return option[keyField || 'value'];
  }

  render() {
    const { input, label, placeholder, required, disableEmptyValue, onOptionSelected, meta: { error }, disabled, filter, intl: { formatMessage } } = this.props;

    const showError = this.state.touched && error;

    const { options } = this.state;

    const dropdownOptions = (disableEmptyValue ? [] : [{ value: null, label: ' ' }])
      .concat(options)
      .map((option) => {
        const optionValue = this.getOptionValue(option);
        return optionValue !== undefined ? { ...option, value: optionValue, label: formatMessage({ id: option.label, defaultMessage: option.label }) } : option;
      });

    const onChange = ({ value }) => {

      if (value === null || value === undefined) {
        this.setState({ value: null, touched: true });
        input.onChange(null);

      } else {
        this.setState({ value, touched: true });
        input.onChange(value);
      }

      typeof onOptionSelected === 'function' && onOptionSelected(value);
    };

    return (
      <div class="input-field input-dropdown">
        {label && <label><FormattedMessage id={label} defaultMessage={label} />{required && <span> *</span>}</label>}

        <Dropdown class={classNames({ 'input-error': showError })} onChange={onChange} value={input.value} options={dropdownOptions}
          disabled={disabled} placeholder={placeholder} autoWidth={false} filter={filter || false} />

        {showError && <span class="input-field-error"><FormattedMessage id={error} /></span>}
      </div>
    );
  }
}

export default injectIntl(CustomDropdown); 