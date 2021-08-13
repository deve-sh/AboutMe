import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
	const isAuthenticated = useSelector((state) => state.isAuthenticated);
	const user = useSelector((state) => state.user);

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated && user ? (
					Component ? (
						<Component {...props} />
					) : (
						children
					)
				) : (
					<Redirect to="/login" />
				)
			}
		/>
	);
};

export default ProtectedRoute;
