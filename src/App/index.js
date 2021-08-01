import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

// Constants
import constants from "./constants";
import toasts from "./constants/toastConstants";

import auth from "../firebase/authentication";

const App = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged(console.log);
	}, []);

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
