import BpmnModdle from 'bpmn-moddle';
import $ from 'jquery';
import XmlParser from "bpmn-xml-parser";
import BpmnModeler from 'bpmn-js/lib/Modeler';
import BpmnPalletteModule from 'bpmn-js/lib/features/palette';
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";
import minimapModule from 'diagram-js-minimap';
import { is } from 'bpmn-js/lib/util/ModelUtil';
import BpmnColorPickerModule from 'bpmn-js-color-picker';
import "diagram-js-minimap/assets/diagram-js-minimap.css";
import "bpmn-js-color-picker/colors/color-picker.css";
import React from 'react';

const FileImport = (props) => {
    //Custom Instances
let parseString = require('xml2js').parseString;
let container;
let modeler;
let propertiesPanelModule = require('bpmn-js-properties-panel');
let propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda');
//File Input Refs
const bpmn_file = React.createRef();
const fmech_csv_file = React.createRef();
let bpmn_file_main
  const openDiagram = async () => {

    //await this.setState({ tableLoaded: false });

    let reader = new FileReader();
    reader.readAsText(bpmn_file_main, "UTF-8");
    reader.onload = async (evt) => {
      let xmlTarget = evt.target.result; //XML text string

      bpmn_file.current.files = null;

      console.log("loaded");

      await parseString(xmlTarget, async (err, result) => {
        //Parse the XML string to JSON
        // Send xmlTarget to BpmnFile endpoint; 
        // Get Associations from JSON result -> send to bpmnAssociations Endpoint with bpmnFile ID;
        // Get Entities from JSON result -> send to bpmnEntities Endpoint with bpmnFile ID;
        //Get SequenceFlows from JSON result -> send to bpmnSequenceFlows Endpoint with bpmnFile ID;
        //Get Lanes from JSON result -> send to bpmnLanes Endpoint with bpmnFile ID;
      });
    };
  };

  return (
    <input
      type="file"
      name="file"
      id="file"
      ref={bpmn_file}
    //   style={{ visibility: "hidden", width: "0px" }}
      onChange={(event) => {
        bpmn_file_main = bpmn_file.current.files[0];
        openDiagram();
      }}
    />
  );
};

export default FileImport;
