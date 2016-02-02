import {RECEIVE_PAGE, REQUEST_PAGE} from '../constants/page';

export default function page(state = {}, action = {}) {
    switch (action.type) {
        case REQUEST_PAGE:
            return Object.assign({}, state, {
                [action.id]: {
                    id: action.id,
                    isFetching: true
                }
            });
            break;

        case RECEIVE_PAGE:
            return Object.assign({}, state, {
                [action.id]: {
                    id: action.id,
                    text: action.text,
                    isFetching: false
                }
            });
            break;
        default:
            return state
    }
}
