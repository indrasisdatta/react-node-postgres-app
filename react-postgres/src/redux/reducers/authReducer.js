import { combineReducers } from 'redux';
import { getLoggedinUser, removeLoggedinUser } from "../../utils/util"
import { 
    USER_LOGIN_ERROR, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT
} from '../actions/action';

const defaultAuthState = getLoggedinUser() || { token: null, userData: null, error: null };

const authUser = (state = defaultAuthState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { token: null, userData: null, error: null }
        case USER_LOGIN_SUCCESS:
            return {
                token: action.payload.token,
                userData: {
                    username: action.payload.username
                },
                error: null
            }
        case USER_LOGIN_ERROR:
            return { token: null, userData: null, error: action.payload }
        case USER_LOGOUT:
            removeLoggedinUser();
            return { token: null, userData: null, error: null };
        default: 
            return state;
    }
}

export const AuthReducer = combineReducers({
    authUser
});