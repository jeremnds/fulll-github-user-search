import { useUsers } from "@/hooks/useUsers";
import { LocalUser } from "@/types/user.type";
import "./UserCard.css";

type UserCardProps = {
  user: LocalUser;
};

export default function UserCard({ user }: UserCardProps) {
  const { handleToggleUser, isUserSelected, editMode } = useUsers();
  return (
    <div className="user-card__container">
      {editMode && (
        <input
          type="checkbox"
          className="user-card__checkbox"
          checked={isUserSelected(user.localId)}
          onChange={() => handleToggleUser(user)}
        />
      )}
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
