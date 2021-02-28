import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import { googleSignInFailure, googleSignInSuccess } from "./user.actions";

import {
    auth,
    googleProvider,
    createUserProfileDocument,
} from "../../firebase/firebase.utils";

export function* signInWithGoogle() {
    try {
        // we signin with popup here to get access the results instead we use it on component
        const { user } = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        // put() puts things back into our regular redux flow
        yield put(
            googleSignInSuccess({ id: userSnapshot.id, ...userSnapshot.data })
        );
    } catch (error) {
        yield put(googleSignInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart)]);
}
