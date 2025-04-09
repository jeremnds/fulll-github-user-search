import { useEffect, useState } from "react";

export default function useGithubSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (query: string) => {
    setQuery(query);
  };

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

  return { users, loading, error, handleSearch };
}
