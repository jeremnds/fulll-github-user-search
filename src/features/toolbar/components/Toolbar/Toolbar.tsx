import { useUsers } from "@/hooks/useUsers";
import "./Toolbar.css";

export default function Toolbar() {
  const {
    handleSelectAllUsers,
    handleDeselectAllUsers,
    handleDeleteUsers,
    totalSelected,
  } = useUsers();

  return (
    <div className="toolbar__container">
      <div className="toolbar__left">
        <input
          type="checkbox"
          className="toolbar__checkbox"
          onChange={
            totalSelected === 0 ? handleSelectAllUsers : handleDeselectAllUsers
          }
          checked={totalSelected > 0}
        />
        <p className="toolbar__label">
          {totalSelected === 0
            ? "Select all elements"
            : `${totalSelected} elements selected`}
        </p>
      </div>
      <div className="toolbar__right">
        <button onClick={handleDeleteUsers}>Delete</button>
        <button>Duplicate</button>
      </div>
    </div>
  );
}
