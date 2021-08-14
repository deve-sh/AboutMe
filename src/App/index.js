import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Global material ui configuration.
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";

// Constants
import constants from "./constants";
import toasts from "./constants/toastConstants";

import auth, { logoutUser } from "../firebase/authentication";

// Reusable Components
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

// Store actions
import {
	loginUser,
	logoutUser as logoutUserFromStore,
} from "./store/actionCreators";
import { createUserDocument, getUserDocument, updateUserDocument } from "./API";

const theme = createTheme({
	palette: {
		primary: blue,
		secondary: red,
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
					await updateUserDocument(email || phoneNumber, userData, () => null);
				} else {
					// Create a user with this identifier.
					await createUserDocument(email || phoneNumber, userData, () => null);
				}

				dispatch(loginUser({ ...userData, ...(userDocumentInDatabase || {}) }));
			} else dispatch(logoutUserFromStore());
		});
	}, []);

	// Actual app.
	return (
		<ThemeProvider theme={theme}>
			{/* Global Toast for error messages */}
			<ToastContainer />

			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/login" component={Login} />
				<ProtectedRoute path="/profile">
					<Profile logoutUser={logoutUser} />
				</ProtectedRoute>
			</Switch>
		</ThemeProvider>
	);
};
export default App;
