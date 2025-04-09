import { useUsers } from "@/hooks/useUsers";

export default function UserList() {
  const { users } = useUsers();

  return (
    <div>
      {users?.map((user) => (
        <div key={user.id}>{user.login}</div>
      ))}
    </div>
  );
}
