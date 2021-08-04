module.exports = async (req, res) => {
	try {
		const firebase = require("../serverSideFirebase");
        const { get } = require('axios');

		const generateStatusBadge = async (status, emoji, options) => {
			status = status || "No Status";
			emoji = emoji || "😁";
			options = options || { color: "brightgreen" };

			try {
				let shieldsURL = `https://img.shields.io/badge/${encodeURIComponent(
					emoji
				)}-${encodeURIComponent(status)}-${options.color || "brightgreen"}`;
				let svgHTML = await get(shieldsURL);

				return svgHTML.data;
			} catch (err) {
				console.log("Error in generating status badge: ", err);
				return "";
			}
		};

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

		let image = await generateStatusBadge(
			userInfo.status,
			userInfo.statusEmoji,
			userInfo.statusOptions || {
				color: "brightgreen",
			}
		);

		if (image) res.setHeader("Content-Type", "image/svg+xml");
		return res.send(image);
	} catch (err) {
		return res.status(500).json({
			message: err.message || "Something went wrong. Please try again later.",
		});
	}
};
