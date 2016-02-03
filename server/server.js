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

import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config';
import {MOUNT_ID} from '../common/constants';
import reducer from '../common/reducers';
import routes from '../common/routes';


import api from './api';
import fetchData from './fetchData';

const app = express();
const compiler = webpack(config);

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


app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

app.use('/api', api);

app.use((req, res) => {
    const store = reduxReactRouter({routes, createHistory: createMemoryHistory})(createStore)(reducer);

    store.dispatch(match(req.url, (error, redirectLocation, routerState) => {
        if (error) {
            console.error('Router error:', error);
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (!routerState) {
            res.status(400).send('Not Found');
        } else {
            let actions = routerState.components.reduce((actions, component) => {
                if (component.WrappedComponent && component.WrappedComponent.needData && component.WrappedComponent.needData.length > 0) {
                    actions.push.apply(actions, component.WrappedComponent.needData);
                }

                return actions;
            }, []);

            fetchData(routerState.params, actions, store).then(() => {
                res.status(200).send(getMarkup(store));
            });
        }
    }));
});

app.listen(3000, 'localhost', error => {
    if (error) {
        console.log(error);
        return;
    }

    console.log('Listening at http://localhost:3000');
});
