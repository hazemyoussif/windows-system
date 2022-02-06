import { useCallback, useContext, useEffect, useState } from "react";
import PortfoliosList from "./PortfoliosList";
import globalContext from "../../context/global-context";
import EntityCreator from "./EntityCreator";
const ProjectExplorer = (props) => {
  const [isShown, setIsShown] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { globalPortfolios, setGlobalPortfolios } = useContext(globalContext);
  const [collapse,setCollapse] = useState(false);
  const url = "https://neotutum.nw.r.appspot.com/";
  const handleRetrieve = (data) => {
    setGlobalPortfolios(data);
  };

  const setMessage = (message) => {
    alert(message.val);
  };
  const fetchProjectExplorerData = async () => {
    try {
      const response = await fetch(url + "portfolios", {
        Methode: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const { data, msg } = await response.json();
        console.log(typeof Object.values(data));
        // console.log(typeof JSON.parse(data), JSON.parse(data));
        handleRetrieve(data);
        setMessage({ val: msg, type: "is-success" });
      }
    } catch (error) {
      setMessage("Error Retrieving Data");
    }
  };

  const initialFetch = useCallback(fetchProjectExplorerData, []);
  useEffect(() => {
    initialFetch();
  }, [initialFetch]);

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
    "New Portfolio",
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
    <div className="project-explorer-container">
      <h3 className="left-margin client-name" onContextMenu={showContextMenu} onClick={()=>setCollapse(prev=>!prev)}>{!collapse ? ">" : "^"} {props.clientId}</h3>
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
      {selectedValue === "New Portfolio" ? (
        <ul><li onContextMenu={cancelCreator}>
          <EntityCreator
            type="Portfolio"
            parentId={props.clientId}
          />
        </li></ul>
      ) : null}
      {!collapse && <PortfoliosList portfolios={globalPortfolios} clientId={props.clientId} port />}
    </div>
  );
};

export default ProjectExplorer;
