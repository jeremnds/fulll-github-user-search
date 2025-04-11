import { useUsers } from "@/hooks/useUsers";
import { createMockUsersContext } from "@/tests/mocks/user.mock";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Toolbar from "./Toolbar";

vi.mock("@/hooks/useUsers", () => ({
  useUsers: vi.fn(),
}));

describe("Toolbar", () => {
  it("should toggle edit mode on click", () => {
    const handleToggleEditMode = vi.fn();
    vi.mocked(useUsers).mockReturnValue(
      createMockUsersContext({
        handleToggleEditMode,
      })
    );
    render(<Toolbar />);
    const button = screen.getByRole("button", { name: /Enable edit mode/i });

    fireEvent.click(button);

    expect(handleToggleEditMode).toHaveBeenCalled();

    vi.mocked(useUsers).mockReturnValue(
      createMockUsersContext({
        editMode: true,
      })
    );
    render(<Toolbar />);

    expect(
      screen.getByRole("button", { name: /Disable edit mode/i })
    ).toBeInTheDocument();
  });

  it("should show checkbox when edit mode is true", () => {
    vi.mocked(useUsers).mockReturnValue(
      createMockUsersContext({
        editMode: true,
      })
    );
    render(<Toolbar />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("should call handleDuplicateUsers when duplicate button is clicked", () => {
    const handleDuplicateUsers = vi.fn();
    vi.mocked(useUsers).mockReturnValue(
      createMockUsersContext({
        editMode: true,
        handleDuplicateUsers,
      })
    );
    render(<Toolbar />);
    const button = screen.getByTestId("duplicate-icon");

    fireEvent.click(button);

    expect(handleDuplicateUsers).toHaveBeenCalled();
  });

  it("should call handleDeleteSelectedUsers when delete button is clicked", () => {
    const handleDeleteSelectedUsers = vi.fn();
    vi.mocked(useUsers).mockReturnValue(
      createMockUsersContext({
        editMode: true,
        handleDeleteSelectedUsers,
      })
    );
    render(<Toolbar />);
    const button = screen.getByTestId("delete-icon");

    fireEvent.click(button);

    expect(handleDeleteSelectedUsers).toHaveBeenCalled();
  });

  it("should show 'Select all elements' when no user is selected", () => {
    render(<Toolbar />);
    expect(screen.getByText("Select all elements")).toBeInTheDocument();
  });

  it("should show the number of selected elements", () => {
    vi.mocked(useUsers).mockReturnValue(
      createMockUsersContext({
        editMode: true,
        totalSelected: 10,
      })
    );

    render(<Toolbar />);
    expect(screen.getByTestId("elements-selected")).toHaveTextContent(
      "10 elements selected"
    );
  });

  it("should not show toolbar when not in edit mode", () => {
    vi.mocked(useUsers).mockReturnValue(createMockUsersContext());
    render(<Toolbar />);
    expect(screen.queryByTestId("duplicate-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("delete-icon")).not.toBeInTheDocument();
    expect(screen.queryByTestId("elements-selected")).not.toBeInTheDocument();

    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
  });
});
