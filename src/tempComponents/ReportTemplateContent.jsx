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
  const [componentToLoad, setComponentToLoad] = useState(undefined);
  const { xmlResult } = props;
  const { reportId } = props;

  const classes = useStyles();
  var componentType = {
    table: <ReportTable key={reportId} xmlResult={xmlResult} />,
    text: (
      <ReportText key={reportId} reportId={reportId} xmlResult={xmlResult} />
    ),
    chart: (
      <ReportChart key={reportId} reportId={reportId} xmlResult={xmlResult} />
    ),
  };

  useEffect(() => {
    setComponentToLoad(componentType[xmlResult[0][0].$.type]);
  }, []);

  return (
    xmlResult !== undefined &&
    componentToLoad !== undefined && (
      <div className={classes.report_content}>{componentToLoad}</div>
    )
  );
};

export default ReportTemplateContent;
