import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './container/app.jsx';

import Pages from './container/pages.jsx';
import Page from './container/page.jsx';
import PageForm from './container/page_form.jsx';

import Todo from './container/todo.jsx';
import Main from './container/main.jsx';
import Login from './container/login.jsx';
import PushMessages from './container/push.jsx';

import Restricted from './container/restricted.jsx';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={Main}/>
        <Route name="push" path="/push" component={PushMessages}/>
        <Route name="pages" path="/pages" component={Pages}/>
        <Route name="login" path="/login" component={Login}/>
        <Route path="/" component={Restricted}>
            <Route name="todos" path="/todos" component={Todo}/>
            <Route name="pageCreate" path="/page/create" component={PageForm}/>
            <Route name="pageEdit" path="/page/:id/edit" component={PageForm}/>
        </Route>
        <Route name="page" path="/page/:id" component={Page}/>

    </Route>
);
