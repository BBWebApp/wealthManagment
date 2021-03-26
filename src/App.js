import { useAuth0 } from "@auth0/auth0-react";
import Drawer from "@bit/bbconsult.standalone-components.drawer";
import Header from "@bit/bbconsult.standalone-components.wm-components.header";
import LoginButton from "@bit/bbconsult.standalone-components.login-button";
import { makeStyles } from '@material-ui/styles';
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import ContentController from "./components/ContentController";



/* 
lcp --proxyUrl http://192.168.178.21:5002 --port 8011
 */
const useStyles = makeStyles({
  content: {
    marginLeft: "240px",
    marginTop: "80px",
  },
});

function App() {

  const { isAuthenticated } = useAuth0();
  return (
    <BrowserRouter>
      {/* {isAuthenticated === false && <LoginButton />} */}

      {/* {isAuthenticated === true && ( */}
      <React.Fragment>
        <Header />
        <Drawer />
        <ContentController />
      </React.Fragment>


      {/* )} */}
    </BrowserRouter>
  );
}

export default App;
