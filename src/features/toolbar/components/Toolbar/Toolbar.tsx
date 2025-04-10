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
    handleToggleEditMode,
    totalSelected,
    selectedUserIds,
    editMode,
  } = useUsers();

  return (
    <>
      <div className="toolbar__center">
        <button className="toolbar__button" onClick={handleToggleEditMode}>
          {editMode ? "Disable edit mode" : "Enable edit mode"}
        </button>
      </div>
      {editMode && (
        <div className="toolbar__container">
          <div className="toolbar__left">
            <input
              type="checkbox"
              className="toolbar__checkbox"
              onChange={
                totalSelected === 0
                  ? handleSelectAllUsers
                  : handleDeselectAllUsers
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
              className="toolbar__action-button"
              onClick={handleDuplicateUsers}
            >
              <DuplicateIcon />
            </button>
            <button
              className="toolbar__action-button"
              onClick={() => handleDeleteSelectedUsers(selectedUserIds)}
            >
              <TrashIcon />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
