import { call, put } from "redux-saga/effects";
import { requestServerCall } from "../requests/serverCall";
import { setSlicedImage } from "../../ducks/serverCall";

export function* handleServerCall(action) {
  var image = action["image"];
  var reportId = action["reportId"];
  try {
    if (image) {
      var response = yield call(requestServerCall, action);
      var slicedImage = "data:image/png;base64," + response.data;
      yield put(setSlicedImage(slicedImage, reportId));
    }
  } catch (error) {
    console.log(error);
  }
}
