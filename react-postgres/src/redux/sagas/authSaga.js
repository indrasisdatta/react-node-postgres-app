import { 
    call, 
    cancel, 
    fork, 
    put, 
    take 
} from "redux-saga/effects";
import AuthService from "../../services/AuthService";
import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGOUT } from "../actions/action";
import { userLoginError, userLoginSuccess } from "../actions/actionCreators";
import { removeLoggedinUser, setLoggedinUser } from "../../utils/util";

function* authorize(postData) {
    try {
        const res = yield call(AuthService.login, postData);
        if (res.status === 1) {
            console.log('Success');
            yield put(userLoginSuccess(res.data));
            yield call(setLoggedinUser, res.data);
        } else {
            console.log('Error')
            let err = res.hasOwnProperty('err') ? res.err : 'Invalid attempt';
            yield put(userLoginError(err))
            // yield put({ type: USER_LOGIN_ERROR, payload: err})
        }
    } catch (e) {
        yield put(userLoginError(e))
    }
}

export default function* authSaga() {
    while (true) {
        const loginReq = yield take(USER_LOGIN_REQUEST);
        console.log('loginReq', loginReq);
        const task = yield fork(authorize, loginReq.payload);

        const action = yield take([USER_LOGOUT, USER_LOGIN_ERROR]);
        console.log('User logout and login error action monitor...', action);
        if (action.type === USER_LOGOUT) {
            yield cancel(task);
        }
        yield call(removeLoggedinUser);
    }
}