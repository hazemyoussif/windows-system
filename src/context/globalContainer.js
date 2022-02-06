import React, { useState, useRef } from "react";
import globaContext from "./global-context";

const GlobalContainer = (props) => {
  const [rows, setRows] = useState([
    { row: 1, windows: [{ id: 1, type: "General" }] },
  ]);
  const [bpmnXML, setBpmnXML] = useState("");
  const BPMNRef = useRef(null);
  const BPMNRefData = useRef(null);
  const [windowsOptions, setWindowsOptions] = useState({
    width: 10,
    height: 10,
    wrapping: false,
    action: 0,
  });

  const [bpmnUpdate,setBpmnUpdate] = useState("");

  const [globalPortfolios, setGlobalPortfolios] = useState([]);
  return (
    <globaContext.Provider
      value={{
        rows,
        setRows,
        windowsOptions,
        setWindowsOptions,
        globalPortfolios,
        setGlobalPortfolios,
        BPMNRef,
        BPMNRefData,
        bpmnXML,
        setBpmnXML,
        bpmnUpdate,
        setBpmnUpdate
      }}
    >
      {props.children}
    </globaContext.Provider>
  );
};

export default GlobalContainer;
