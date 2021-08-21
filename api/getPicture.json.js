module.exports = async (req, res) => {
	try {
		const firebase = require("../serverSideFirebase");

		let { identifier } = req.query;
		if (!identifier)
			return res.status(400).send({
				error: "Incomplete information provided.",
			});

		let userInfo = await firebase
			.firestore()
			.collection("registeredusers")
			.doc(identifier)
			.get();

		if (!userInfo.exists || userInfo.data().disabled)
			return res.status(404).send({
				error: "User not found.",
			});

		userInfo = userInfo.data();

		return res.json({
			hasPhoto: !!userInfo.photoURL,
			picture: userInfo.photoURL || "",
			message: userInfo.photoURL ? "Success" : "User doesn't have a photo",
		});
	} catch (err) {
		return res.status(500).json({
			message: err.message || "Something went wrong. Please try again later.",
		});
	}
};
