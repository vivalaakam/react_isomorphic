import * as CONSTANTS from '../constants/page';
import request from 'superagent';


function receivePage(data) {
    return {
        type: CONSTANTS.RECEIVE_PAGE,
        ...data
    };
}

function requestPage(data) {
    return {
        type: CONSTANTS.REQUEST_PAGE,
        ...data
    };
}

function getPage(id) {
    return dispatch => new Promise((resolve, reject) => {
        dispatch(requestPage({id}));
        request.get(`/api/page/${id}`)
            .send()
            .end((err, res) => {
                let data = JSON.parse(res.text);
                if (res.status === 200) {
                    dispatch(receivePage(data));
                    resolve(data);
                } else {
                    reject(data);
                }
            });
    });
}


export function fetchPageIfNeed(id) {
    return (dispatch, getState) => {
        if (!getState().page[id]) {
            dispatch(getPage(id));
        }
    }
}
