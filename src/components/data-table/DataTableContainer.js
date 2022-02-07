import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import { useState } from "react";
// import { columns, data } from "./data";
const url = "https://neotutum.nw.r.appspot.com/";
const DataTableContainer = (props) => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const tableData = {
    columns,
    data,
  };

  const formatData = (data) => {
    if (data.length > 0) {
      let rawColumns = [];
      for (let key of Object.keys(data[0])) {
        if(key==="id"){
          rawColumns.push({ name: key, selector: key, sortable: true, width:'auto'});
        }else{
          rawColumns.push({ name: key, selector: key, sortable: true,width:'auto'});
        }
        
      }
      setColumns(rawColumns);
      console.log(rawColumns, data);
      setData(data);
    }
  };
  const getData = async (event) => {
    console.log(event.target.value);
    try {
      const response = await fetch(url + event.target.value, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        const { data, msg } = await response.json();
        formatData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="main">
      <div onChange={getData} style={{ padding: "15px", textAlign: "center" }}>
        <input
          type="radio"
          value="bpmnAssociations"
          name={"dataType" + props.windowId}
        />{" "}
        BPMN Associations
        <input
          type="radio"
          value="bpmnEntities"
          name={"dataType" + props.windowId}
        />{" "}
        BPMN Entities
        <input
          type="radio"
          value="bpmnSequenceFlows"
          name={"dataType" + props.windowId}
        />{" "}
        BPMN SequenceFlows
        <input
          type="radio"
          value="bpmnLanes"
          name={"dataType" + props.windowId}
        />{" "}
        Lanes
      </div>
      {/* <select onChange={getData}>
        {
          <option selected disabled>
            Select Data Object
          </option>
        }
        <option value="associations">BPMN Associations</option>
        <option value="entities">BPMN Entities</option>
        <option value="sequenceflow">BPMN SequenceFlows</option>
        <option value="lanes">Lanes</option>
      </select> */}
      <DataTableExtensions {...tableData}>
        <DataTable
          columns={columns}
          data={data}
          noHeader
          defaultSortField="id"
          defaultSortAsc={false}
          pagination
          highlightOnHover
        />
      </DataTableExtensions>
    </div>
  );
};

export default DataTableContainer;
