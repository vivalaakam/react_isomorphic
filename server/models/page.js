import Firebase from 'firebase';

const url = 'https://vivalaakam.firebaseio.com';

function convert(snap) {
    let item = snap.val();
    return {id: snap.key(), ...item};
}

export function getPage(params = {}, ...states) {
    let {id } = params;
    let todo = new Firebase(`${url}/page/${id}`);
    return new Promise((resolve, reject) => {
        todo.once('value', (snap) => {
            if (snap.exists()) {
                resolve(convert(snap));
            } else {
                reject({type: 'NOT_FOUND'});
            }
        });
    }).then(...states);
}
