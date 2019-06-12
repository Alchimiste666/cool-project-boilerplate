import axios from 'axios';
import retryInterceptor from 'axios-retry-interceptor';

import { RETRY_HTTP_REQUESTS } from './configuration/app.configuration';

if (RETRY_HTTP_REQUESTS) {
    retryInterceptor(axios, {
        maxAttempts: 3,
        waitTime: 1000
    });
}

export default axios;
