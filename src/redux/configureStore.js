import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import uploadImage from "./ducks/uploadImage";
import screenShotReducer from "./ducks/screenShot";
import { watchSaga } from "./sagas/rootSaga";

const reducer = combineReducers({
  uploadImage: uploadImage,
  screenShot: screenShotReducer,
}); // for multiple ducks

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watchSaga); //setup the listener to listen for any dispatch actions

export default store;
