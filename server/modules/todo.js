import Todo from '../models/todo';
import {validate} from './auth';
import { UNAUTHORIZED } from '../constants';

export function getTodos(req, res, next) {
    if (!res.locals.error) {
        Todo.find({user: req.session.auth._id}).sort({created_at: -1}).exec((err, todos)=> {
                if (err) {
                    return;
                }
                res.locals.data = {todos};
                next();
            }
        );
    } else {
        next();
    }

}

export function getTodo(req, res, next) {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) {
            return;
        }

        if (todo.user.equals(req.session.auth._id)) {
            res.locals.data = todo;
        } else {
            res.locals.error = 'DENIED';
        }
        next();
    });
}

export function createTodo(req, res, next) {
    let data = req.body;
    data.user = req.session.auth._id;
    var todo = new Todo(data);
    todo.save((err) => {
        if (err) {
            return;
        }

        res.locals.data = todo;
        next();
    });
}

export function updateTodo(req, res, next) {
    Todo.update({_id: req.params.id, user: req.session.auth._id}, {
        $set: req.body,
        updated_at: new Date()
    }, {}, (err, todo) => {
        if (err) {
            return;
        }
        next();
    });
}

export function removeTodo(req, res, next) {
    Todo.findById(req.params.id, (err, todo) => {
        if (err) {
            return;
        }
        if (todo.user.equals(req.session.auth._id)) {
            todo.remove((err) => {
                if (err) {
                    return;
                }

                next();
            });
        } else {
            res.locals.error = 'DENIED';
            next();
        }

    });
}

export function removeCompletedTodos(req, res, next) {
    Todo.remove({completed: true, user: req.session.auth._id}, (err) => {
        if (err) {
            return;
        }

        next();
    });
}

export function completeAllTodos(req, res, next) {
    Todo.update({
        completed: false,
        user: req.session.auth._id
    }, {$set: {completed: true}}, {multi: true}, (err, todos) => {
        if (err) {
            return;
        }

        next();
    });
}

export default {
    getTodos: [validate, getTodos],
    getTodo: [validate, getTodo],
    createTodo: [validate, createTodo],
    updateTodo: [validate, updateTodo, getTodo],
    removeTodo: [validate, removeTodo],
    completeAllTodos: [validate, completeAllTodos, getTodos],
    removeCompletedTodos: [validate, removeCompletedTodos, getTodos]
}