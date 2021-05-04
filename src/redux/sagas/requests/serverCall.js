import axios from "axios";
var url1 = "http://localhost:8085/sliceImage";

export function requestServerCall(action) {
  var image = action["image"];
  var reportElement = action["reportElement"];
  return axios.post(url1, { image: image, reportElement: reportElement });
}
