import { notify } from "react-notify-toast";

const timeOut = 2000,
	success = "success",
	error = "error",
	warning = "warning";

const toasts = {
	generateSuccess: (sucessMessage = "") => {
		return notify.show(sucessMessage, success, timeOut);
	},
	generateError: (errorMessage = "") => {
		return notify.show(errorMessage, error, timeOut);
	},
	generateWarning: (warningMessage = "") => {
		return notify.show(warningMessage, warning, timeOut);
	}
};

export default toasts;
