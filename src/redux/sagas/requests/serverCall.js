import axios from "axios";
var url1 = "http://localhost:8085/sliceImage";

export function requestServerCall(action) {
  var key = Object.keys(action["image"])[0];
  var image = action["image"][key];
  return axios.post(url1, { image: image });
}
