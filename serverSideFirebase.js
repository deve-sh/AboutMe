// File to initialize Firestore on the server side.
// Handles multiple app instantiations as well.

const firebase = require("firebase");
require("firebase/firestore");

let firebasePrimaryApp = null;

const config = {
	apiKey: process.env.REACT_APP_apiKey,
	authDomain: process.env.REACT_APP_authDomain,
	databaseURL: process.env.REACT_APP_databaseURL,
	projectId: process.env.REACT_APP_projectId,
	storageBucket: process.env.REACT_APP_storageBucket,
	messagingSenderId: process.env.REACT_APP_messagingSenderId,
	appId: process.env.REACT_APP_appId,
	measurementId: process.env.REACT_APP_measurementId,
};

if (firebase.apps.length) firebasePrimaryApp = firebase.apps[0];
else firebasePrimaryApp = firebase.initializeApp(config);

module.exports = firebasePrimaryApp;
