import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import uploadImage from "./ducks/uploadImage";
import downloadImage from "./ducks/downloadImage";
import serverCall from "./ducks/serverCall";
import { watchSaga } from "./sagas/rootSaga";

const reducer = combineReducers({
  uploadImage: uploadImage,
  downloadImage: downloadImage,
  serverCall: serverCall,
}); // for multiple ducks

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watchSaga); //setup the listener to listen for any dispatch actions

export default store;
