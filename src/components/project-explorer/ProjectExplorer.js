import { useCallback, useContext, useEffect, useState } from "react";
import PortfoliosList from "./PortfoliosList";
import globalContext from "../../context/global-context";
const ProjectExplorer = (props) => {
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

  return (
    <div className="project-explorer-container">
      <h3 className="left-margin client-name" onClick={()=>setCollapse(prev=>!prev)}>{!collapse ? ">" : "^"} {props.clientId}</h3>
      {!collapse && <PortfoliosList portfolios={globalPortfolios} clientId={props.clientId} port />}
    </div>
  );
};

export default ProjectExplorer;
