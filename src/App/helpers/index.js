import constants from "../constants";

export const getToken = () => {
	return localStorage.getItem(constants.AUTHTOKEN);
};

export const setToken = (token = "") => {
	return localStorage.setItem(constants.AUTHTOKEN, token);
};

export const removeToken = () => {
	return localStorage.removeItem(constants.AUTHTOKEN);
};

export const copyText = (domNode = null, callback = () => {}) => {
	if (domNode && callback) {
		let target = domNode;
		let range, select;
		if (document.createRange) {
			range = document.createRange();
			range.selectNode(target);
			select = window.getSelection();
			select.removeAllRanges();
			select.addRange(range);
			document.execCommand("copy");
			select.removeAllRanges();
		} else {
			range = document.body.createTextRange();
			range.moveToElementText(target);
			range.select();
			document.execCommand("copy");
		}

		callback(null);
	}
};