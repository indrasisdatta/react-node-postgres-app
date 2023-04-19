import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";
import rootSaga from "./sagas";
import { composeWithDevTools } from "redux-devtools-extension";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
