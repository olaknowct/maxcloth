// listening of every action of specific type we pass into it
// call does effect inside on our function generatore that invokes the map
import { takeLatest, call, put, all } from "redux-saga/effects";

import {
    firestore,
    convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure,
    fetchCollectionStart,
} from "./shop.actions";

// listening to specific action types
import ShopActionTypes from "./shop.types";

export function* fetchCollectionAsync() {
    try {
        const collectionRef = firestore.collection("collections");

        const snapshot = yield collectionRef.get();

        // 1st argument is function, second is parameters of 1st argument
        const collectionsMap = yield call(
            convertCollectionsSnapshotToMap,
            snapshot
        );
        // put == dispatch in sagas
        // put is saga effect who creates action
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (err) {
        yield put(fetchCollectionsFailure(err.message));
    }

    // collectionRef
    //     .get()
    //     .then((snapshot) => {
    //         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //         dispatch(fetchCollectionsSuccess(collectionsMap));
    //     })
    //     .catch((err) => {
    //         dispatch(fetchCollectionsFailure(err.message));
    //     });
}

// 1st parementer is action type, 2nd parameter another genarator functin for the results
export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionAsync
    );
}

export function* shopSagas() {
    yield all([call(fetchCollectionStart)]);
}
