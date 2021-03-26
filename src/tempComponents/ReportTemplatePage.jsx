import { makeStyles, Paper, Grid } from "@material-ui/core";
import React from "react";
import ReportTemplateContent from "./ReportTemplateContent";
import ReportTemplateFooter from "./ReportTemplateFooter";
import ReportTemplateHeader from "./ReportTemplateHeader";

const useStyles = makeStyles({});

const ReportTemplatePage = ({xmlResult}) => {
  const classes = useStyles();
  return (
    <Grid item container direction="row" xs={12} sm={6} md={4}>
      <Paper variant="elevation">
        <ReportTemplateHeader />
        <ReportTemplateContent xmlResult={xmlResult}/>
        <ReportTemplateFooter />
      </Paper>
    </Grid>
  );
};

export default ReportTemplatePage;
