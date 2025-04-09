import { useUsers } from "@/hooks/useUsers";
import UserCard from "../UserCard/UserCard";
import "./UserList.css";
export default function UserList() {
  const { users } = useUsers();

  return (
    <div className="user-list__container">
      {users?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
