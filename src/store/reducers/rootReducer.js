import { combineReducers } from 'redux';
import todosReducer from './todosReducer';
import userReducer from './userReducer';
export default combineReducers({
  todo: todosReducer,
  user: userReducer,
});
