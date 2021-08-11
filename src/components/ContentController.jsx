import Chart from "@bit/bbconsult.standalone-components.wm-components.chart";
// import Welcome from '@bit/bbconsult.standalone-components.welcome'
import Welcome from "../tempComponents/Welcome";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import BodyFromDrawerController from "./BodyFromDrawerController";
import { useLocation } from "react-router-dom";
import { withRouter } from "react-router-dom";
const useStyles = makeStyles({
  content: {
    marginLeft: "270px",
    marginTop: "80px",
  },
});

const ContentController = (props) => {
  const classes = useStyles();
  const { content } = props;

  const location = useLocation();
  const urlPath = location.pathname;
  const reportId = urlPath.split("/")[urlPath.split("/").length - 1];
  const packageId = urlPath.split("/").slice(1, urlPath.split("/").length - 1);
  return (
    <div className={classes.content}>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route exact path="/Charts" render={(props) => <Chart />} />
        <Route exact path={["/", "/home"]} render={(props) => <Welcome />} />
        <Route
          exact
          path={urlPath}
          render={(props) => (
            // usage of key to rerender the component everytime the key changes
            <BodyFromDrawerController
              key={urlPath}
              content={content}
              reportId={reportId}
              packageId={packageId}
            />
          )}
        />
      </Switch>
    </div>
  );
};

export default ContentController;
