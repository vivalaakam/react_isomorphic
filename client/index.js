import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {
    ReduxRouter,
    reduxReactRouter,
} from 'redux-router';

import { Provider } from 'react-redux';
import createHistory from 'history/lib/createBrowserHistory';

import routes from '../common/routes';
import reducer from '../common/reducers';
import {MOUNT_ID} from '../common/constants';

const store = compose(
    applyMiddleware(thunkMiddleware),
    reduxReactRouter({createHistory})
)(createStore)(reducer, window.__initialState);

const mountNode = document.getElementById(MOUNT_ID);

ReactDOM.render((
    <Provider store={store}>
        <ReduxRouter routes={routes}/>
    </Provider>
), mountNode);
