import { createContext, useEffect, useState } from "react";
import { User, UsersContextType } from "../types/user.type";

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSearchedUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/search/users?q=${query}`
        );
        const data = await response.json();
        setUsers(data.items);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchSearchedUsers();
  }, [query]);

  return (
    <UsersContext.Provider
      value={{ users, setUsers, query, setQuery, loading, error }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
