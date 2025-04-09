import { User } from "@/types/user.type";
import { useEffect, useState } from "react";
import { UsersContext } from "./context";

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!query.trim()) {
        setUsers([]);
        return;
      }
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
    fetchUsers();
  }, [query]);

  const handleSearchUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <UsersContext.Provider
      value={{ users, setUsers, query, loading, error, handleSearchUsers }}
    >
      {children}
    </UsersContext.Provider>
  );
};
