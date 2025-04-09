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

export type UsersContextType = {
  users: User[];
  setUsers: (users: User[]) => void;
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
  error: string | null;
};
