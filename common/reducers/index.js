import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import page from './page';
import todo from './todo';
import main from './main';
import auth from './auth';

export default combineReducers({
    router: routerStateReducer,
    todo, page, main, auth
});
