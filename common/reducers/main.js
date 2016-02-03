import {TITLE_MAIN} from '../constants/main';

export default function main(state = {}, action = {}) {
    switch (action.type) {
        case TITLE_MAIN:
            return Object.assign({}, state, {
                title: action.title
            });
            break;
        default:
            return state
    }
}
