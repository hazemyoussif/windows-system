import MainWindow from "./MainWindow";
import { useContext } from "react";
import globalContext from "../../context/global-context";

const WindowsRow = (props) => {
  const {height , wrapping} = useContext(globalContext).windowsOptions; 
  const windowsStyleObject = {
    display: "flex",
    flexWrap: wrapping?'wrap':'nowrap',
     marginBottom: `${height}px`,
  };
  const windows = props.row.windows.map((window) => (
    <MainWindow
      setRows={props.setRows}
      id={window.id}
      type={window.type}
      rowID={props.row.row}
    />
  ));
  return <div style={windowsStyleObject}>{windows}</div>;
};

export default WindowsRow;
