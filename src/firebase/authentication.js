// File to house the global authentication ref of firebase.

import firebase from "./index";
import mainFirebase from "firebase/app";
import "firebase/auth";

const auth = firebase.auth();

// Providers
let googleProvider = new mainFirebase.auth.GoogleAuthProvider();

export default auth;
export const providers = { googleProvider, mainFirebase };

export const isLoggedIn = () => {
    return !!auth.currentUser;
};

const getAuthError = (err) => {
    if (process.env.NODE_ENV !== 'production') console.log(err);

    // Handling login errors.
    let errorCode = 'auth/network-request-failed';
    let errorMessage = 'Something went wrong while logging in. Please try again later.';

    try {
        errorCode = JSON.parse(JSON.stringify(err.code));
    } catch (err) {}

    if (errorCode === 'auth/network-request-failed') {
        errorMessage = 'Network request failed. Please check your internet connection!';
    } else if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
        errorMessage = 'You have entered an invalid email or password.';
    } else if (errorCode === 'auth/too-many-requests')
        errorMessage = 'Too many login attempts. Try again in some time.';
    else if (errorCode === 'auth/user-disabled')
        errorMessage = 'Your account has been disabled. Kindly contact administrator.';
    else if (errorCode === 'auth/web-storage-unsupported')
        errorMessage =
            'Your browser is unsupported. Please try another browser or allow web storage.';
    else {
        errorMessage = err.message;
    }

    return errorMessage;
};

export const loginUserWithEmailAndPassword = async (email, password, callback) => {
    try {
        await auth.signInWithEmailAndPassword(email, password);
        let user = auth.currentUser;
        return callback(null, user);
    } catch (err) {
        return callback(getAuthError(err), null);
    }
};

export const getCurrentUser = () => {
    return auth.currentUser;
};

export const getToken = async () => {
    try {
        if (auth.currentUser) {
            let idToken = await auth.currentUser.getIdToken(true);
            localStorage.setItem('fusionchargeauthtoken', idToken);
            return idToken;
        } else return localStorage.getItem('fusionchargeauthtoken') || null;
    } catch (err) {
        return localStorage.getItem('fusionchargeauthtoken') || null;
    }
};

export const logoutUser = async (callback) => {
    try {
        await auth.signOut();
        if (callback instanceof Function) return callback(true);
    } catch (err) {
        if (callback instanceof Function) return callback(false);
    }
};

export const sendPasswordResetEmail = async (email, callback) => {
    try {
        await auth.sendPasswordResetEmail(email);
        return callback(null);
    } catch (err) {
        return callback(err.message);
    }
};

export const signInWithGoogle = async (callback) => {
    try {
        await auth.signInWithPopup(googleProvider);
    } catch (err) {
        return callback(getAuthError(err), null);
    }
};

export const signInWithGithub = async (callback) => {
    try {
        await auth.signInWithPopup(githubProvider);
    } catch (err) {
        return callback(getAuthError(err), null);
    }
};

export const registerUserWithEmailAndPassword = async (values, callback) => {
    try {
        let { email, password } = values;
        let { firstName, lastName } = values;

        await secondaryApp.auth().createUserWithEmailAndPassword(email, password);

        let user = secondaryApp.auth().currentUser;

        await user.updateProfile({
            displayName: values.firstName + ' ' + values.lastName
        });

        let detailsToStore = {
            uid: user.uid,
            id: user.uid,
            email,
            displayName: values.firstName + ' ' + values.lastName,
            firstName,
            lastName,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await secondaryApp.firestore().collection('users').doc(user.uid).set(detailsToStore);
        await user.sendEmailVerification();
        await secondaryApp.auth().signOut();

        return callback(null);
    } catch (err) {
        return callback(getAuthError(err), null);
    }
};
