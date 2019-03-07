import { LOCALE_CHANGE } from '../actions/localization.actions';
import { ENGLISH } from "../constants/languages";
import { flattenMessages } from '../utils/localization.utils';
import englishMessages from '../localization/messages-en';

const initialState = {
    locale: ENGLISH,
    messages: flattenMessages(englishMessages)
};

const localizationReducer = (state = initialState, action = {}) => {

    switch (action.type) {
        case LOCALE_CHANGE:
            return { ...state, locale: action.payload.locale, messages: action.payload.messages };

        default:
            return state;
    }
};

export default localizationReducer;
