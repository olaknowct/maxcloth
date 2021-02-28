// issue and call all sagas
import { all, call } from "redux-saga/effects";

import { fetchCollectionsStart } from "./shop/shop.sagas";

export default function* rootSaga() {
    // initialize concurently, like takes every
    yield all([call(fetchCollectionsStart)]);
}