import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { RadioButton } from 'primereact/components/radiobutton/RadioButton';

const Radio = ({ label, value, checked, onChange, disposition }) => (
  <div class={classNames("radio-option", { "vertical": disposition === 'vertical' })}>
    <label>
      <RadioButton value={value} onChange={onChange} checked={checked} />&nbsp;<FormattedMessage id={label} defaultMessage={label} />
    </label>
  </div>
);

/**
* Dropdown dynamic options initialization. Based on the provided 'loadOptions' method which should return a promise with array type result.
*/
export default class RadioGroup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      touched: false,
      options: props.options || [],
      value: this.props.meta.initial
    };
  }

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
    const { input, label, required, currentValue, disposition, onOptionSelected, meta: { touched, error } } = this.props;

    const { options } = this.state;

    const onChange = ({ value }) => {
      this.setState({ value, touched: true });

      input.onChange(value);

      typeof onOptionSelected === 'function' && onOptionSelected(value);
    };

    const mappedOptions = (options || [])
      .map((option, index) => {

        const optionValue = this.getOptionValue(option);

        return (
          <Radio
            key={index}
            type="radio"
            value={optionValue}
            label={option.label}
            disposition={disposition}
            onChange={onChange}
            checked={currentValue !== undefined ? optionValue === currentValue : optionValue === this.state.value} />
        );
      });

    return (
      <div class="input-field">
        {label && <label><FormattedMessage id={label} defaultMessage={label} />{required && <span> *</span>}</label>}
        <div>{mappedOptions}</div>
        {touched && error && <span class="input-field-error"><FormattedMessage id={error} /></span>}
      </div>
    );
  }
}
