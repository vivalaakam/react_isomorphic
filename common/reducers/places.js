import {RECEIVE_PLACES, REQUEST_PLACES} from '../constants/place';

export default function page(state = {}, action = {}) {
    switch (action.type) {
        case RECEIVE_PLACES:
            return Object.assign({}, state, {inFetching: false, places: action.places});
            break;

        case REQUEST_PLACES:
            return Object.assign({}, state, {inFetching: true, places: []});
            break;

        case "@@redux/INIT":
            return Object.assign({}, state, {inFetching: false, places: []});
            break;

        default:
            return state;
    }
}
