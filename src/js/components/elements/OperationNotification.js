import React from 'react';
import { FormattedMessage } from 'react-intl';

import { MiniSpinner } from './Spinners';

export default ({ operationPending, operationSuccess, operationError }) => {

    let notification = null;

    if (operationPending) {
        notification = (
            <div class="notificaiton-pending">
                <FormattedMessage id='NOTIFICATIONS.OPERATION_IN_PROGRESS' />
                &nbsp;
                <span class="spinner-inline"><MiniSpinner /></span>
            </div>
        );

    } else if (operationSuccess) {
        notification = (
            <div class="notificaiton-success">
                <FormattedMessage id='NOTIFICATIONS.OPERATION_SUCCESS' />
                &nbsp;
                <i class="fa fa-check" aria-hidden="true" />
            </div>
        );

    } else if (operationError) {

        // Format error message
        let errorMessage = '';

        if (operationError && operationError.response) {
            const { statusText, data } = operationError.response;

            if (statusText) {
                errorMessage += statusText;
            }

            if (data.error) {
                errorMessage += errorMessage ? '. ' + data.error : data.error;
            }
        }

        notification = (
            <div class="notification-error">
                <FormattedMessage id='NOTIFICATIONS.OPERATION_ERROR' />
                &nbsp;
                <i class="fa fa-exclamation-triangle" aria-hidden="true" />
                {errorMessage && <span><br />{errorMessage}</span>}
            </div>
        );
    }

    return notification;
};