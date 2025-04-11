import { useDebounce } from "@/hooks/useDebounce";
import { LocalUser, User } from "@/types/user.type";
import { generateLocalId } from "@/utils/generateLocalId";
import { useEffect, useState } from "react";
import { UsersContext } from "./context";

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<LocalUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [editMode, setEditMode] = useState(false);
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
        setUsers(
          data.items.map((user: User) => ({
            ...user,
            localId: generateLocalId(),
          }))
        );
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
        setHasSearched(true);
        setSelectedUserIds([]);
      }
    };
    fetchUsers();
  }, [debouncedQuery]);

  const handleSearchUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleToggleUser = (user: LocalUser) => {
    setSelectedUserIds((prev) =>
      prev.includes(user.localId)
        ? prev.filter((id) => id !== user.localId)
        : [...prev, user.localId]
    );
  };

  const handleSelectAllUsers = () => {
    setSelectedUserIds(users.map((user) => user.localId));
  };

  const handleDeselectAllUsers = () => {
    setSelectedUserIds([]);
  };

  const handleDeleteSelectedUsers = (localIds: number[]) => {
    if (totalSelected === 0) return;

    setUsers((prev) => prev.filter((user) => !localIds.includes(user.localId)));
    setSelectedUserIds((prev) => prev.filter((id) => !localIds.includes(id)));
  };

  const handleDuplicateUsers = () => {
    if (totalSelected === 0) return;

    const duplicatedUsers = users
      .filter((user) => isUserSelected(user.localId))
      .map((user) => ({
        ...user,
        localId: generateLocalId(),
      }));

    setUsers([...users, ...duplicatedUsers]);
    setSelectedUserIds([]);
  };

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
    setSelectedUserIds([]);
  };

  return (
    <UsersContext.Provider
      value={{
        users,
        setUsers,
        query,
        loading,
        error,
        selectedUserIds,
        hasSearched,
        totalSelected,
        editMode,
        isUserSelected,
        handleSearchUsers,
        handleToggleUser,
        handleSelectAllUsers,
        handleDeselectAllUsers,
        handleDeleteSelectedUsers,
        handleDuplicateUsers,
        handleToggleEditMode,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
