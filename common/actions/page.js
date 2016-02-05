import {REQUEST_PAGE, RECEIVE_PAGE, RESTORE_PAGE, UPDATING_PAGE, UPDATE_PAGE} from '../constants/page';
import { pushState } from 'redux-router';

import request from 'superagent';

function receivePage(data) {
    return {
        type: RECEIVE_PAGE,
        ...data
    };
}

function requestPage(data) {
    return {
        type: REQUEST_PAGE,
        ...data
    };
}

function restorePage(_id) {
    return {
        type: RESTORE_PAGE,
        _id
    };
}

function updatingPage() {
    return {
        type: UPDATING_PAGE
    }
}

function getPage(_id) {
    return dispatch => new Promise((resolve, reject) => {
        dispatch(requestPage({_id}));
        request.get(`/api/page/${_id}`)
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


export function createPage(data) {
    return dispatch => new Promise((resolve, reject) => {
        dispatch(updatingPage());
        request
            .post(`/api/page/create`)
            .send(data)
            .end((err, res) => {
                let data = JSON.parse(res.text);
                if (res.status === 200) {
                    dispatch(receivePage(data));
                    dispatch(pushState(null, `/page/${data._id}`));

                    resolve(data);
                } else {
                    reject()
                }
            });
    });
}

export function updatePage(data, _id) {
    return dispatch => new Promise((resolve, reject) => {
        dispatch(updatingPage());
        request.put(`/api/page/${_id}/edit`)
            .send(data)
            .end((err, res) => {
                let data = JSON.parse(res.text);
                if (res.status === 200) {
                    dispatch(receivePage(data));
                    dispatch(pushState(null, `/page/${data._id}`));
                    resolve(data);
                } else {
                    reject()
                }
            });
    });
}

export function fetchPageIfNeed(_id) {
    return (dispatch, getState) => {
        let page = getState().page.cache && getState().page.cache[_id];
        if (!page) {
            dispatch(getPage(_id));
        } else {
            dispatch(restorePage(_id));
        }
    }
}


export function emptyPage() {
    return dispatch => dispatch(requestPage({
        title: '',
        text: '',
        _id: false
    }));
}

export function changeData(data) {
    return dispatch => dispatch({
        type: UPDATE_PAGE,
        data
    });
}