import firebase from "firebase/app";

import "firebase/firestore";

import "firebase/auth";

const config = {
    apiKey: "AIzaSyCk5TDZRsmirQ6J4uUfFtmKu5zhD57L9hk",
    authDomain: "crwn-db-51c39.firebaseapp.com",
    projectId: "crwn-db-51c39",
    storageBucket: "crwn-db-51c39.appspot.com",
    messagingSenderId: "474119195339",
    appId: "1:474119195339:web:d766e16c6ae52fd073294e",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
