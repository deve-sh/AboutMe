import * as actions from "./actions";
import initialState from "./initialState";

const rootReducer = (state = initialState, action = { type: "" }) => {
	switch (action.type) {
		case actions.LOGIN_USER:
			return { ...state, isAuthenticated: true, user: action.user };
		case actions.LOGOUT_USER:
			if (state.isAuthenticated) return { ...state, ...initialState };
			else return state;
		case actions.UPDATE_USER_DETAILS:
			if (state.isAuthenticated && state.user){
				return {
					...state,
					user: { ...state.user, ...action.newUserDetails },
				};
			}
			else return state;
		default:
			return state;
	}
};

export default rootReducer;
