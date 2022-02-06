import XMLParser from "react-xml-parser";
import converter from "xml-js";
export const arrayFilter = (jsonArray, filter) => {
    const filtered = jsonArray.filter((jsonItem) => {
      return jsonItem.name.toLowerCase().includes(filter);
    });
    return filtered;
  };

export const prepareBPMN = (content,type="string") => {
    if(type!=="string"){
        const xmlToJson = new XMLParser().parseFromString(content);
        //const xmlToJson = converter.xml2json(content, { compact: true, spaces: 2 });
        console.log(typeof xmlToJson,xmlToJson);
        //return xmlToJson;
        return xmlToJson['bpmn2:definitions']['bpmn2:process'];
    }
    const BPMNJson = new XMLParser().parseFromString(content);
    const processArray = arrayFilter(BPMNJson.children, "process");
    const fullObject = {
      bpmnAssociations: [],
      bpmnEntities: [],
      bpmnSequenceFlows: [],
      bpmnLanes: [],
    };

    processArray.forEach((process) => {
      fullObject.bpmnSequenceFlows.push(
        arrayFilter(process.children, "sequenceflow")
      );
      fullObject.bpmnLanes.push(arrayFilter(process.children, "lanes"));
      fullObject.bpmnAssociations.push(
        arrayFilter(process.children, "associations")
      );
      fullObject.bpmnEntities.push(arrayFilter(process.children, "tasks"));
      fullObject.bpmnEntities.push(arrayFilter(process.children, "event"));
      fullObject.bpmnEntities.push(arrayFilter(process.children, "dataobject"));
      fullObject.bpmnEntities.push(arrayFilter(process.children, "textannotation"));
    });

    return fullObject;
}


