import React from "react";
import { BrowserRouter } from 'react-router-dom';
import AppStructureController from "./components/AppStructureController";



/* 
lcp --proxyUrl http://192.168.178.36:5002 --port 8011
 */



function App() {

  return (
    <BrowserRouter>
      {/* {isAuthenticated === false && <LoginButton />} */}

      {/* {isAuthenticated === true && ( */}
      <React.Fragment>
        <AppStructureController />
      </React.Fragment>


      {/* )} */}
    </BrowserRouter>
  );
}

export default App;
