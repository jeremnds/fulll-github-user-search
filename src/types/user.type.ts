export type User = {
  id: number;
  login: string;
  avatar_url: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  score: number;
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
  isUserSelected: (userId: number) => boolean;
  handleSearchUsers: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleToggleUser: (user: LocalUser) => void;
  handleSelectAllUsers: () => void;
  handleDeselectAllUsers: () => void;
  handleDeleteSelectedUsers: (localIds: number[]) => void;
  handleDuplicateUsers: () => void;
};
