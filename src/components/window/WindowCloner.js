import { useContext } from "react";
import globaContext from "../../context/global-context";
const WindowCloner = (props) => {
  const localGlobalContext = useContext(globaContext);

  const updateRow = () => {
    const rows = localGlobalContext.rows;
    const newRows = rows.map((row) => {
        
      if (row.row === props.rowID) {
        return {
          row: row.row,
          windows: [
            ...row.windows,
            { id: row.windows.length, type: "General" },
          ],
        };
      } else {
        return row;
      }
    });
    localGlobalContext.setRows(newRows);
  };

  const addRow = () => {
    localGlobalContext.setRows((prev) => {
      return [
        ...prev,
        { row: prev.length + 1, windows: [{ id: 1, type: "General" }] },
      ];
    });
  };
  return (
    <div className="window-cloner-container">
      <div className="window-cloner">
        <button
          className="cloner-btn"
          title="Add Window To Left"
          onClick={updateRow}
        >
          L
        </button>
        <div className="window-cloner-vertical">
          <button className="cloner-btn" title="Add New Windows-Row Above">
            U
          </button>
          <button className="cloner-btn" title="Add New Window To Group">
            C
          </button>
          <button
            className="cloner-btn"
            title="Add New Windows-Row Below"
            onClick={addRow}
          >
            D
          </button>
        </div>
        <button className="cloner-btn" title="Add Window To Right">
          R
        </button>
      </div>
    </div>
  );
};

export default WindowCloner;
