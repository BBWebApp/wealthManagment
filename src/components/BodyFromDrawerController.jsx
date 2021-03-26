import Report from "@bit/bbconsult.standalone-components.report";
import React, { useEffect, useState } from "react";

import ReportTemplatePage from "@bit/bbconsult.standalone-components.report-template-page";
import axios from "axios";

var base = require("base-64");

var parseString = require("xml2js").parseString;
var tok = "gui_client:kFjfAh68k$$ADUjPr?vPA";
var hash = base.encode(tok);
var Basic = "Basic " + hash;

const BodyFromDrawerController = (props) => {
  const { reportId } = props;
  const [xmlResult, setxmlResult] = useState(undefined);

  useEffect(async () => {
    if (reportId === "wealth") {
      const [firstResponse] = await Promise.all([
        axios.get("http://localhost:8011/proxy/workflow/3/task/1/upload", {
          headers: {
            Authorization: Basic,
          },
        }),
      ]);
      parseString(firstResponse.data, function (err, result) {
        setxmlResult(result);
      });
    }
  }, []);

  const reportContent =
    reportId === "wealth" ? (
      xmlResult !== undefined && <ReportTemplatePage xmlResult={xmlResult} />
    ) : (
      <Report key={reportId} reportId={reportId} />
    );
  return reportContent;
};

export default BodyFromDrawerController;
