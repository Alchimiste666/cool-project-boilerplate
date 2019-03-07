import { reducer as formReducer } from "redux-form";
import { reducer as modalReducer } from "redux-modal";

import routingReducer from "./routing.reducer";
import localizationReducer from "./localization.reducer";
import authenticationReducer from "./authentication.reducer";

const reducers = {
  form: formReducer,
  modals: modalReducer,
  routing: routingReducer,
  intl: localizationReducer,
  authentication: authenticationReducer
};

export default reducers;
