import React from 'react';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import * as TodoActions from '../actions/todo';
import {RECEIVE_TODOS} from '../constants/todo';

import Header from '../components/header.jsx'
import MainSection from '../components/mainSection.jsx'

if (process.env.BROWSER) {
    require('../styles/todo.less');
}

class Todo extends React.Component {

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(TodoActions.fetchTodos(this.props.authState.token));
    }

    render() {
        const { todos, actions } = this.props;
        return (
            <div className="todo">
                <h2>Todos</h2>
                <Header addTodo={actions.addTodo} dispatch={this.props.dispatch}/>
                <MainSection todos={todos} actions={actions}/>
            </div>
        )
    }
}

Todo.propTypes = {
    todos: React.PropTypes.array.isRequired,
    dispatch: React.PropTypes.func.isRequired
};

Todo.needData = [
    {name: 'getTodos', type: RECEIVE_TODOS}
];

const state = (st) => ({
    todos: st.todo,
    authState: st.auth
});

const actions = (dispatch) => ({
    actions: bindActionCreators({...TodoActions}, dispatch),
    dispatch: dispatch
});

export default connect(state, actions)(Todo);
