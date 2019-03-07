import React, { Component } from 'react';
import GenericErrorMessage from './GenericErrorMessage';

export default class ErrorBoundary extends Component {

    state = { hasError: false };

    componentDidCatch(error, info) {
        // Display Error View in UI
        this.setState(state => ({ ...state, hasError: true }));

        // Report error details
        console.error(error, info);
    }

    render() {
        if (this.state.hasError) {
            // Render fallback UI (TBD)
            return <GenericErrorMessage />;
        }

        return this.props.children;
    }
    
}
