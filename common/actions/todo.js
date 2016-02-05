import * as types from '../constants/todo'
import request from 'superagent';

function addTodoDispatch(todo) {
    return {
        type: types.ADD_TODO,
        todo
    }
}

function deleteTodoDispatch(_id) {
    return {
        type: types.DELETE_TODO,
        _id
    }
}

function editTodoDispatch(todo) {
    return {
        type: types.EDIT_TODO,
        todo
    }
}

function receiveTodosDispatch(todos) {
    return {
        type: types.RECEIVE_TODOS,
        todos,
        receivedAt: Date.now()
    }
}

export function fetchTodos(token) {
    return dispatch => new Promise((resolve , reject) => {
        request
            .get('/api/todos')
            .set('Authorization', token)
            .send()
            .end((error , res) => {
                if (res) {
                    let data = JSON.parse(res.text);
                    if (res.status === 200) {
                        dispatch( receiveTodosDispatch( data.todos ) );
                        resolve(data);
                    } else {
                        reject(data);
                    }
                }
            });
    });
}

export function addTodo(text) {
    return dispatch => new Promise((resolve , reject) => {
        request.post('/api/todos')
            .send({
                text
            })
            .end((error, res) => {
                if (res) {
                    let data = JSON.parse(res.text);
                    if (res.status === 200) {
                        dispatch( addTodoDispatch( data ) );
                        resolve(data);
                    } else {
                        reject(data);
                    }
                }
            });
    });
}

export function deleteTodo(id) {
    return dispatch => new Promise((resolve, reject) => {
        request
            .del(`/api/todos/${id}`)
            .send()
            .end((error, res) => {
                if(res) {
                    if(res.status === 200) {
                        dispatch(deleteTodoDispatch(id));
                        resolve();
                    } else {
                        reject();
                    }
                }
            });
    });
}

export function editTodo(id , text) {
    return dispatch => new Promise((resolve, reject) => {
        request
            .put(`/api/todos/${id}`)
            .send({text})
            .end((error, res) => {
                if(res.status === 200) {
                    let todo = JSON.parse(res.text);
                    dispatch(editTodoDispatch(todo));
                    resolve(todo);
                } else {
                    reject();
                }
            });

    });
}

export function completeTodo(id , completed) {
    return dispatch => new Promise((resolve , reject) => {
        request
            .put(`/api/todos/${id}`)
            .send({completed})
            .end((error, res) => {
                if(res.status === 200) {
                    let todo = JSON.parse(res.text);
                    dispatch(editTodoDispatch(todo));
                    resolve(todo);
                }  else {
                    reject();
                }
            });
    });
}


export function completeAllTodo() {
    return dispatch => new Promise((resolve, reject) => {
        request.post('/api/todos/completeAll')
            .send()
            .end((error, res) => {
                let data = JSON.parse(res.text);
                if (res.status === 200) {
                    dispatch( receiveTodosDispatch( data.todos ) );
                    resolve(data);
                } else {
                    reject(data);
                }
            });
    });
}

export function clearComletedTodo() {
    return dispatch => new Promise((resolve, reject) => {
        request.post('/api/todos/clearCompleted')
            .send()
            .end((error, res) => {
                let data = JSON.parse(res.text);
                if (res.status === 200) {
                    dispatch( receiveTodosDispatch( data.todos ) );
                    resolve(data);
                } else {
                    reject(data);
                }
            });
    });
}
