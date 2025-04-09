import { useUsers } from "@/hooks/useUsers";

import "./SearchInput.css";

export default function SearchInput() {
  const { query, handleSearchUsers } = useUsers();

  return (
    <div className="search-input__container">
      <input
        type="text"
        placeholder="Search users"
        value={query}
        onChange={handleSearchUsers}
      />
    </div>
  );
}
