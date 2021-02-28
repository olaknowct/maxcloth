import { takeLatest, put, all, call } from "redux-saga/effects";

import UserActionTypes from "./user.types";

import {
    signInSuccess,
    signInFailure,
    // googleSignInFailure,
    // googleSignInSuccess,
    // emailSignInSuccess,
    // emailSignInFailure,
} from "./user.actions";

import {
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser,
} from "../../firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        // put() puts things back into our regular redux flow
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        // we signin with popup here to get access the results instead we use it on component
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);

        // const userRef = yield call(createUserProfileDocument, user);
        // const userSnapshot = yield userRef.get();
        // put() puts things back into our regular redux flow
        // yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
        // const userRef = yield call(createUserProfileDocument, user);
        // const userSnapshot = yield userRef.get();

        // put() puts things back into our regular redux flow
        // yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const { userAuth } = yield getCurrentUser();

        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    // the payload or action will be passed into next argument as paramater
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}
// initializing
export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated),
    ]);
}
