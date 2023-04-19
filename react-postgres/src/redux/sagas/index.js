import { spawn } from "redux-saga/effects";
import userSaga from "./userSaga";
import authSaga from "./authSaga";

export default function* rootSaga() {
    yield spawn(userSaga);
    yield spawn(authSaga);
}