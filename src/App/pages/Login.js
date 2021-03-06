import React, { useState } from "react";
import styled from "styled-components";
import { Redirect, useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import { Paper, Typography } from "@material-ui/core";

import GithubSignInButton from "../components/Authentication/GithubSignInButton";
import GoogleSignInButton from "../components/Authentication/GoogleSignInButton";
import Image from "../components/Image";

import {
	signInWithGithub,
	signInWithGoogle,
} from "../../firebase/authentication";
import toasts from "../constants/toastConstants";

const LoginPageForm = styled(Paper)`
	padding: 0.75rem 1rem 1.75rem 1rem;
	display: block;
	margin: auto auto;
	max-width: 350px;
	min-width: 350px;
	text-align: center;
`;

const LoginPage = styled.div`
	padding: 1.5rem;
	background: #0175f3;
	min-height: 100vh;
	width: 100%;
	display: flex;
	flex-flow: column;
	align-items: center;
	justify-content: center;
`;

const LoginFormHeading = styled.h1`
	font-size: 2rem;
	font-weight: 600;
	margin-bottom: 1.5rem;
`;

const LoginFormImage = styled(Image)`
	margin-bottom: 1.5rem;
	max-height: 45vh;
	max-width: 90%;
`;

const Login = () => {
	const { user, isAuthenticated } = useSelector(
		({ user, isAuthenticated }) => ({ user, isAuthenticated })
	);
	const history = useHistory();
	const [loading, setloading] = useState(false);

	const handleAuthenticated = (err) => {
		setloading(false);
		if (err) toasts.generateError(err);
		else history.push("/profile");
	};

	const onGoogleSignInClick = () => {
		setloading(true);
		signInWithGoogle(handleAuthenticated);
	};

	const onGithubSignInClick = () => {
		setloading(true);
		signInWithGithub(handleAuthenticated);
	};

	return user || isAuthenticated ? (
		<Redirect to={"/profile"} />
	) : (
		<LoginPage>
			<Helmet>
				<title>AboutMe - Login</title>
			</Helmet>
			<LoginPageForm elevation={6}>
				<LoginFormHeading variant={"h4"}>Login</LoginFormHeading>
				<LoginFormImage src={"/login.svg"} />
				<GoogleSignInButton disabled={loading} onClick={onGoogleSignInClick} />
				<br />
				<br />
				<GithubSignInButton disabled={loading} onClick={onGithubSignInClick} />
				<br />
				<br />
				<Link to="/" title="Back Home">
					<Typography color="primary">Back Home</Typography>
				</Link>
			</LoginPageForm>
		</LoginPage>
	);
};

export default Login;
