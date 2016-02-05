import {SIGNIN_AUTH, SIGNOUT_AUTH} from '../constants/auth';

export default function auth(state = {}, action = {}) {
    //console.log(state, action);
    switch (action.type) {
        case SIGNIN_AUTH:
            return Object.assign({}, state, {
                isAuthenticated: action.isAuthenticated,
                token: action.token,
                login: action.login,
                _id: action.id,
                email: action.email
            });
            break;
        case SIGNOUT_AUTH:
            return Object.assign({
                isAuthenticated: false,
                token: ''
            });
            break;
        default:
            return state
    }
}