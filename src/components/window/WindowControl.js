import WindowCloner from "./WindowCloner";
import WindowType from "./WindowType";
import WindowView from "./WindowView";

const WindowControl = (props) => {
  return (
    <div className="window-control">
      <div>
        <div onClick={props.showContextMenu} className="right-margin window-cloner-container">
          <button className="type-btn" title="Change Window Type">
            Icon
          </button>
          <button className="type-btn" title="Change Window Type">
            D
          </button>
        </div>

        <span>{props.selectedValue===""?"General":props.selectedValue}</span>
      </div>
      <div className="right-control">
        <WindowView setWindowState={props.setWindowState}/>
        <WindowCloner rowID={props.rowID} />
      </div>
    </div>
  );
};

export default WindowControl;
