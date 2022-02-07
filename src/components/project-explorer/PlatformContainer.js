import { useState, useRef, useContext } from "react";
import BPMNContainer from "./BPMNContainer";
import FileImport from "./FileImport";
import XMLParser from "react-xml-parser";
import globalContext from "../../context/global-context";
import BpmnSelector from "../BPMN/BpmnSelector";
import { prepareBPMN } from "./PrepareBPMN";
import EntityCreator from "./EntityCreator";
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

  const options = ["Import BPMN File", "Create New BPMN File"];
  const hideContextMenu = (event) => {
    event.preventDefault();
    setIsShown(false);
  };

  const [selectedValue, setSelectedValue] = useState();
  const contextAction = (selectedValue) => {
    // fileInput.current.open();
    setSelectedValue(selectedValue);
    setIsShown(false);
    setCollapse(false);
    if (selectedValue === "Import BPMN File") {
      fileInput.current.click();
    } else {
    }
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
          "Content-Type": "application/json",
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
    const fullObject = prepareBPMN(content);

    for (const [key, value] of Object.entries(fullObject)) {
      formData[key] = value.length > 0 ? value.flat() : [];
    }
    creatEntity("bpmnFile", JSON.stringify(formData));
    // creatEntity("bpmnFile", formData);
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
        {selectedValue === "Create New BPMN File" ? (
          <li onContextMenu={cancelCreator}>
            <EntityCreator type="BPMN" parentId={props.platformData.id} />
          </li>
        ) : null}
        {!collapse && bpmnFiles}
      </ul>
    </div>
  );
};

export default PlatformContainer;
