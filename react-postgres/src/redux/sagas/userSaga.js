import {
  getManagersByTeam,
  getTeamsList,
  getUsersList,
} from "../../services/UserService";
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import {
  USERS_LIST_ERROR,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
} from "../actions/action";
import { TEAMS_LIST_SUCCESS } from "../actions/action";
import { TEAMS_LIST_ERROR } from "../actions/action";
import { TEAMS_LIST_REQUEST } from "../actions/action";
import { TEAMWISE_MANAGERS_SUCCESS } from "../actions/action";
import { TEAMWISE_MANAGERS_ERROR } from "../actions/action";
import { TEAMWISE_MANAGERS_REQUEST } from "../actions/action";

export function* fetchUsers(action) {
  console.log("Saga fetchUsers action", action);
  try {
    const userResp = yield call(getUsersList, action.payload);
    console.log("userResp success", userResp);
    yield put({
      type: USERS_LIST_SUCCESS,
      payload: userResp.data,
    });
  } catch (e) {
    console.log("userResp err", e);
    yield put({
      type: USERS_LIST_ERROR,
      payload: e.message,
    });
  }
}

export function* teamsListSaga(action) {
  console.log("teamsListSaga");
  try {
    const teamsRes = yield call(getTeamsList, action.payload);
    console.log("Teams resp", teamsRes);
    yield put({
      type: TEAMS_LIST_SUCCESS,
      payload: teamsRes.data,
    });
  } catch (e) {
    yield put({
      type: TEAMS_LIST_ERROR,
      payload: e,
    });
  }
}

export function* managersByTeamSaga(action) {
  console.log("managersByTeamSaga");
  try {
    const mangRes = yield call(getManagersByTeam, action.payload);
    console.log("Managers resp", mangRes);
    yield put({
      type: TEAMWISE_MANAGERS_SUCCESS,
      payload: mangRes.data,
    });
  } catch (e) {
    yield put({
      type: TEAMWISE_MANAGERS_ERROR,
      payload: e,
    });
  }
}

export default function* userSaga() {
  yield takeLatest(USERS_LIST_REQUEST, fetchUsers);
  yield takeLatest(TEAMS_LIST_REQUEST, teamsListSaga);
  yield takeLatest(TEAMWISE_MANAGERS_REQUEST, managersByTeamSaga);
}
