import { call, put } from "redux-saga/effects";
import { requestGetUser } from "../requests/screenShot";
import { setScreenShots } from "../../ducks/screenShot";

export function* handleGetUser(action) {
  try {
    const response = yield call(requestGetUser);
    const { data } = response;
    yield put(setScreenShots(data));
  } catch (error) {
    console.log(error);
  }
}
