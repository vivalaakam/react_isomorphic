import express from 'express';
import * as pages from './models/page';
import * as todos from './models/todo';
const router = express.Router();

router.get('/page/:id', (req, res) => {
    pages.getPage(req.params, (value) => {
        res.json(value);
    }, (error) => {
        res.status(404).json(error);
    });
});


router.get('/todos', (req, res) => {
    todos.getTodos((values) => {
        res.json(values.todos);
    });
});

router.post('/todos', (req, res) => {
    todos.createTodo({ text:req.body.text , completed:false }, (value) => {
        res.json(value);
    });
});

router.get('/todos/:id', (req, res) => {
    todos.getTodo(req.params.id, (value) => {
        res.json(value);
    });
});

router.delete('/todos/:id' , (req, res) => {
    todos.removeTodo(req.params.id, (id) => {
        res.json( { id } );
    });
});

router.post('/todos/clearCompleted', (req, res) => {
    todos.removeCompletedTodos(() => {
        todos.getTodos((values) => {
            res.json(values.todos);
        });
    });
});

router.post('/todos/completeAll', (req, res) => {
    todos.completeAllTodos(() => {
        todos.getTodos((values) => {
            res.json(values.todos);
        });
    });
});

router.put('/todos/:id' , (req, res) => {
    todos.updateTodo(req.params.id, req.body, (value) => {
        res.json(value);
    });
});

export default router;
