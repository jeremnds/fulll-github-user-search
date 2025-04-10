import "./Toolbar.css";

export default function Toolbar() {
  return (
    <div className="toolbar__container">
      <div className="toolbar__left">
        <input type="checkbox" className="toolbar__checkbox" />
        <p className="toolbar__label">Select all elements</p>
      </div>
      <div className="toolbar__right">
        <button>Delete</button>
        <button>Duplicate</button>
      </div>
    </div>
  );
}
