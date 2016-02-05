import { ADD_TODO, DELETE_TODO, EDIT_TODO, RECEIVE_TODOS } from '../constants/todo'


export default function todo(state = [], action = {}) {
    switch (action.type) {
        case ADD_TODO:
            return [action.todo, ...state];

        case DELETE_TODO:
            return state.filter(todo => todo._id !== action._id);

        case EDIT_TODO:
            return state.map(todo => todo._id === action.todo._id ? Object.assign({}, todo, action.todo) : todo);

        case RECEIVE_TODOS:
            return action.todos;

        default:
            return state
    }
}