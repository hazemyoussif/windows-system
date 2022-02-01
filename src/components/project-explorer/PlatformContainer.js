import { useState } from "react";
import BPMNContainer from './BPMNContainer';
import FileImport from './FileImport';
const PlatformContainer = (props) => {
  const [collapse, setCollapse] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const showContextMenu = (event) => {
    event.preventDefault();

    setIsShown(false);
    const newPosition = {
      x: event.pageX,
      y: event.pageY,
    };
    setPosition(newPosition);
    setIsShown(true);
  };

  const options=[
    "Import BPMN File",
  ];
  const hideContextMenu = (event) => {
      event.preventDefault();
    setIsShown(false);
  };

  const [selectedValue, setSelectedValue] = useState();
  const contextAction = (selectedValue) => {
    setSelectedValue(selectedValue);
    setIsShown(false);
    setCollapse(false)
  };
  const cancelCreator =(event) =>{
    event.preventDefault();
    setSelectedValue();
  }

  const bpmnFiles = props.platformData.bpmnFiles.map(file=>{
    return <BPMNContainer bpmnFile={file}/>
  })
  return (
    <ul className="left-margin">
      <li
        onClick={() => setCollapse((prev) => !prev)}
        className="explorer-li"
        style={{ color: "#d3d3d3" }}
        onContextMenu={showContextMenu}
      >
        {!collapse ? ">" : "^"} {props.platformData.name}</li>
        {isShown && (
        <div
          style={{ top: position.y, left: position.x }}
          className="custom-context-menu"
          onContextMenu={hideContextMenu}
        >
            {options.map(option=>{
                return (<div className="option" onClick={() => contextAction(option)}>
                {option}
              </div>)
            })}
        </div>
      )}
        {!collapse && bpmnFiles}
    </ul>
  );
};

export default PlatformContainer;
