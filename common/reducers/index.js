import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import page from './page';
import todo from './todo';

export default combineReducers({
  router: routerStateReducer,
  todo, page
});
