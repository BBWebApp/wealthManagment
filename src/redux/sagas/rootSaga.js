import { takeEvery } from "redux-saga/effects";
import { GET_DOWNLOADIMAGES } from "../ducks/downloadImage";
import { UPLOAD_IMAGE } from "../ducks/uploadImage";
import { getSlicedImage, GET_SLICEDIMAGE } from "../ducks/serverCall";
import { handleGetUser } from "./handlers/downloadImage";
import { handleUploadImage } from "./handlers/uploadImage";
import { handleServerCall } from "./handlers/serverCall";

//check out any action that was dispatched and map it to the function
export function* watchSaga() {
  /* take the latest action that got dispatched and execute it,
    helpful by multiple same dispatched actions */
  yield takeEvery(GET_SLICEDIMAGE, handleServerCall);
  yield takeEvery(UPLOAD_IMAGE, handleUploadImage);
  yield takeEvery(GET_DOWNLOADIMAGES, handleGetUser);
}
