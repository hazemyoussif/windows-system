import "./MainWindow.css";
import "./dt2.css";
import WindowControl from "./WindowControl";
import globalContext from "../../context/global-context";
import { useCallback, useContext, useState } from "react";
import { MDBDataTableV5 } from "mdbreact";
import Bpmn from "../BPMN/Bpmn";
import converter from "xml-js";
import DataTableContainer from "../data-table/DataTableContainer";
const MainWindow = (props) => {
  const localGlobalContext = useContext(globalContext);
  const bpmnXML = localGlobalContext.bpmnXML;
  const { width } = localGlobalContext.windowsOptions;
  const [isShown, setIsShown] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedValue, setSelectedValue] = useState("");
  const [counter, setCounter] = useState(0);
  const [windowState, setWindowState] = useState("normal");

  const showContextMenu = (event) => {
    console.log(event);
    event.preventDefault();

    setIsShown(false);
    const newPosition = {
      x: event.pageX,
      y: event.pageY,
    };
    setPosition(newPosition);
    setIsShown(true);
  };

  const options = ["BMPN File", "Data Object"];
  const hideContextMenu = (event) => {
    event.preventDefault();
    setIsShown(false);
  };
  const contextAction = (selectedValue) => {
    console.log(selectedValue);
    setSelectedValue(selectedValue);
    setIsShown(false);
  };

  return (
    <div
      className={
        windowState === "normal" ? "main-window" : "main-window-expanded"
      }
      style={{ margin: `10px ${width}px 10px 10px` }}
    >
      <WindowControl
        rowID={props.rowID}
        contextAction={contextAction}
        hideContextMenu={hideContextMenu}
        showContextMenu={showContextMenu}
        selectedValue={selectedValue}
        setWindowState={setWindowState}
      />
      {isShown && (
        <div
          style={{ top: position.y, left: position.x, color: "white" }}
          className="custom-context-menu"
          onContextMenu={hideContextMenu}
        >
          {options.map((option) => {
            return (
              <div className="option" onClick={() => contextAction(option)}>
                {option}
              </div>
            );
          })}
        </div>
      )}
      {selectedValue === "BMPN File" && (
        <Bpmn
          xml={bpmnXML.fileData}
          onChange={(data) => {
            windowState = { windowState };
            //const xmlToJson = converter.xml2json(data, { compact: true, spaces: 2 });
            // console.log(typeof xmlToJson,xmlToJson['bpmn2:definitions']);
            localGlobalContext.setBpmnUpdate(data);
          }}
        />
      )}
      {selectedValue === "Data Object" && <DataTableContainer windowId={props.id}/>}
    </div>
  );
};

export default MainWindow;
