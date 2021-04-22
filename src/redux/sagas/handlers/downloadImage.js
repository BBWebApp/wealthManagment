import { call, put } from "redux-saga/effects";
import { requestGetUser } from "../requests/downloadImage";
import {
  setFavsDownloadedImages,
  setDownloadedImages,
} from "../../ducks/downloadImage";

export function* handleGetUser(action) {
  var favouriteClicked = action["favourites"];
  try {
    var response = yield call(requestGetUser, action);
    var { data } = response;

    yield favouriteClicked
      ? put(setFavsDownloadedImages(data))
      : put(setDownloadedImages(data));
  } catch (error) {
    console.log(error);
  }
}
