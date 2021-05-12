import axios from "axios";

var dispatch_types_urls = {
  GET_TABLE_DATA: "http://localhost:8085/getTableData",
};

export function requestTableData(action) {
  var dispatch_type = action["type"];

  switch (dispatch_type) {
    case "GET_TABLE_DATA":
      var tableUrl = action["tableUrl"];

      return axios.post(dispatch_types_urls["GET_TABLE_DATA"], {
        tableUrl: tableUrl,
      });
    default:
      break;
  }
}
