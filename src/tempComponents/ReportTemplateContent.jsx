import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import ReportTable from "./ReportTable";

const useStyles = makeStyles({
  report_content: {
    width: "900px",
    marginLeft: "00px",
    marginRight: "0px",
    marginTop: "0px",
    marginBottom: "0px",
    minHeight: "900px",
    display: "block",
    backgroundColor: "white",
    overflow: "hidden",
  },
});

const ReportTemplateContent = ({xmlResult}) => {
  const classes = useStyles();
  return (
    <div className={classes.report_content}>
      <ReportTable xmlResult={xmlResult}/>
    </div>
  );
};

export default ReportTemplateContent;
