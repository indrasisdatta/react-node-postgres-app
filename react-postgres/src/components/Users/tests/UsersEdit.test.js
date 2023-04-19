import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import UsersEdit from "../usersEdit";

describe("User edit", () => {
  let managers;
  let onSaveClick;
  let userManager;
  let userTeamMember;
  let handleSubmit;

  beforeEach(() => {
    managers = [
      {
        id: "4",
        empName: "Sarah",
        manager: null,
        team: [{ id: "1", name: "Citi Bank" }],
      },
      {
        id: "7",
        empName: "Steven",
        manager: null,
        team: [{ id: "2", name: "Cantor" }],
      },
    ];
    userManager = {
      id: "4",
      empName: "Sarah",
      manager: null,
      team: [{ id: "1", name: "Citi Bank" }],
      isEditing: 1,
    };
    userTeamMember = {
      id: "5",
      empName: "Jill",
      manager: "Sarah",
      team: [{ id: "1", name: "Citi Bank" }],
    };
    onSaveClick = jest.fn();
    handleSubmit = jest.fn();
  });

  test("Populate form inputs", async () => {
    render(
      <UsersEdit
        user={userTeamMember}
        managers={managers}
        onSaveClick={onSaveClick}
      />
    );
    const name = screen.getByLabelText("Name");
    // const type = screen.getByRole("listbox").getByText(/Type/);
    // const type = screen.getByLabelText(/Type/);

    const userType = screen.getByTestId("userType");
    const reportsTo = screen.getByTestId("reportsTo");
    const assignedTo = screen.getByTestId("assignedTo");

    expect(name.value).toEqual(userTeamMember.empName);
    expect(userType.childNodes[1].value).toEqual("Team Member");
    expect(reportsTo.childNodes[1].value).toEqual(userTeamMember.manager);
    expect(assignedTo.childNodes[1].value).toEqual(userTeamMember.team[0].id);

    // console.log("Label type: ", userType.childNodes[1].value);

    // expect(
    //   screen.getByRole("option", { name: "Team Member" }).selected
    // ).toBe( true);

    // await waitFor(() => {
    // const userType = screen.querySelectorAll('input[name="userType"]');
    // expect(userType[0]).toHaveValue("Team Member");
    // });

    // expect(name.value).toEqual(userTeamMember.empName);
    // expect(type.value).toEqual("Team Member");
    // expect(reportsTo.value).toEqual(userTeamMember.manager);

    // fireEvent.change(
    //   screen.getByTestId('userType'),
    //   { target: { value: 'Manager' }}
    // );
  });

  test.skip("Team member invalid entry", async () => {
    render(
      <UsersEdit
        user={userTeamMember}
        managers={managers}
        onSaveClick={onSaveClick}
      />
    );
    const name = screen.getByLabelText("Name");
    const userType = screen.getByTestId("userType");
    const reportsTo = screen.getByTestId("reportsTo");
    const assignedTo = screen.getByTestId("assignedTo");

    fireEvent.change(name, { target: { value: "" } });
    // fireEvent.change(assignedTo, { target: { value: "" } });
    // fireEvent.click(screen.getByText(userTeamMember.team[0].name));
    fireEvent.change(assignedTo.childNodes[1], { target: { value: "" } });

    // Close the select using Escape or Tab or clicking away
    // fireEvent.keyDown(document.activeElement, {
    //   key: "Escape",
    //   code: "Escape",
    // });
    // Wait for Menu to close
    // await waitForElementToBeRemoved(
    //   screen.getByText(userTeamMember.team[0].name)
    // );

    // Verify selections
    expect(screen.getByLabelText("Reports to")).toHaveTextContent("");
    return;

    const saveBtn = screen.getByTestId("save-btn");
    fireEvent.click(saveBtn);

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      // expect(assignedTo.childNodes[1].value).toBeFalsy();
      expect(
        screen.getByText("Associate should be assigned to at least 1 team")
      ).toBeInTheDocument();
    });
  });
});
