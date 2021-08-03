import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Global material ui configuration.
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { teal, deepOrange } from "@material-ui/core/colors";

// Constants
import constants from "./constants";
import toasts from "./constants/toastConstants";

import auth from "../firebase/authentication";

// Pages
import Login from "./pages/Login";

const theme = createTheme({
	palette: {
		primary: teal,
		secondary: deepOrange,
	},
});

const App = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged(console.log);
	}, []);

	// Actual app.
	return (
		<ThemeProvider theme={theme}>
			{/* Global Toast for error messages */}
			<ToastContainer />

			<Switch>
				<Route path="/login" component={Login} />
			</Switch>
		</ThemeProvider>
	);
};
export default App;
