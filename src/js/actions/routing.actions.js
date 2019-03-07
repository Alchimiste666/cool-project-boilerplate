import { push } from 'react-router-redux';

export function navigateTo(route) {
    return dispatch => {
        dispatch(push({ pathname: route }));
    };
}