import axios from "axios";

var dispatch_types_urls = {
  GET_SLICEDIMAGE: "http://localhost:8085/sliceImage",
};

export function requestCropImage(action) {
  var dispatch_type = action["type"];

  switch (dispatch_type) {
    case "GET_SLICEDIMAGE":
      var image = action["image"];
      var reportElement = action["reportElement"];
      return axios.post(dispatch_types_urls["GET_SLICEDIMAGE"], {
        image: image,
        reportElement: reportElement,
      });
    default:
      break;
  }
}
