import actions from './models'

export default function fetchData(params, current_actions = [], store) {
    return new Promise((resolve, reject) => {
        let promises = current_actions.map((action) => {
            let promise = actions[action.name](params, (response) => {
                store.dispatch({type: action.type, ...response});
            });
            return promise;
        });
        Promise.all(promises).then(() => {
            resolve();
        }, () => {
            reject();
        })
    });
}
