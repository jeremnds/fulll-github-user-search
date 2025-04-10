import { useUsers } from "@/hooks/useUsers";
import { createMockUsersContext, mockUser } from "@/tests/mocks/user.mock";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import UserList from "./UserList";

vi.mock("@/hooks/useUsers", () => ({
  useUsers: vi.fn(),
}));

describe("UserList", () => {
  it("should render a list of users", () => {
    vi.mocked(useUsers).mockReturnValue(
      createMockUsersContext({
        users: [mockUser],
      })
    );
    render(<UserList />);

    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
  });

  it("should show NoResult if no user found", () => {
    vi.mocked(useUsers).mockReturnValue(
      createMockUsersContext({
        users: [],
        hasSearched: true,
      })
    );

    render(<UserList />);

    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("should show loading spinner when loading is true", () => {
    vi.mocked(useUsers).mockReturnValue(
      createMockUsersContext({
        loading: true,
      })
    );
    render(<UserList />);
    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  it("should show error message when error is present", () => {
    vi.mocked(useUsers).mockReturnValue(
      createMockUsersContext({
        error: "Something went wrong",
      })
    );
    render(<UserList />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });
});
