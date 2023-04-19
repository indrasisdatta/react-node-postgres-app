import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import UsersList from "../usersList";
import configureStore from "redux-mock-store";
import { server } from "../../../mocks/server";
import { usersListApi } from "../../../mocks/handlers";
import { expectSaga } from "redux-saga-test-plan";
import { USERS_LIST_REQUEST } from "../../../redux/actions/action";
import createSagaMiddleware from "@redux-saga/core";

const mockStore = configureStore([]);

describe("User list", () => {
  let store;
  let mockSagaMiddleware;
  const initialState = {
    auth: {},
    userReducer: {
      usersList: {
        loading: false,
        data: {
          status: 1,
          data: [
            {
              id: "4",
              empName: "Sarah",
              manager: null,
              team: [{ id: "1", name: "Citi Bank" }],
              isEditing: 1,
            },
            {
              id: "5",
              empName: "Jill",
              manager: "Sarah",
              team: [{ id: "1", name: "Citi Bank" }],
            },
            {
              id: "6",
              empName: "Adam G",
              manager: "Sarah",
              team: [{ id: "1", name: "Citi Bank" }],
            },
          ],
        },
        error: null,
      },
    },
  };

  beforeEach(() => {
    store = mockStore(initialState);
    // mockSagaMiddleware = expectSaga.createSagaMiddleware();
    store.dispatch = jest.fn();
  });

  test("Render list", async () => {
    server.use(usersListApi);
    render(
      <Provider store={store}>
        <UsersList />
      </Provider>
    );
    // const testElement = screen.getByText(/Users list/);
    const testElement = screen.getByTestId("user-list");
    expect(testElement).toBeInTheDocument();
  });

  test("Dispatch action", async () => {
    render(
      <Provider store={store}>
        <UsersList />
      </Provider>
    );
    //  console.log("Dispatch", store.getActions(), USERS_LIST_REQUEST);
    expect(store.dispatch).toHaveBeenCalled();
  });

  test("User edit and view mode", async () => {
    render(
      <Provider store={store}>
        <UsersList />
      </Provider>
    );
    const userRowElt = await screen.findAllByTestId(/^user-row/);
    expect(userRowElt.length).toEqual(2);

    const userEditElt = await screen.findAllByTestId(/^user-edit/);
    expect(userEditElt.length).toEqual(1);
  });
});
