import { User } from "@/types/user.type";
import "./UserCard.css";

type UserCardProps = {
  user: User;
};

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card__container">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="user-card__avatar"
      />
      <div>
        <h3>{user.login}</h3>
        <p>{user.id}</p>
      </div>
      <button className="user-card__button">
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          View profile
        </a>
      </button>
    </div>
  );
}
