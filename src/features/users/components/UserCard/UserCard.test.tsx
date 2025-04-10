import { useUsers } from "@/hooks/useUsers";
import { createMockUsersContext, mockUser } from "@/tests/mocks/user.mock";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import UserCard from "./UserCard";

vi.mock("@/hooks/useUsers", () => ({
  useUsers: vi.fn(),
}));

describe("UserCard", () => {
  beforeEach(() => {
    vi.mocked(useUsers).mockReturnValue(createMockUsersContext());
  });

  it("should show user information", () => {
    render(<UserCard user={mockUser} />);
    expect(screen.getByText(mockUser.id.toString())).toBeInTheDocument();
    expect(screen.getByText(mockUser.login)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockUser.avatar_url);
    expect(screen.getByRole("link", { name: /view profile/i })).toHaveAttribute(
      "href",
      mockUser.html_url
    );
  });

  it("should display a checkbox when editMode is true", () => {
    vi.mocked(useUsers).mockReturnValue(
      createMockUsersContext({
        editMode: true,
        isUserSelected: () => false,
      })
    );

    render(<UserCard user={mockUser} />);

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it("should call handleToggleUser when checkbox is clicked", () => {
    const handleToggleUser = vi.fn();
    vi.mocked(useUsers).mockReturnValue(
      createMockUsersContext({ editMode: true, handleToggleUser })
    );

    render(<UserCard user={mockUser} />);

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(handleToggleUser).toHaveBeenCalledWith(mockUser);
  });
});
