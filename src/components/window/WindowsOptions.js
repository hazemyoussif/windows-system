import { useContext } from "react";
import globalContext from "../../context/global-context";

const WindwosOptions = (props) => {
  const localGlobalContext = useContext(globalContext);
  const {width, height, wrapping} = localGlobalContext.windowsOptions;
  const handleOptionsChange = (event) => {
      console.log(event);
    const { name, value } = event.target;
    localGlobalContext.setWindowsOptions((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCheckChange = (event) => {
      const {name, checked} = event.target;
      localGlobalContext.setWindowsOptions((prev) => {
        return { ...prev, [name]: checked };
      });
  }

  return (
    <div className="windows-options-container">
      <div className="windows-option">
        <label>Windows Spacing</label>
        <input
          type="range"
          min="5"
          max="500"
          name="width"
          value={width}
          onChange={handleOptionsChange}
        />
      </div>
      <div className="windows-option">
        <label>Rows Spacing</label>
        <input
          type="range"
          min="5"
          max="500"
          name="height"
          value={height}
          onChange={handleOptionsChange}
        />
      </div>
      <div className="windows-option">
        <label>Row Wrapping</label>
        <input
          type="checkbox"
          name="wrapping"
          checked={wrapping}
          onChange={handleCheckChange}
        />
      </div>
    </div>
  );
};

export default WindwosOptions;
