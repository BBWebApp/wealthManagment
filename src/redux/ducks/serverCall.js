export const GET_XML = "GET_XML";
export const SET_XML = "SET_XML";

export const GET_REPORT_HTML = "GET_REPORT_HTML";
export const SET_REPORT_HTML = "SET_REPORT_HTML";

//REDUCERS

export const getXML = () => ({
  type: GET_XML,
});

export const setXML = (xml) => ({
  type: SET_XML,
  xml: xml,
});
export const getReportHtml = (reportId) => ({
  type: GET_REPORT_HTML,
  reportId_html_flag: reportId,
});

export const setReportHtml = (html, reportId) => ({
  type: SET_REPORT_HTML,
  reportId_html_flag: reportId,
  html: html,
});
// STATE
const initialState = {
  reportId_html_flag: undefined,
  xml: undefined,
  html: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_XML:
      var { xml } = action;
      return { ...state, xml: xml };
    case SET_REPORT_HTML:
      var { html } = action;
      var { reportId_html_flag } = action;
      return { ...state, html: html, reportId_html_flag: reportId_html_flag };
    default:
      return state;
  }
};
