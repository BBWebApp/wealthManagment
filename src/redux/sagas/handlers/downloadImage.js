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
    var imagesArray = data;
    yield favouriteClicked
      ? put(setFavsDownloadedImages(imagesArray))
      : put(setDownloadedImages(imagesArray));
  } catch (error) {
    console.log(error);
  }
}
