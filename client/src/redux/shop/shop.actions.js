import ShopActionTypes from "./shop.types";

import {
    firestore,
    convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";

export const fetchCollectionStart = (collectionsMap) => {
    return {
        type: ShopActionTypes.FETCH_COLLECTIONS_START,
    };
};

export const fetchCollectionsSuccess = (collectionsMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage,
});

// thunks are action creatro that gets the dispatch
export const fetchCollectionStartAsync = () => {
    return (dispatch) => {
        const collectionRef = firestore.collection("collections");
        dispatch(fetchCollectionStart());
        collectionRef
            .get()
            .then((snapshot) => {
                const collectionsMap = convertCollectionsSnapshotToMap(
                    snapshot
                );
                dispatch(fetchCollectionsSuccess(collectionsMap));
            })
            .catch((err) => {
                dispatch(fetchCollectionsFailure(err.message));
            });
    };
};
