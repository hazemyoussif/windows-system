import globalContext from "../../context/global-context";
import { useContext } from "react";
import { useState } from "react";
import { event } from "jquery";
const EntityCreator = (props) => {
  const localGlobalContext = useContext(globalContext);
  const [name, setName] = useState("");
  const [show, setShow] = useState(true);
  const [posting, setPosting] = useState(false);
  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
  };
  let formData;
  let endPoint;
  const url = "https://neotutum.nw.r.appspot.com/";
  const creatEntity = async (endPoint, formdata) => {
    setPosting(true);
    try {
      const response = await fetch(url + endPoint, {
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
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

  //   const initialFetch = useCallback(fetchProjectExplorerData, []);

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

  const handleEntityCreation = () => {
    switch (props.type) {
      case "Portfolio":
        formData = {
          name,
        };

        creatEntity("portfolios", xmlFormatter(formData));
        break;
      case "Service Chain":
        formData = {
          name,
          portfolioId: props.parentId,
        };
        creatEntity("serviceChains", xmlFormatter(formData));
        break;
      case "Platform":
        formData = {
          name,
          serviceChainId: props.parentId,
        };
        creatEntity("platforms", xmlFormatter(formData));
        break;
      case "BPMN":
        let definedName;
        if (name.includes(".bpmn")) {
          definedName = name;
        } else {
          definedName = name + ".bpmn";
        }
        formData = {
          fileName: definedName,
          platformId: props.parentId,
          fileData: `<?xml version="1.0" encoding="UTF-8"?>
          <bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">
            <bpmn2:process id="Process_1" isExecutable="false">
              <bpmn2:startEvent id="StartEvent_1"/>
            </bpmn2:process>
            <bpmndi:BPMNDiagram id="BPMNDiagram_1">
              <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
              </bpmndi:BPMNPlane>
            </bpmndi:BPMNDiagram>
          </bpmn2:definitions>`,
          creatorId: 1,
          bpmnAssociations: [],
          bpmnSequenceFlows: [],
          bpmnEntities: [],
          bpmnLanes: [],
        };
        creatEntity("bpmnFile", xmlFormatter(formData));
        break;
      default:
        break;
    }
  };

  const checkKey = (event) => {
    if (event.key === "Enter") {
      creatEntity();
    } else if (event.key === "Escape") {
    }
  };
  return (
    show && (
      <div style={{ display: "flex", paddingBottom: "15px" }}>
        <label>{props.type}</label>
        <input
          type="text"
          onChange={handleNameChange}
          disabled={posting}
          onKeyDown={checkKey}
        />
        <button onClick={handleEntityCreation} disabled={posting}>
          +
        </button>
      </div>
    )
  );
};

export default EntityCreator;
