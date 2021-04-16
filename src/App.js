import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import AppStructureController from "./components/AppStructureController";



/* 
lcp --proxyUrl http://192.168.178.21:5002 --port 8011
 */



function App() {

  const { isAuthenticated } = useAuth0();
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
