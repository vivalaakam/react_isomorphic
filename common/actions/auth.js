import request from 'superagent';
import { pushState } from 'redux-router';
import {SIGNIN_AUTH, SIGNOUT_AUTH} from '../constants/auth';

function signinDispatch(data) {
    return {
        type: SIGNIN_AUTH,
        ...data
    }
}

function signoutDispatch() {
    return {
        type: SIGNOUT_AUTH
    };
}

export function signin(email, password, redirect = "/") {
    return dispatch => new Promise((resolve, reject) => {
        request
            .post('/api/signin')
            .send({email, password})
            .end((err, res) => {
                let data = JSON.parse(res.text);
                if (res.status === 200) {
                    dispatch(signinDispatch(data));
                    dispatch(pushState(null, redirect));
                    resolve(data);
                } else {
                    reject(data);
                }
            });
    });
}

export function signout(redirect = "/") {
    return dispatch => new Promise((resolve, reject) => {
        request
            .post('/api/signout')
            .send()
            .end((err, res) => {
                let data = JSON.parse(res.text);
                if (res.status === 200) {
                    dispatch(signoutDispatch(data));
                    dispatch(pushState(null, redirect));
                    resolve(data);
                } else {
                    reject(data);
                }
            });
    });
}
