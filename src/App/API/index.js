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

export const createUserDocument = async (
	userIdentifier,
	userData,
	callback
) => {
	try {
		userData = userData || {
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

export default updateStatus = async (statusUpdates, callback) => {
	try {
		statusUpdates = statusUpdates || {
			statusOptions: {},
			status: "No Status",
			statusEmoji: "😁",
		};

		let userRef = db
			.collection(appConstants.COLLECTIONS.REGISTEREDUSERS)
			.doc(userIdentifier);

		await userRef.update({
			...statusUpdates,
			updatedAt: firestore.FieldValue.serverTimestamp(),
			nUpdates: firestore.FieldValue.increment(1),
		});

		return callback(null, statusUpdates);
	} catch (err) {
		if (process.env.REACT_APP_USE_ENV !== "production") console.log(err);
		return callback(err.message, null);
	}
};
