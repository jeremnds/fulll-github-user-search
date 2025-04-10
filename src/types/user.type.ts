export type User = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export type LocalUser = User & {
  localId: number;
};

export type UsersContextType = {
  users: LocalUser[];
  setUsers: (users: LocalUser[]) => void;
  query: string;
  loading: boolean;
  error: string | null;
  totalSelected: number;
  hasSearched: boolean;
  selectedUserIds: number[];
  editMode: boolean;
  isUserSelected: (userId: number) => boolean;
  handleSearchUsers: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleUser: (user: LocalUser) => void;
  handleSelectAllUsers: () => void;
  handleDeselectAllUsers: () => void;
  handleDeleteSelectedUsers: (localIds: number[]) => void;
  handleDuplicateUsers: () => void;
  handleToggleEditMode: () => void;
};
