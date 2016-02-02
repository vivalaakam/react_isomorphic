import Firebase from 'firebase';

const url = 'https://vivalaakam.firebaseio.com';

function convert(snap) {
    let item = snap.val();
    return { confirmed: false , id: snap.key() , ...item };
}

export function getTodos(...states) {
    let todos = new Firebase(`${url}/todos`);
    return new Promise((resolve) => {
        todos.once('value', snapshots  => {
            let todos = [];
            snapshots.forEach((snap) => {
                todos.unshift(convert(snap));
            });
            resolve({todos});
        });
    }).then(...states);
}

export function getTodo(id, ...states) {
    let todo = new Firebase(`${url}/todos/${id}`);
    return new Promise((resolve) => {
        todo.once('value', (snap) => {
            resolve(convert(snap));
        });
    }).then(...states);
}

export function createTodo(data, ...states) {
    let todos = new Firebase(`${url}/todos`);
    return new Promise((resolve) => {
        todos.once('child_added' , (snap) => {
            resolve(convert(snap));
        });
        todos.push( data );
    }).then(...states);
}

export function updateTodo(id, data, ...states) {
    let todo = new Firebase(`${url}/todos/${id}`);
    return new Promise((resolve) => {
        todo.update( data , () => {
            getTodo(id , resolve);
        } );
    }).then(...states);
}

export function removeTodo(id, ...states) {
    let todo = new Firebase(`${url}/todos/${id}`);
    return new Promise((resolve) => {
        todo.remove(() => {
            resolve(todo.key());
        });
    }).then(...states);
}

export function removeCompletedTodos(...states) {
    let todos = new Firebase(`${url}/todos`);
    return new Promise((resolve) => {
        let promises = [];
        todos.orderByChild("completed").equalTo(true)
            .once('value', (snapshots) => {
                snapshots.forEach((snap) => {
                    promises.push(removeTodo(snap.key()));
                });
            });

        Promise.all(promises).then(() => {
            resolve();
        });
    }).then(...states);
}

export function completeAllTodos(...states) {
    let todos = new Firebase(`${url}/todos`);
    return new Promise((resolve) => {
        let promises = [];
        todos.orderByChild("completed").equalTo(false)
            .once('value', (snapshot) => {
                snapshot.forEach((snap) => {
                    promises.push(updateTodo(snap.key() , { completed: true }));
                });
            });

        Promise.all(promises).then(() => {
            resolve();
        });
    }).then(...states);
}

