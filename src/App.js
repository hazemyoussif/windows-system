import { useState, useContext } from 'react';
import WindowsRow from './components/window/WindowsRow'; 
import globaContext from './context/global-context';
import ProjectExplorer from './components/project-explorer/ProjectExplorer';
import WindwosOptions from './components/window/WindowsOptions';
import './App.css';

function App() {

  const localGlobalContext = useContext(globaContext);
  const windowsGrid = localGlobalContext.rows.map(row=>{
    return (<WindowsRow key={row.id} row={row} />);
  })

  return (
    <div className="App">
      <ProjectExplorer clientId="Static Client ID"/>
      <div>
      <WindwosOptions />
      {windowsGrid}
      </div>
      
    </div>
  );
}

export default App;
