import DuplicateIcon from "@/components/icons/DuplicateIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import { useUsers } from "@/hooks/useUsers";
import "./Toolbar.css";

export default function Toolbar() {
  const {
    handleSelectAllUsers,
    handleDeselectAllUsers,
    handleDeleteSelectedUsers,
    handleDuplicateUsers,
    totalSelected,
    selectedUserIds,
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
          {totalSelected === 0 ? (
            "Select all elements"
          ) : (
            <>
              <span className="toolbar__label-count">{totalSelected}</span>{" "}
              elements selected
            </>
          )}
        </p>
      </div>
      <div className="toolbar__right">
        <button
          className="toolbar__button"
          onClick={() => handleDeleteSelectedUsers(selectedUserIds)}
        >
          <TrashIcon />
        </button>
        <button className="toolbar__button" onClick={handleDuplicateUsers}>
          <DuplicateIcon />
        </button>
      </div>
    </div>
  );
}
