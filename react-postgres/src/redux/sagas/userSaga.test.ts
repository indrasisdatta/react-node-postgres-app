import { testSaga } from "redux-saga-test-plan";
import { USERS_LIST_ERROR, USERS_LIST_REQUEST, USERS_LIST_SUCCESS } from "../actions/action";
import userSaga, { fetchUsers } from "./userSaga";
import { getUsersList } from "../../services/UserService";
import { takeLatest } from "redux-saga/effects";

describe('User saga', () => {

    test('Main generator check', () => {
        const saga = testSaga(userSaga);
        saga.next()
            .takeLatest(USERS_LIST_REQUEST, fetchUsers)
            .next()
            .isDone();
    });

    test('Fetch users success', () => {
        const getUsersCall = fetchUsers({ type: USERS_LIST_REQUEST, payload: { q: "test" } }); 
        // console.log('getUsersCall', getUsersCall.next())
        const saga = testSaga(fetchUsers, { type: USERS_LIST_REQUEST, payload: { q: "test" } });
        saga.next()
            .call(getUsersList, { q: "test" })
            .next({ type: 'TEST' })
            .put({ type: USERS_LIST_SUCCESS, payload:undefined })
            .next()
            .isDone();
    });

    test('Fetch users error', () => {
        const saga = testSaga(fetchUsers, { type: USERS_LIST_REQUEST });
        const err = new Error('Test error');
        saga.next()
            // .call(getUsersList, { q: "test" })
            // .next({ type: 'TEST' })
            .throw(err)
            .put({ type: USERS_LIST_ERROR, payload: err.message })
            .next()
            .isDone();
    })
});