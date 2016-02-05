import Todo from '../models/todo';
import {validate} from './auth';
import { UNAUTHORIZED } from '../constants';

export function getTodos(req, res, next) {
    if (!res.locals.error) {
        Todo.find({}).sort({created_at: -1}).exec((err, todos)=> {
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

        res.locals.data = todo;
        next();
    });
}

export function createTodo(req, res, next) {
    let data = req.body;
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
    Todo.update({_id: req.params.id}, {$set: req.body}, {}, (err, todo) => {
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
        todo.remove((err) => {
            if (err) {
                return;
            }

            next();
        });
    });
}

export function removeCompletedTodos(req, res, next) {
    Todo.remove({completed: true}, (err) => {
        if (err) {
            return;
        }

        next();
    });
}

export function completeAllTodos(req, res, next) {
    Todo.update({completed: false}, {$set: {completed: true}}, {multi: true}, (err, todos) => {
        if (err) {
            return;
        }

        next();
    });
}

export default {
    getTodos: [validate, getTodos],
    getTodo: [getTodo],
    createTodo: [createTodo],
    updateTodo: [updateTodo, getTodo],
    removeTodo: [removeTodo],
    completeAllTodos: [completeAllTodos, getTodos],
    removeCompletedTodos: [removeCompletedTodos, getTodos]
}