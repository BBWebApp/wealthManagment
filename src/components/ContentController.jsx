import Chart from "@bit/bbconsult.standalone-components.wm-components.chart";
// import Welcome from '@bit/bbconsult.standalone-components.welcome'
import Welcome from "../tempComponents/Welcome";
import { makeStyles } from "@material-ui/core";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import BodyFromDrawerController from "./BodyFromDrawerController";

const useStyles = makeStyles({
  content: {
    marginLeft: "240px",
    marginTop: "80px",
  },
});

const ContentController = (props) => {
  const classes = useStyles();
  const { content } = props;
  return (
    <div className={classes.content}>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          exact
          path="/:package/:reportId"
          render={(props) => (
            // usage of key to rerender the component everytime the key changes
            <BodyFromDrawerController
              key={props.match.params.reportId}
              content={content}
              reportId={props.match.params.reportId}
              packageId={props.match.params.package}
            />
          )}
        />
        <Route exact path="/Charts" render={(props) => <Chart />} />
        <Route exact path={["/", "/home"]} render={(props) => <Welcome />} />
      </Switch>
    </div>
  );
};

export default ContentController;
