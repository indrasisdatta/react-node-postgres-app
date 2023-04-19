import { combineReducers } from 'redux';
import { AuthReducer } from './authReducer';
import { userReducer } from './userReducer';

export default combineReducers({
    userReducer,
    auth: AuthReducer
});