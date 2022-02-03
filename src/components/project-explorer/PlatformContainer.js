import { useState, useRef, useContext } from "react";
import BPMNContainer from "./BPMNContainer";
import FileImport from "./FileImport";
import XMLParser from "react-xml-parser";
import globalContext from "../../context/global-context";

const PlatformContainer = (props) => {
  const url = "https://neotutum.nw.r.appspot.com/";
  const localGlobalContext = useContext(globalContext);
  const fileInput = useRef();
  const [collapse, setCollapse] = useState(true);
  const [isShown, setIsShown] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [posting, setPosting] = useState(false);
  const [show, setShow] = useState(false);
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

  const options = ["Import BPMN File"];
  const hideContextMenu = (event) => {
    event.preventDefault();
    setIsShown(false);
  };

  const [selectedValue, setSelectedValue] = useState();
  const contextAction = (selectedValue) => {
    // fileInput.current.open();
    console.log(fileInput.current.click());
    setSelectedValue(selectedValue);
    setIsShown(false);
    setCollapse(false);
  };
  const cancelCreator = (event) => {
    event.preventDefault();
    setSelectedValue();
  };

  const bpmnFiles = props.platformData.bpmnFiles.map((file) => {
    return <BPMNContainer bpmnFile={file} />;
  });

  const creatEntity = async (endPoint, formdata) => {
    setPosting(true);
    try {
      const response = await fetch(url + endPoint, {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: formdata,
      });
      console.log(response);
      if (response.ok) {
        const { data, msg } = await response.json();
        localGlobalContext.setWindowsOptions((prev) => {
          return { ...prev, action: prev.action + 1 };
        });
        try {
          const response = await fetch(url + "portfolios", {
            Methode: "get",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            const { data, msg } = await response.json();
            setShow(false);
            localGlobalContext.setGlobalPortfolios(data);
            // setMessage({ val: msg, type: "is-success" });
          }
        } catch (error) {
          setPosting(false);
          // setMessage("Error Retrieving Data");
        }
      }
    } catch (error) {
      setPosting(false);
      console.log(error);
      //   setMessage("Error Retrieving Data");
    }
  };

  const xmlFormatter = (data) => {
    let formBody = [];
    for (let property in data) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(data[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
  };

  let fileReader;
  const handleFileRead = (e, name) => {
    const content = fileReader.result;
    let xml = new XMLParser().parseFromString(content);
    let fileName = fileInput.current.files[0].name;
    const formData = {
      fileName: fileName,
      fileData: content,
      platformId: props.platformData.id,
      creatorId: 1,
    };
    const BPMNJson = new XMLParser().parseFromString(content);
    console.log(BPMNJson);
    const processArray = arrayFilter(BPMNJson.children, "process");
    const fullObject = {
      bpmnAssociations: [],
      bpmnEntities: [],
      bpmnSequenceFlows: [],
      bpmnLanes: [],
    };
  
    processArray.forEach((process) => {
      fullObject.bpmnSequenceFlows.push(arrayFilter(process.children, "sequenceflow"));
      fullObject.bpmnLanes.push(arrayFilter(process.children, "lanes"));
      fullObject.bpmnAssociations.push(arrayFilter(process.children, "associations"));
      fullObject.bpmnEntities.push(arrayFilter(process.children, "tasks"));
      fullObject.bpmnEntities.push(arrayFilter(process.children, "event"));
    });

    for(const [key, value] of Object.entries(fullObject)){
      formData[key]=value.flat();
    }
    console.log(formData);

    creatEntity('bpmnFile',xmlFormatter(formData));
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const arrayFilter = (jsonArray, filter) => {
    const filtered = jsonArray.filter((jsonItem) => {
      return jsonItem.name.toLowerCase().includes(filter);
    });

    return filtered;
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInput}
        className="hidden-element"
        onChange={(event) =>
          handleFileChosen(event.target.files[0], event.target.files[0].name)
        }
      />
      <ul className="left-margin">
        <li
          onClick={() => setCollapse((prev) => !prev)}
          className="explorer-li"
          style={{ color: "#d3d3d3" }}
          onContextMenu={showContextMenu}
        >
          {!collapse ? ">" : "^"} {props.platformData.name}
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
        {!collapse && bpmnFiles}
      </ul>
    </div>
  );
};

export default PlatformContainer;
