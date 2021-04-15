import { takeLatest } from "redux-saga/effects";
import { take, put, call, fork, select, all } from "redux-saga/effects";
import { handleGetUser } from "./handlers/screenShot";
import { handleUploadImage } from "./handlers/uploadImage";
import { GET_SCREENSHOTS } from "../ducks/screenShot";
import { UPLOAD_IMAGE } from "../ducks/uploadImage";

//check out any action that was dispatched and map it to the function
export function* watchSaga() {
  /* take the latest action that got dispatched and execute it,
    helpful by multiple same dispatched actions */
  yield takeLatest(UPLOAD_IMAGE, handleUploadImage);
  yield takeLatest(GET_SCREENSHOTS, handleGetUser);
}
