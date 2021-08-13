module.exports = async (req, res) => {
	try {
		const firebase = require("../serverSideFirebase");

		let { identifier } = req.query;
		if (!identifier) return res.status(400).send("");

		let userInfo = await firebase
			.firestore()
			.collection("registeredusers")
			.doc(identifier)
			.get();

		if (!userInfo.exists || userInfo.data().disabled)
			return res.status(404).send("");

		userInfo = userInfo.data();

		if (userInfo.photoURL)
			return res.send(`<img src="${userInfo.photoURL}" />`);

		res.setHeader("Content-Type", "image/png");
		return res.send("");
	} catch (err) {
		return res.status(500).json("");
	}
};
