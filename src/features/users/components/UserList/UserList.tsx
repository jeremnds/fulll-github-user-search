import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import NoResults from "@/components/NoResults";
import { useUsers } from "@/hooks/useUsers";
import UserCard from "../UserCard/UserCard";
import "./UserList.css";

export default function UserList() {
  const { users, loading, error } = useUsers();

  return (
    <>
      {error && <ErrorMessage message={error} />}

      {!error && (
        <>
          {loading && <LoadingSpinner />}
          {!loading && users?.length === 0 && <NoResults />}
          {!loading && users?.length > 0 && (
            <div className="user-list__container">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
