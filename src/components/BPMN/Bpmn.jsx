import BpmnModeler from "bpmn-js/lib/Modeler";
import { memo, useCallback, useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";
import minimapModule from "diagram-js-minimap";
import "diagram-js-minimap/assets/diagram-js-minimap.css";

const Bpmn = memo(({ xml, onChange, windowState }) => {
  const [modeler, setModeler] = useState(null);
  const { width, height, ref: modelerRef } = useResizeDetector();
  
  const resizeBpmn = useCallback(() => {
    if (!modeler) return;
    modeler.get("canvas").zoom("fit-viewport", "auto");
  }, [modeler]);

  const onChangeHandler = useCallback(async () => {
    if (!modeler) return;

    const { xml } = await modeler.saveXML({ format: true });
    onChange(xml);
  }, [modeler, onChange]);

  useEffect(() => {
    if (!modeler || !xml) return;

    modeler
      .importXML(xml)
      .then(() => resizeBpmn())
      .catch((error) => alert(error));
  }, [modeler, resizeBpmn, xml]);

  useEffect(() => {
    resizeBpmn();
  }, [width, height, resizeBpmn]);

  useEffect(() => {
    if (!modeler) return;

    modeler.on("commandStack.changed", onChangeHandler);

    return () => {
      modeler.off("commandStack.changed", onChangeHandler);
    };
  }, [modeler, onChangeHandler]);

  useEffect(() => {
    setModeler(
      new BpmnModeler({
        container: modelerRef.current,
        additionalModules: [minimapModule],
      })
    );

    return () => {
      modelerRef.current = null;
    };
  }, [modelerRef]);

  const onZoomOut = useCallback(() => {
    if (!modeler) return;

    const scale = modeler.get("canvas").viewbox().scale;

    modeler.get("canvas").zoom(scale - 0.1, true);
  }, [modeler]);
  const onZoomIn = useCallback(() => {
    if (!modeler) return;
    const scale = modeler.get("canvas").viewbox().scale;

    modeler.get("canvas").zoom(scale + 0.1, true);
  }, [modeler]);

  if(windowState ==! "normal"){
    resizeBpmn();
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          position: "absolute",
          flexDirection: "column",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 100,
          right: "10%",
          bottom: "10%",
        }}
      >
        <div onClick={resizeBpmn}>💠</div>
        <div onClick={onZoomIn}>➕</div>
        <div onClick={onZoomOut}>➖</div>
      </div>
      <div ref={modelerRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
});
export default Bpmn;
