import React, { Component, /*StrictMode*/ } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router-dom';
import { IntlProvider } from 'react-intl-redux';

import english from 'react-intl/locale-data/en';
import french from 'react-intl/locale-data/fr';
import { addLocaleData } from 'react-intl';

import history from '../../history';
import ErrorBoundary from '../elements/ErrorBoundary';
import Navigation from '../elements/Navigation';
import Header from '../elements/Header';
import routes from '../../routes';

addLocaleData([...english, ...french]);

class RootView extends Component {

  render() {
    const { intl } = this.props;

    return (
      /**
      * Enable strict mode -> currently helps with:
      * Identifying components with unsafe lifecycles
      * Warning about legacy string ref API usage
      * Detecting unexpected side effects
      */
      // <StrictMode>
      <IntlProvider intlSelector={() => intl}>
        <Router history={history}>
          <ErrorBoundary>
            <header id="app-header">
              <Header />
              <Navigation />
            </header>
            <div id="app-main">
              {routes}
            </div>
          </ErrorBoundary>
        </Router>
      </IntlProvider>
      // </StrictMode>
    );
  }

}

const mapStateToProps = state => ({
  intl: state.intl
});

export default connect(mapStateToProps)(RootView);
