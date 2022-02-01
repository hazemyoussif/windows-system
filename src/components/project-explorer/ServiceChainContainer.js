import { useState } from "react";
import EntityCreator from "./EntityCreator";
import PlatformContainer from "./PlatformContainer";
const ServiceChainContainer = (props) => {
  const [collapse, setCollapse] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const platforms = props.serviceChainData.platforms.map((platform) => {
    return <PlatformContainer platformData={platform} />;
  });
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

  const options = ["New Platform"];
  const hideContextMenu = (event) => {
    event.preventDefault();
    setIsShown(false);
  };

  const [selectedValue, setSelectedValue] = useState();
  const contextAction = (selectedValue) => {
    setSelectedValue(selectedValue);
    setIsShown(false);
    setCollapse(false);
  };
  const cancelCreator = (event) => {
    event.preventDefault();
    setSelectedValue();
  };
  return (
    <ul className="left-margin">
      <li
        onClick={() => setCollapse((prev) => !prev)}
        className="explorer-li"
        style={{ color: "#d3d3d3" }}
        onContextMenu={showContextMenu}
      >
        {!collapse ? ">" : "^"} {props.serviceChainData.name}
      </li>
      {isShown && (
        <div
          style={{ top: position.y, left: position.x }}
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
      {selectedValue === "New Platform" ? (
        <li onContextMenu={cancelCreator}>
          <EntityCreator type="Platform" parentId={props.serviceChainData.id} />
        </li>
      ) : null}

      {!collapse && platforms}
    </ul>
  );
};

export default ServiceChainContainer;
