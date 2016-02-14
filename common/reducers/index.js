import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import page from './page';
import pages from './pages';
import todo from './todo';
import main from './main';
import auth from './auth';
import places from './places';


export default combineReducers({
    router: routerStateReducer,
    todo, page, main, auth, pages, places
});
