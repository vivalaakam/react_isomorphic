import actions from './modules'

import dispatch from './dispatch';

export default function local(components, req, res, store) {
    return new Promise((resolve, reject) => {
        let current_actions = components.reduce((actions, component) => {
            if (component.WrappedComponent && component.WrappedComponent.needData && component.WrappedComponent.needData.length > 0) {
                actions.push.apply(actions, component.WrappedComponent.needData);
            }

            return actions;
        }, []);

        let promises = current_actions.reduce((state, action) => {
            if (actions[action.name]) {
                state.push(new Promise((resolve) => {
                    let acts = [...actions[action.name], (req, res) => {
                        if (!res.locals.error) {
                            store.dispatch({type: action.type, ...res.locals.data});
                        }
                        resolve();
                    }];
                    dispatch(acts, req, res, () => {
                        console.log('done', res.locals);
                    });
                }));
            }

            return state;
        }, []);

        Promise.all(promises).then(() => {
            resolve();
        }, () => {
            reject();
        })
    });
}
