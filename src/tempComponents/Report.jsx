import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";

const Report = (props) => {
  const [originalReport, setOriginalReport] = useState(undefined);
  const [modifiedReport, setModifiedReport] = useState(undefined);
  const { reportId } = props;

  var html = useSelector((state) => {
    return state.serverCall.html;
  }); // state.reducer.stateName

  var reportId_html_flag = useSelector((state) => {
    return state.serverCall.reportId_html_flag;
  }); // state.reducer.stateName

  const removeReportBackgroundAndScrollbar = (fullReport) => {
    const bodyIndexStart = fullReport.indexOf(`body {`);
    const bodyToReplace = fullReport.substring(
      bodyIndexStart,
      bodyIndexStart + 360
    );
    const body =
      fullReport.substring(bodyIndexStart, bodyIndexStart + 120) + "}";
    const modifiedReport = fullReport
      .replace(bodyToReplace, body)
      .replaceAll(`contenteditable="true"`, "")
      .replaceAll(`contenteditable="false"`, "");

    setModifiedReport(modifiedReport);
  };

  const getReport = (html) => {
    reportId === reportId_html_flag && setOriginalReport(html);
  };

  useEffect(() => {
    originalReport === undefined && getReport(html);
    originalReport !== undefined &&
      removeReportBackgroundAndScrollbar(originalReport);
  }, [originalReport, html]);

  return <div>{ReactHtmlParser(modifiedReport)}</div>;
};

export default Report;
