import { all } from "redux-saga/effects";
import bookSaga from "./Books/saga";

export default function* rootSaga() {
    yield all([
        bookSaga()
    ]);
}
