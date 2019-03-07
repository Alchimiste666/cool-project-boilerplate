import React, { Component } from "react";

import { FormattedMessage } from "react-intl";
import { Checkbox } from "primereact/components/checkbox/Checkbox";

export default class extends Component {

  constructor(props) {
    super(props);

    const checked = this.props.meta.initial;

    this.state = { checked: checked === true || checked === 'true' };
  }

  render() {

    const onChange = event => {
      const { checked } = event;
      this.setState({ checked });
      input.onChange(checked);
    };

    const { input, label, required, meta: { touched, error } } = this.props;

    return (
      <div class="input-field input-checkbox">
        {label && <label onClick={onChange}>{label}{required && <span> *</span>}</label>}
        <Checkbox value={input.value} onChange={onChange} checked={this.state.checked} />
        {touched && error && (
          <span class="input-field-error">
            <FormattedMessage id={error} />
          </span>
        )}
      </div>
    );
  }

}

