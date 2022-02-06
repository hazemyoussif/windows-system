import "./MainWindow.css";
import "./dt2.css";
import WindowControl from "./WindowControl";
import globalContext from "../../context/global-context";
import { useCallback, useContext, useState } from "react";
import { MDBDataTableV5 } from 'mdbreact';
import Bpmn from "../BPMN/Bpmn";
import converter from "xml-js";
const MainWindow = (props) => {
  const localGlobalContext = useContext(globalContext);
  const bpmnXML = localGlobalContext.bpmnXML;
  const { width } = localGlobalContext.windowsOptions;
  const [isShown, setIsShown] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedValue, setSelectedValue] = useState("");
  const [counter,setCounter] = useState(0);
  const [windowState , setWindowState] = useState("normal");

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
  let windowType;

  return (
    <div
      className={windowState==="normal"?"main-window":"main-window-expanded"}
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
            //const xmlToJson = converter.xml2json(data, { compact: true, spaces: 2 });
            // console.log(typeof xmlToJson,xmlToJson['bpmn2:definitions']);
            localGlobalContext.setBpmnUpdate(data);
          }}
        />
      )}
      {selectedValue === "Data Object" && (
        <div>
          <select onChange={()=>setCounter(prev=>prev+1)}>
            {<option selected disabled>Select Data Object</option>}
            <option>BPMN Associations</option>
            <option>BPMN Entities</option>
            <option>BPMN SequenceFlows</option>
            <option>Lanes</option>
          </select>
          
            {counter>0 &&(<table className="dataTable"><tr>
              <th>id</th>
              <th>fieldId</th>
              <th>sourceRef</th>
              <th>targetRef</th>
              <th>elementId</th>
              <th>status</th>
              <th>timestamp</th>
              <th>created</th>
              <th>creatorId</th>
            </tr>
            {counter % 2 !==0 && (<tr>
              <td>7</td>
              <td>92</td>
              <td>_B2220C76-5E26-44A6-A02F-8FACF98549CB</td>
              <td>_CCFEF6E6-CD0B-428A-93C0-306DE4ADA363</td>
              <td>_AE8D61E2-3A9B-4914-956F-437B8030641C</td>
              <td>draft</td>
              <td>2022-02-03 21:31:02</td>
              <td>2022-02-03 21:31:02</td>
              <td>1</td>
            </tr>)}
            {counter % 2 ===0 && (<tr>
              <td>8</td>
              <td>92</td>
              <td>_75BE5500-2AE7-40AD-BCBD-039906B56C62</td>
              <td>_E1A092FF-2F22-411F-82D0-EAD0850E7502</td>
              <td>_CBD8D3B1-B5AC-4221-B171-76F77BE870FC</td>
              <td>draft</td>
              <td>2022-02-03 21:31:02</td>
              <td>2022-02-03 21:31:02</td>
              <td>1</td>
            </tr>)}
            </table>)
}
          
        </div>
        
        
      )}
    </div>
  );
};

export default MainWindow;
