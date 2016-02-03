import * as CONSTANTS from '../constants/main';

export function setTitle(title) {
    return dispatch => dispatch({
        title,
        type: CONSTANTS.TITLE_MAIN
    });
}
