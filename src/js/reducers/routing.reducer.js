import { LOCATION_CHANGE } from 'react-router-redux';

const routingReducer = (state = {}, action = {}) => {

    switch (action.type) {
        case LOCATION_CHANGE:
            return {
                ...state,
                locationBeforeTransition: state.locationAfterTransition,
                locationAfterTransition: action.payload
            };

        default:
            return state;

    }
};

export default routingReducer;
