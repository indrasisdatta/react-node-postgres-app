import { fireEvent, render, screen } from "@testing-library/react";
import UserRow from "../userRow";

describe("User row", () => {
  let onEditClick;
  let userManager;
  let userTeamMember;

  beforeEach(() => {
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
    onEditClick = jest.fn();
  });

  test("Render row", () => {
    render(<UserRow user={userTeamMember} onEditClick={onEditClick} />);
    const testElt = screen.getByTestId(`user-row-${userTeamMember.id}`);
    expect(testElt).toBeInTheDocument();
  });

  test("Team member edit button click allowed", () => {
    render(<UserRow user={userTeamMember} onEditClick={onEditClick} />);
    const testElt = screen.getByTestId(`edit-btn-${userTeamMember.id}`);
    expect(testElt).not.toHaveClass("disabled");
    fireEvent.click(testElt);
    expect(onEditClick).toHaveBeenCalled();
  });

  test("Manager edit button click restricted", () => {
    render(<UserRow user={userManager} onEditClick={onEditClick} />);
    const testElt = screen.getByTestId(`edit-btn-${userManager.id}`);
    expect(testElt).toHaveClass("disabled");
    // fireEvent.click(testElt);
    // expect(onEditClick).toHaveBeenCalledTimes(0);
  });
});
