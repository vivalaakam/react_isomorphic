import {RECEIVE_PAGE, REQUEST_PAGE, RESTORE_PAGE , UPDATING_PAGE, UPDATE_PAGE} from '../constants/page';

const CLEAR_PAGE = {
    isFetching: true,
    inUpdate: false,
    title: '',
    text: ''
};

export default function page(state = {}, action = {}) {
    let page;
    switch (action.type) {
        case REQUEST_PAGE:
            return Object.assign({}, state, {_id: action._id}, CLEAR_PAGE);
            break;

        case RECEIVE_PAGE:
            page = {
                _id: action._id,
                text: action.text,
                title: action.title,
                inUpdate: false,
                isFetching: false
            };

            let cache = state.cache || {};

            if (action._id) {
                cache[action._id] = page;
            }

            return Object.assign({}, state, page, {cache});
            break;

        case RESTORE_PAGE:
            page = action._id ? state.cache[action._id] : CLEAR_PAGE;
            return Object.assign({}, state, page);
            break;

        case UPDATING_PAGE:
            return Object.assign({}, state, {inUpdate: true});
            break;

        case UPDATE_PAGE:
            return Object.assign({}, state, action.data);

        default:
            return state;
    }
}
