import { call, put } from "redux-saga/effects";
import { setReportHtml, setXML } from "../../ducks/serverCall";
import { requestServerCall } from "../requests/serverCall";

export function* handleServerCall(action) {
  var dispatch_type = action["type"];

  try {
    switch (dispatch_type) {
      case "GET_XML":
        var response = yield call(requestServerCall, action);
        var xml = response.data;
        yield put(setXML(xml));
        break;
      case "GET_REPORT_HTML":
        var reportId = action["reportId_html_flag"];
        var response = yield call(requestServerCall, action);
        var html = response.data;
        yield put(setReportHtml(html, reportId));
        break;
      default:
        break;
    }
  } catch (error) {
    console.log(error);
  }
}
