import React, { useEffect, useState } from "react";
import { Typography, makeStyles } from "@material-ui/core";
import ReportTable from "./ReportTable";
import ReportText from "./ReportText";
import ReportChart from "./ReportChart";

const useStyles = makeStyles({
  report_content: {
    width: "1600px",
    marginLeft: "00px",
    marginRight: "0px",
    marginTop: "0px",
    marginBottom: "0px",
    minHeight: "720px",
    display: "block",
    backgroundColor: "white",
    overflow: "hidden",
  },
});

const ReportTemplateContent = (props) => {
  const { xmlResult } = props;
  const { reportId } = props;
  const classes = useStyles();

  return (
    xmlResult !== undefined && (
      <div className={classes.report_content}>
        {xmlResult[0].map((item) => {
          return item.$.type === "table" ? (
            <ReportTable key={reportId} xmlResult={item} />
          ) : item.$.type === "text" ? (
            <ReportText key={reportId} reportId={reportId} xmlResult={item} />
          ) : item.$.type === "chart" ? (
            <ReportChart key={reportId} reportId={reportId} xmlResult={item} />
          ) : (
            <div>WTFFF</div>
          );
        })}
      </div>
    )
  );
};

export default ReportTemplateContent;
