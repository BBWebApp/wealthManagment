import Chart from "@bit/bbconsult.standalone-components.chart";
import Welcome from "@bit/bbconsult.standalone-components.welcome";
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

  return (
    <div className={classes.content}>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          exact
          path="/Reports/:reportId"
          render={(props) => (
            // usage of key to rerender the component everytime the key changes
            <BodyFromDrawerController
              key={props.match.params.reportId}
              reportId={props.match.params.reportId}
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
