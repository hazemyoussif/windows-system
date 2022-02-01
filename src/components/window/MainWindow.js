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
    </div>
    );

}

export default MainWindow;