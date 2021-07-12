// import Report from '@bit/bbconsult.standalone-components.wm-components.report'
import Report from "../tempComponents/Report";
import React, { useEffect, useState } from "react";
// import ReportTemplatePage from '@bit/bbconsult.standalone-components.report-template-page'
import ReportTemplatePage from "../tempComponents/ReportTemplatePage";
import { useSelector, useDispatch } from "react-redux";
import { getReportHtml } from "../redux/ducks/serverCall";

const BodyFromDrawerController = (props) => {
  const { reportId } = props;
  const { packageId } = props;
  const content = { Defaults: { here: ["text"] } };
  const [xmlResult, setxmlResult] = useState(undefined);
  const dispatch = useDispatch();
  useEffect(() => {
    content[packageId][reportId] !== undefined &&
      setxmlResult(content[packageId][reportId]);
    dispatch(getReportHtml(reportId, packageId));
  }, []);

  var reportId_html_flag = useSelector((state) => {
    return state.serverCall.reportId_html_flag;
  }); // state.reducer.stateName
  var reportContent;
  if (
    content[packageId][reportId] !== undefined &&
    xmlResult !== undefined &&
    reportId_html_flag === reportId
  ) {
    reportContent = (
      <ReportTemplatePage
        reportId={reportId}
        packageId={packageId}
        xmlResult={xmlResult}
      />
    );
  } else if (content[reportId] === undefined) {
    reportContent = <Report key={reportId} reportId={reportId} />;
  } else {
    reportContent = <div>404 Report not found</div>;
  }
  return reportContent;
};

export default BodyFromDrawerController;
