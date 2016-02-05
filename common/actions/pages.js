import {REQUEST_PAGES, RECEIVE_PAGES} from '../constants/page';
import { setTitle } from './main';
import request from 'superagent';

function receivePages(pages) {
    return {
        type: RECEIVE_PAGES,
        pages: pages
    };
}

function requestPages(data) {
    return {
        type: REQUEST_PAGES
    };
}

function getPages() {
    return dispatch => new Promise((resolve, reject) => {
        dispatch(requestPages());
        request.get(`/api/pages`)
            .send()
            .end((err, res) => {
                let data = JSON.parse(res.text);
                if (res.status === 200) {
                    dispatch(receivePages(data.pages));
                    resolve(data);
                } else {
                    reject(data);
                }
            });
    });
}

export function fetchPagesIfNeed() {
    return (dispatch, getState) => {
        let pages = getState().pages.pages;
        if (!pages.length) {
            dispatch(getPages());
        }
    }
}
