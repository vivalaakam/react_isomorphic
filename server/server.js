import path from 'path';
import express from 'express';
import webpack from 'webpack';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {ReduxRouter} from 'redux-router'
import {reduxReactRouter, match} from 'redux-router/server';
import serialize from 'serialize-javascript';
import { createMemoryHistory } from 'history';
import bodyParser from 'body-parser';
import session from 'express-session';

import mongoose from 'mongoose';
import mongoStore from 'connect-mongo';

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config';
import {MOUNT_ID} from '../common/constants';
import reducer from '../common/reducers';
import routes from '../common/routes';


import api from './api';
import local from './local';

import {getAuth} from './modules/auth';
import dispatch from './dispatch';

import {SIGNIN_AUTH} from '../common/constants/auth';


const app = express();
const compiler = webpack(config);

const MongoStore = mongoStore(session);

mongoose.connect(process.env.MONGOLAB_URI);

const getMarkup = (store) => {
    const initialState = serialize(store.getState());

    const markup = renderToString(
        <Provider store={store} key="provider">
            <ReduxRouter/>
        </Provider>
    );

    return `<!doctype html>
    <html>
      <head>
        <title>Redux React Router – Server rendering Example</title>
        <link href="/static/style.css" rel="stylesheet" />
      </head>
      <body>
        <div id="${MOUNT_ID}">${markup}</div>
        <script>window.__initialState = ${initialState};</script>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;
};

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use('/api', api);

app.use((req, res) => {
    const store = reduxReactRouter({routes, createHistory: createMemoryHistory})(createStore)(reducer);

    let auth = [getAuth, (req, res, next) => {
        store.dispatch({
            type: SIGNIN_AUTH,
            ...res.locals.data
        });
        next();
    }];

    dispatch(auth, req, res, () => {
        store.dispatch(match(req.url, (error, redirectLocation, routerState) => {
            if (error) {
                console.error('Router error:', error);
                res.status(500).send(error.message);
            } else if (redirectLocation) {
                res.redirect(302, redirectLocation.pathname + redirectLocation.search);
            } else if (!routerState) {
                res.status(400).send('Not Found');
            } else {
                let {components} = routerState;
                req.params = {...req.params, ... routerState.params};

                local(components, req, res, store).then(() => {
                    res.status(200).send(getMarkup(store));
                });
            }
        }));
    });
});

let port = process.env.PORT || 3000;

app.listen(port, 'localhost', error => {
    if (error) {
        console.log(error);
        return;
    }

    console.log('Listening at http://localhost:3000');
});
