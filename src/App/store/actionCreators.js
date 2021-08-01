import * as actions from "./actions";

export const loginUser = (user) => {
	return { type: actions.LOGIN_USER, user };
};

export const logoutUser = () => {
	return { type: actions.LOGOUT_USER };
};

export const updateUserDetails = (newUserDetails) => {
	return { type: actions.UPDATE_USER_DETAILS, newUserDetails };
};