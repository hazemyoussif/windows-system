import BpmnModeler from "bpmn-js/lib/Modeler";
import BpmnPalletteModule from "bpmn-js/lib/features/palette";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
import {
  BpmnPropertiesPanelModule,
  BpmnPropertiesProviderModule,
} from "bpmn-js-properties-panel";
import minimapModule from "diagram-js-minimap";
import { is } from "bpmn-js/lib/util/ModelUtil";
import BpmnColorPickerModule from "bpmn-js-color-picker";
import { useRef, useEffect, useContext, useCallback } from "react";
import globalContext from "../../context/global-context";
const BPMNContainer = (props) => {
  const container = useContext(globalContext).BPMNRef;
  const xmlDataDiv = useContext(globalContext).BPMNRefData;
  console.log(container);
  const modelerConstructor = useCallback(async ()=>{
    if (container) {
      let current = container.current;
      // const parser = new DOMParser();
      //const modeler = new BpmnModeler({ current });
      const modeler = new BpmnModeler({
        container: current,
        keyboard: { bindTo: document },
        BpmnPalletteModule,
        additionalModules: [
          BpmnPropertiesPanelModule,
          BpmnPropertiesProviderModule,
          minimapModule,
          BpmnColorPickerModule,
        ],
        propertiesPanel: {
        parent: xmlDataDiv.current
        }
      });
      await modeler.importXML(props.bpmnFile.fileData);
    }
  },[container,props.bpmnFile.fileData,xmlDataDiv])
  useEffect( () => {
     modelerConstructor();
  }, [modelerConstructor]);
  const handleBPMNClick = () => {
    // xmlDataDiv.current.innerText=props.bpmnFile.fileData;
  };
  return (
    <div>
      <ul style={{ listStyleType: "square" }} className="left-margin">
        <li className="explorer-li" onClick={handleBPMNClick}>
          {props.bpmnFile.fileName}
        </li>
      </ul>
    </div>
  );
};

export default BPMNContainer;
