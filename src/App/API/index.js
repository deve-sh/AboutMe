import db, { firestore } from "../../firebase/database";

import appConstants from "../constants";

export const getUserDocument = async (userIdentifier) => {
	try {
		let user = await db
			.collection(appConstants.COLLECTIONS.REGISTEREDUSERS)
			.doc(userIdentifier)
			.get();

		return user.data();
	} catch (err) {
		if (process.env.REACT_APP_USE_ENV !== "production") console.log(err);
		return null;
	}
};

export const createUserDocument = async (userIdentifier, userData) => {
	try {
		let userData = userData || {
			email: userIdentifier,
			statusOptions: {},
			status: "No Status",
			statusEmoji: "😁",
			createdAt: firestore.FieldValue.serverTimestamp(),
			updatedAt: firestore.FieldValue.serverTimestamp(),
		};

		let userRef = db
			.collection(appConstants.COLLECTIONS.REGISTEREDUSERS)
			.doc(userIdentifier);

		await userRef.set(userData);

		return callback(null, userData);
	} catch (err) {
		if (process.env.REACT_APP_USE_ENV !== "production") console.log(err);
		return callback(err.message, null);
	}
};
