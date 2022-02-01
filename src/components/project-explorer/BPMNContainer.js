
const BPMNContainer = (props) => {

    return(
        <ul className="left-margin">
            <li>{props.bpmnFile.name}</li>
        </ul>
    );
}

export default BPMNContainer;