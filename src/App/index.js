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

// Store actions
import {
	logoutUser as logoutUserFromStore,
	updateUserDetails,
} from "./store/actionCreators";
import { createUserDocument, getUserDocument } from "./API";

const theme = createTheme({
	palette: {
		primary: teal,
		secondary: deepOrange,
	},
});

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged(async (user) => {
			if (user) {
				let displayName = user.displayName,
					email = user.email,
					emailVerified = user.emailVerified,
					photoURL = user.photoURL,
					isAnonymous = user.isAnonymous,
					phoneNumber = user.phoneNumber,
					uid = user.uid,
					providerData = user.providerData,
					lastSignInTime = user.metadata.lastSignInTime;

				let userData = {
					identifier: email || phoneNumber,
					displayName,
					email,
					emailVerified,
					photoURL,
					isAnonymous,
					phoneNumber,
					uid,
					id: uid,
					providerData: JSON.parse(JSON.stringify(providerData)),
					lastSignInTime,
				};

				// Check if user exists in the database.
				let userDocumentInDatabase = await getUserDocument(
					email || phoneNumber
				);
				if (userDocumentInDatabase) {
					// Update any details that might have updated.
					await updateUserDetails(email || phoneNumber, userData);
				} else {
					// Create a user with this identifier.
					await createUserDocument(email || phoneNumber, userData);
				}
			} else dispatch(logoutUserFromStore());
		});
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
