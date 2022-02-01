import WindowCloner from "./WindowCloner";
import WindowType from "./WindowType";
import WindowView from "./WindowView";

const WindowControl = (props) => {

    return (
        <div className="window-control">
            <WindowType />
            <div className="right-control">
            <WindowView />
            <WindowCloner  rowID={props.rowID}/>
            </div>
            
        </div>
    )
}

export default WindowControl;