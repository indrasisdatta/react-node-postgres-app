import { combineReducers } from "redux";
import {
  TEAMS_LIST_ERROR,
  TEAMS_LIST_REQUEST,
  TEAMS_LIST_SUCCESS,
  TEAMWISE_MANAGERS_ERROR,
  TEAMWISE_MANAGERS_REQUEST,
  TEAMWISE_MANAGERS_SUCCESS,
  USERS_LIST_ERROR,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
} from "../actions/action";

const initialState = {
  loading: true,
  data: [],
  error: null,
};

export const usersList = (state = initialState, action) => {
  switch (action.type) {
    case USERS_LIST_REQUEST:
      console.log("usersList reducer");
      return initialState;
    case USERS_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case USERS_LIST_ERROR:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export const teamsList = (state = initialState, action) => {
  switch (action.type) {
    case TEAMS_LIST_REQUEST:
      return initialState;
    case TEAMS_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case TEAMS_LIST_ERROR:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export const teamwiseManagersList = (state = initialState, action) => {
  switch (action.type) {
    case TEAMWISE_MANAGERS_REQUEST:
      return initialState;
    case TEAMWISE_MANAGERS_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };
    case TEAMWISE_MANAGERS_ERROR:
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userReducer = combineReducers({
  usersList,
  teamsList,
  teamwiseManagersList,
});
