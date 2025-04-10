import { useUsers } from "@/hooks/useUsers";
import { User } from "@/types/user.type";
import "./UserCard.css";

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  const { handleSelectedUsers } = useUsers();
  return (
    <div className="user-card__container">
      <input
        type="checkbox"
        className="user-card__checkbox"
        onClick={() => handleSelectedUsers(user)}
      />
      <img
        src={user.avatar_url}
        alt={user.login}
        className="user-card__avatar"
      />
      <div className="user-card__info">
        <h3 className="user-card__id">{user.id}</h3>
        <p className="user-card__login">{user.login}</p>
      </div>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="user-card__button"
      >
        View profile
      </a>
    </div>
  );
}
