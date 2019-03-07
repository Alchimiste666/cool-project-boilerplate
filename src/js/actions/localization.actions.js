import { ENGLISH, FRENCH } from "../constants/languages";
import { flattenMessages } from '../utils/localization.utils';

export const LOCALE_CHANGE = 'LOCALE_CHANGE';

export function loadEnglish() {
  return dispatch => {
    return import(/* webpackChunkName: "english" */ '../localization/messages-en.json')
      .then(englishMessages => (dispatch({
        type: LOCALE_CHANGE,
        payload: {
          locale: ENGLISH,
          messages: flattenMessages(englishMessages)
        }
      })));
  };
}

export function loadFrench() {
  return dispatch => {
    return import(/* webpackChunkName: "french" */ '../localization/messages-fr.json')
      .then(frenchMessages => (dispatch({
        type: LOCALE_CHANGE,
        payload: {
          locale: FRENCH,
          messages: flattenMessages(frenchMessages)
        }
      })));
  };
}
