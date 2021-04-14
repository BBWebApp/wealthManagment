// import Report from '@bit/bbconsult.standalone-components.wm-components.report'
import Report from "../tempComponents/Report";
import React, { useEffect, useState } from "react";
// import ReportTemplatePage from '@bit/bbconsult.standalone-components.report-template-page'
import ReportTemplatePage from "../tempComponents/ReportTemplatePage";

const BodyFromDrawerController = (props) => {
  const { reportId } = props;
  const { content } = props;
  const [xmlResult, setxmlResult] = useState(undefined);

  useEffect(async () => {
    content[reportId] !== undefined && setxmlResult(content[reportId]);
  }, []);

  var reportContent;
  if (content[reportId] !== undefined && xmlResult !== undefined) {
    reportContent = (
      <ReportTemplatePage reportId={reportId} xmlResult={xmlResult} />
    );
  } else {
    reportContent = <Report key={reportId} reportId={reportId} />;
  }

  return reportContent;
};

export default BodyFromDrawerController;
