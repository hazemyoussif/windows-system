import './MainWindow.css';
import WindowControl from './WindowControl';
import globalContext from '../../context/global-context';
import { useContext } from 'react';

const MainWindow = (props) => {
    const localGlobalContext = useContext(globalContext);
    const {width} = localGlobalContext.windowsOptions;

    return(
    <div className="main-window" style={{margin:`10px ${width}px 10px 10px`}}>
        <WindowControl rowID={props.rowID}/>
        <div ref={localGlobalContext.BPMNRef}>
            <div id="js-properties-panel"></div>
        </div>
        <div ref={localGlobalContext.BPMNRefData}></div>
    </div>
    );

}

export default MainWindow;