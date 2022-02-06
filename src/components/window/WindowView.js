const WindowView = (props) => {

    return (
    <div className="right-margin">
        <button title="Minimize Window" onClick={()=>props.setWindowState("normal")}>-</button>
        <button title="Expand Window" onClick={()=>props.setWindowState("expanded")}>E</button>
        <button title="Close Window">X</button>
    </div>
    );
}

export default WindowView;