import { call, put } from "redux-saga/effects";
import { requestServerCall } from "../requests/serverCall";
import { setSlicedImage } from "../../ducks/serverCall";

export function* handleServerCall(action) {
  try {
    var response = yield call(requestServerCall, action);
    var slicedImage = "data:image/png;base64," + response.data["image"];

  } catch (error) {
    console.log(error);
  }
}
