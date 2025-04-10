import { useDebounce } from "@/hooks/useDebounce";
import { User } from "@/types/user.type";
import { useEffect, useState } from "react";
import { UsersContext } from "./context";

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedQuery = useDebounce(query, 300);

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchUsers = async () => {
      if (!debouncedQuery.trim()) {
        setUsers([]);
        return;
      }
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.github.com/search/users?q=${debouncedQuery}`
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
  }, [debouncedQuery]);

  const handleSearchUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSelectedUsers = (user: User) => {
    setSelectedUsers((prev) => [...prev, user]);
    console.log(selectedUsers);
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        query,
        loading,
        error,
        handleSearchUsers,
        handleSelectedUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
