import { LocalUser, UsersContextType } from "@/types/user.type";
import { vi } from "vitest";

export const mockUser: LocalUser = {
  id: 1,
  login: "test",
  avatar_url: "https://test.com/avatar.png",
  html_url: "https://test.com",
  localId: 1,
};

export const createMockUsersContext = (
  overrides: Partial<UsersContextType> = {}
): UsersContextType => ({
  users: [],
  setUsers: vi.fn(),
  query: "",
  loading: false,
  error: null,
  hasSearched: false,
  selectedUserIds: [],
  totalSelected: 0,
  handleSearchUsers: vi.fn(),
  handleToggleUser: vi.fn(),
  handleSelectAllUsers: vi.fn(),
  handleDeselectAllUsers: vi.fn(),
  handleDeleteSelectedUsers: vi.fn(),
  handleDuplicateUsers: vi.fn(),
  isUserSelected: () => false,
  editMode: false,
  handleToggleEditMode: vi.fn(),
  ...overrides,
});
