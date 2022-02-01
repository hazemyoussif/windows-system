import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import EntityCreator from "./EntityCreator";
import ServiceChainContainer from "./ServiceChainContainer";
import ContextMenu from "./ContextMenu";
const PortfolioContainer = (props) => {
  const [collapse, setCollapse] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const serviceChains = props.portfolioData.serviceChains.map(
    (serviceChain) => {
      return <ServiceChainContainer serviceChainData={serviceChain} />;
    }
  );
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

  const options = [
    "New Template",
    "New Risk Assessment",
    "New Model",
    "New Code",
    "New Service Chain",
  ];
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
        {!collapse ? ">" : "^"} {props.portfolioData.name}
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
      {selectedValue === "New Service Chain" ? (
        <li onContextMenu={cancelCreator}>
          <EntityCreator
            type="Service Chain"
            parentId={props.portfolioData.id}
          />
        </li>
      ) : null}

      {!collapse && serviceChains}
    </ul>
  );
};

export default PortfolioContainer;
