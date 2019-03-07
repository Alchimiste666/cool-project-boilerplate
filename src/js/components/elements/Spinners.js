import React from 'react';
import ReactLoading from 'react-loading';

export const Spinner = () => (
    <div class="spinner-container">
        <ReactLoading type='spin' color='#0088cc' height={100} width={100} />
    </div>
);

export const MiniSpinner = () => (
    <div class="inline-spinner-container">
        <ReactLoading type='spin' color='#0088cc' height={15} width={15} />
    </div>
);