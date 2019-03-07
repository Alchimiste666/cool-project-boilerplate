import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { isArray } from 'lodash-es';
import classNames from 'classnames';
import { Checkbox } from "primereact/components/checkbox/Checkbox";

import { MiniSpinner } from '../../elements/Spinners';

const CheckboxButton = ({ label, value, checked, onChange, disposition }) => (
    <div class={classNames("checkbox-option", { "vertical": disposition === 'vertical' })}>
        <Checkbox value={value} onMouseDown={onChange} checked={checked} />
        <label onClick={onChange}>&nbsp;<FormattedMessage id={label} defaultMessage={label} /></label>
    </div>
);

export default class CheckboxGroup extends Component {

    constructor(props) {
        super(props);

        const options = props.options || [];

        let initialValues = (props.meta || {}).initial || [];

        if (!isArray(initialValues)) {
            initialValues = Array.of(initialValues);
        }

        this.state = {
            touched: false,
            loading: false,
            options: options,
            selectedValues: initialValues
        };
    }

    /**
    * Checkbox group dynamic options initialization. Based on the provided 'loadOptions' method which should return a promise with array type result.
    */
    componentDidMount() {
        this._isMounted = true;

        const { loadOptions, input } = this.props;

        if (typeof loadOptions === 'function') {

            this.setState({ loading: true });

            loadOptions()
                .then(options => {
                    if (this._isMounted) {

                        const selectedValues = this.getSelectedValues(options);

                        this.setState({ loading: false, options, selectedValues });

                        input.onChange(selectedValues);
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

    getSelectedValues(options) {
        // Compute and set selected values
        const { preselectAll } = this.props;

        let { selectedValues } = this.state;

        if (selectedValues === [] && preselectAll) {
            selectedValues = (options || []).map(option => this.getOptionValue(option));
        }

        return selectedValues;
    }

    render() {
        const { input, label, required, disposition, meta: { error } } = this.props;

        const { options, selectedValues, touched, loading } = this.state;

        const toggleOption = (value) => {

            let newValues = null;

            if (selectedValues.includes(value)) {
                // Remove selected value
                newValues = selectedValues.filter(entry => entry !== value);

            } else {
                // Add selected value
                newValues = selectedValues.concat(value);
            }

            this.setState({ selectedValues: newValues, touched: true });

            input.onChange(newValues);
        };

        const mappedOptions = (options || [])
            .map((option, index) => {

                const optionValue = this.getOptionValue(option);

                return (
                    <CheckboxButton
                        key={index}
                        type="checkbox"
                        value={optionValue}
                        label={option.label}
                        disposition={disposition}
                        onChange={() => toggleOption(optionValue)}
                        checked={selectedValues.some(value => value === optionValue)} />
                );
            });

        return (
            <div class="input-field">
                {label && <label><FormattedMessage id={label} defaultMessage={label} />{required && <span> *</span>}</label>}

                <div>{loading ? <MiniSpinner /> : mappedOptions}</div>

                {touched && error && <span class="input-field-error"><FormattedMessage id={error} /></span>}
            </div>
        );
    }
}
