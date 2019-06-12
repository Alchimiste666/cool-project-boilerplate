/**
 * Components using the react-intl module require access to the intl context.
 * This is not available when mounting single components in Enzyme.
 * These helper functions aim to address that and wrap a valid,
 * English-locale intl context around them.
 */
import React from 'react';
import { IntlProvider, intlShape } from 'react-intl';
import { mount, shallow } from 'enzyme';

import { flattenMessages } from './localization.utils';
import messages from '../localization/messages-en';

// Create the IntlProvider to retrieve context for wrapping around.
const intlProvider = new IntlProvider({ locale: 'en', messages: flattenMessages(messages) }, {});
const { intl } = intlProvider.getChildContext();

/**
 * When using React-Intl `injectIntl` on components, props.intl is required.
 */
function nodeWithIntlProp(node) {
  return React.cloneElement(node, { intl });
}

export function shallowWithIntl(node, { context, ...additionalOptions } = {}) {

  const wrapper = shallow(
    nodeWithIntlProp(node), {
      context: { ...context, intl },
      ...additionalOptions
    }
  );

  return wrapper;
}

export function mountWithIntl(node, { context, childContextTypes, ...additionalOptions } = {}) {
  const wrapper = mount(
    nodeWithIntlProp(node),
    {
      context: { ...context, intl },
      childContextTypes: { intl: intlShape, ...childContextTypes },
      ...additionalOptions,
    }
  );

  return wrapper;
}
