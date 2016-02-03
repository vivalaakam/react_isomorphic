import React from 'react';
import {Route} from 'react-router';

import App from './components/app.jsx';

import Pages from './components/pages.jsx';
import Page from './components/page.jsx';
import Todo from './components/todo.jsx';

export default (
    <Route path="/" component={App}>
        <Route name="todos" path="/todos" component={Todo} />
        <Route name="pages" path="/pages" component={Pages}>
        </Route>
        <Route name="page" path="/page/:id" component={Page}/>

    </Route>
);
