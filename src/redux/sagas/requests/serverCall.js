import axios from "axios";

var dispatch_types_urls = {
  GET_XML: "http://localhost:8085/appxml",
  GET_REPORT_HTML: "http://localhost:8085/reportHtml",
};

export function requestServerCall(action) {
  var dispatch_type = action["type"];
  switch (dispatch_type) {
    case "GET_XML":
      return axios.post(dispatch_types_urls["GET_XML"]);
    case "GET_REPORT_HTML":
      var reportId = action["reportId_html_flag"];
      return axios.post(dispatch_types_urls["GET_REPORT_HTML"], {
        reportId: reportId,
      });

    default:
      break;
  }
}
