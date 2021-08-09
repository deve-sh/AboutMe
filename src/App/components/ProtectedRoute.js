import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const isAuthenticated = useSelector((state) => state.isAuthenticated);
	const user = useSelector((state) => state.user);

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated && user ? <Component {...props} /> : <Redirect to="/" />
			}
		/>
	);
};

export default ProtectedRoute;
