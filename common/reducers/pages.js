import {RECEIVE_PAGES, REQUEST_PAGES} from '../constants/page';

export default function page(state = {}, action = {}) {
    switch (action.type) {
        case RECEIVE_PAGES:
            return Object.assign({}, state, {inFetching: true, pages: action.pages});
            break;

        case REQUEST_PAGES:
            return Object.assign({}, state, {inFetching: true, pages: []});
            break;

        case "@@redux/INIT":
            return Object.assign({}, state, {inFetching: false, pages: []});
            break;

        default:
            return state;
    }
}
