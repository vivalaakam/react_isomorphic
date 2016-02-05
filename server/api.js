import express from 'express';
import { UNAUTHORIZED } from './constants';
import page from './modules/page';
import todo from './modules/todo';
import auth from './modules/auth';

const router = express.Router();

router.get('/page/:id', ...page.getPage, (req, res) => {
    if (!res.locals.error) {
        res.json(res.locals.data);
    } else {
        let {error} = res.locals;
        res.status(404).json({error});
    }
});


router.get('/todos', ...todo.getTodos, (req, res) => {
    if (!res.locals.error) {
        res.json(res.locals.data);
    } else {
        res.status(401).json(res.locals.error);
    }
});

router.post('/todos', ...todo.createTodo, (req, res) => {
    res.json(res.locals.data);
});

router.get('/todo/:id', ...todo.getTodo, (req, res) => {
    if (!res.locals.error) {
        res.json(res.locals.data);
    } else {
        let {error} = res.locals;
        res.status(404).json({error});
    }
});

router.delete('/todos/:id', ...todo.removeTodo, (req, res) => {
    res.json({_id: req.params.id});
});

router.post('/todos/clearCompleted', ...todo.removeCompletedTodos, (req, res) => {
    res.json(res.locals.data);
});

router.post('/todos/completeAll', ...todo.completeAllTodos, (req, res) => {
    res.json(res.locals.data);
});

router.put('/todos/:id', ...todo.updateTodo, (req, res) => {
    if (!res.locals.error) {
        res.json(res.locals.data);
    } else {
        let {error} = res.locals;
        res.status(404).json({error});
    }
});

router.post('/signin', ...auth.signin, (req, res) => {
    if (!res.locals.error) {
        res.json(res.locals.data);
    } else {
        let {error} = res.locals;
        res.status(404).json({error});
    }
});

router.post('/signout', ...auth.signout, (req, res) => {
    res.json(res.locals.data);
});

export default router;
