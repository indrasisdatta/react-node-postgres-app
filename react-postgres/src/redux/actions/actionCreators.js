import {
  TEAMS_LIST_ERROR,
  TEAMS_LIST_REQUEST,
  TEAMS_LIST_SUCCESS,
  TEAMWISE_MANAGERS_ERROR,
  TEAMWISE_MANAGERS_REQUEST,
  TEAMWISE_MANAGERS_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "./action";

export const userLoginRequest = (params) => {
  return {
    type: USER_LOGIN_REQUEST,
    payload: params,
  };
};
export const userLoginSuccess = (params) => {
  return {
    type: USER_LOGIN_SUCCESS,
    payload: params,
  };
};
export const userLoginError = (params) => {
  return {
    type: USER_LOGIN_ERROR,
    payload: params,
  };
};
export const userLogout = (params) => {
  return {
    type: USER_LOGOUT,
    payload: params,
  };
};

export const teamsListRequest = (params) => {
  return {
    type: TEAMS_LIST_REQUEST,
    payload: params,
  };
};
export const teamsListSuccess = (params) => {
  return {
    type: TEAMS_LIST_SUCCESS,
    payload: params,
  };
};
export const teamsListError = (params) => {
  return {
    type: TEAMS_LIST_ERROR,
    payload: params,
  };
};

export const teamwiseManagersRequest = (params) => {
  return {
    type: TEAMWISE_MANAGERS_REQUEST,
    payload: params,
  };
};
export const teamwiseManagersSuccess = (params) => {
  return {
    type: TEAMWISE_MANAGERS_SUCCESS,
    payload: params,
  };
};
export const teamwiseManagersError = (params) => {
  return {
    type: TEAMWISE_MANAGERS_ERROR,
    payload: params,
  };
};
