import { useDebounce } from "@/hooks/useDebounce";
import { User } from "@/types/user.type";
import { useEffect, useState } from "react";
import { UsersContext } from "./context";

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const debouncedQuery = useDebounce(query, 300);
  const totalSelected = selectedUserIds.length;
  const isUserSelected = (userId: number) => selectedUserIds.includes(userId);

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

        if (response.status === 403) {
          setError("Rate limit exceeded. Please try again later.");
          return;
        }

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

  const handleToggleUser = (user: User) => {
    setSelectedUserIds((prev) =>
      prev.includes(user.id)
        ? prev.filter((id) => id !== user.id)
        : [...prev, user.id]
    );
    console.log(selectedUserIds);
  };

  const handleSelectAllUsers = () => {
    setSelectedUserIds(users.map((user) => user.id));
  };

  const handleDeselectAllUsers = () => {
    setSelectedUserIds([]);
  };

  const handleDeleteUsers = () => {
    setUsers(users.filter((user) => !isUserSelected(user.id)));
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        query,
        loading,
        error,
        totalSelected,
        isUserSelected,
        handleSearchUsers,
        handleToggleUser,
        handleSelectAllUsers,
        handleDeselectAllUsers,
        handleDeleteUsers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
