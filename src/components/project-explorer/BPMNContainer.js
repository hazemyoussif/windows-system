
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
import { prepareBPMN } from "./PrepareBPMN";
import { useContext, useState } from "react";
import globalContext from "../../context/global-context";
const BPMNContainer = (props) => {
  const [isShown, setIsShown] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const container = useContext(globalContext).BPMNRef;
  const setBpmnXML = useContext(globalContext).setBpmnXML;
  const localGlobalContext= useContext(globalContext);
  const [color,setColor] = useState('white');
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

  const options = ["Commit","Change","Close","Archive"];
  const hideContextMenu = (event) => {
    event.preventDefault();
    setIsShown(false);
  };

  const [selectedValue, setSelectedValue] = useState();
  const contextAction = (selectedValue) => {
    let statusType;
    setSelectedValue(selectedValue);
    setIsShown(false);
    switch(selectedValue){
      case "Commit":
        statusType="commit";
        // setColor('green');
        break;
        case "Change":
          statusType="changed";
        // setColor('orange');

// creatEntity("bpmnFile", JSON.stringify(formData));
        //console.log(formData);
        break;
        case "Close":
          statusType="closed";
        // setColor('DarkSlateGray');
        break;
        default:
          deleteBpmn("https://neotutum.nw.r.appspot.com/bpmnFile/"+props.bpmnFile.id);

    }

    
    if(statusType==="commit" && localGlobalContext.bpmnUpdate===""){
      updateBpmn("https://neotutum.nw.r.appspot.com/bpmnFile/"+localGlobalContext.bpmnXML.id,JSON.stringify({status:"commit"}));
      return ;
    }
    const updatedContent = localGlobalContext.bpmnUpdate;
    const fullObject = prepareBPMN(updatedContent,"string");
     const formData = {
      fileName: localGlobalContext.bpmnXML.fileName,
      fileData: localGlobalContext.bpmnUpdate,
      platformId: localGlobalContext.bpmnXML.platformId,
      creatorId: 1,
      status: statusType
    };

    for (const [key, value] of Object.entries(fullObject)) {
      formData[key] = value.length > 0 ? value.flat() : [];
    }
    updateBpmn("https://neotutum.nw.r.appspot.com/bpmnFile/"+localGlobalContext.bpmnXML.id,JSON.stringify(formData));
    
  };

  const updateBpmn = async (url,formdata) =>{
    try {
      const response = await fetch(url, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: formdata,
      });
      console.log(response);
      if (response.ok) {
        const { data, msg } = await response.json();
        console.log(data,msg);
        try {
          const response = await fetch(url + "portfolios", {
            Methode: "get",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const { data, msg } = await response.json();
          }
        } catch (error) {
          console.log(error);

        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteBpmn = async (url)=>{
    try {
      const response = await fetch(url, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        const { data, msg } = await response.json();
        console.log(data,msg);
        try {
          const response = await fetch(url + "portfolios", {
            Methode: "get",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const { data, msg } = await response.json();
          }
        } catch (error) {
          console.log(error);

        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleBPMNClick = () => {
    setBpmnXML(props.bpmnFile);
    console.log(props.bpmnFile.fileData);
    // xmlDataDiv.current.innerText=props.bpmnFile.fileData;
  };
  
  return (
    <div>
      <ul style={{ listStyleType: "square",color:color }} className="left-margin">
        <li className="explorer-li" onContextMenu={showContextMenu} onClick={handleBPMNClick}>
          {props.bpmnFile.fileName}
        </li>
      </ul>
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
    </div>
  );
};

export default BPMNContainer;
