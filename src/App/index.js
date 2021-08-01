import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

// Constants
import constants from "./constants";
import toasts from "./constants/toastConstants";

const App = (props) => {
	const dispatch = useDispatch();

	// // Authentication handlers
	// const [showAuth, setshowAuth] = useState(false);
	// const [authMode, setauthMode] = useState(constants.LOGINMODE);

	// const toggleAuth = newAuthMode => {
	// 	if (newAuthMode) setauthMode(newAuthMode);
	// 	setshowAuth(!showAuth);
	// };

	// const switchMode = newAuthMode => setauthMode(newAuthMode);

	// const isAuthenticated = useSelector(state => state.isAuthenticated);
	// const hasFetchedUser = useSelector(state => state.hasFetchedUser);

	// Actual app.
	return (
		<React.Fragment>
			{/* Global Toast for error messages */}
			<ToastContainer />

			<Switch></Switch>
		</React.Fragment>
	);
};
export default App;
