import { intersection, keys, difference, isEqual } from 'lodash-es';

import englishMessages from './messages-en';
import frddenchMessages from './messages-fr';

import { flattenMessages } from '../utils/localization.utils';

describe('Messages intenationalization test suite', () => {

  it('Should verify that all messages are available and translated in all project specific locales', () => {

    const englishLocaleKeys = keys(flattenMessages(englishMessages));
    const frenchLocaleKeys = keys(flattenMessages(frddenchMessages));

    const differences = difference(englishLocaleKeys, frenchLocaleKeys).concat(difference(frenchLocaleKeys, englishLocaleKeys));

    if (differences.length > 0) {
      console.error('The following key(s) may be missing from one of the translation files [messages-*.json] !\n', JSON.stringify(differences));
    }

    for (let i = 0; i < englishLocaleKeys.length; i++) {
      if (englishLocaleKeys[i] !== frenchLocaleKeys[i]) {
        console.warn('The following keys may be different or placed at a diffrent line index in translation files: ' + englishLocaleKeys[i] + ', ' + frenchLocaleKeys[i] + ', Index: ' + i);
      }
    }

    expect(
      isEqual(
        intersection(englishLocaleKeys, frenchLocaleKeys),
        englishLocaleKeys
      )
    ).to.deep.equal(true);

    expect(
      isEqual(
        intersection(englishLocaleKeys, frenchLocaleKeys),
        frenchLocaleKeys
      )
    ).to.deep.equal(true);

    expect(
      isEqual(
        difference(englishLocaleKeys, frenchLocaleKeys),
        []
      )
    ).to.deep.equal(true);

    expect(
      isEqual(
        difference(frenchLocaleKeys, englishLocaleKeys),
        []
      )
    ).to.deep.equal(true);

  });

});

