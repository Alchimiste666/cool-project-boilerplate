import React from 'react';

import { Spinner } from './components/elements/Spinners';
import ErrorBoundary from './components/elements/ErrorBoundary';

export default function asyncRoute(loadComponent) {
  return class AsyncRoute extends React.Component {

    static Component = null;

    state = {
      Component: null
    };

    componentDidMount() {

      if (AsyncRoute.Component === null) {
        // Lazy load the async route bundle
        loadComponent()
          .then(Component => {
            AsyncRoute.Component = Component.default || Component;
            this.setState(state => ({ ...state, Component: AsyncRoute.Component }));
          });

      } else {
        // If async route bundle is already loaded, simply mount
        this.setState(state => ({ ...state, Component: AsyncRoute.Component }));
      }
    }

    render() {
      const { Component } = this.state;
      return Component === null ? (
        <div class="page-loading">
          <Spinner />
        </div>
      ) :
        (
          <ErrorBoundary>
            <Component {...this.props} />
          </ErrorBoundary>
        );
    }

  };
}
