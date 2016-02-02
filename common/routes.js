import React from 'react';
import {Route} from 'react-router';

import App from './components/app.jsx';

import Page from './components/page.jsx';
import Todo from './components/todo.jsx';

export default (
    <Route path="/" component={App}>
        <Route path="page/:id" component={Page}/>
        <Route path="todos" component={Todo} />
    </Route>
);
