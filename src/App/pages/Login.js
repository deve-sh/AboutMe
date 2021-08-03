import React, { useState } from "react";
import styled from "styled-components";

import { Paper, Typography } from "@material-ui/core";

import GithubSignInButton from "../components/Authentication/GithubSignInButton";
import GoogleSignInButton from "../components/Authentication/GoogleSignInButton";
import Image from "../components/Image";

const LoginPageForm = styled(Paper)`
	padding: 3rem 1rem;
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

const LoginFormHeading = styled(Typography)`
	font-size: 1.25rem;
	margin-bottom: 1.5rem !important;
`;

const LoginFormImage = styled(Image)`
	margin-bottom: 1.5rem;
	max-height: 45vh;
	max-width: 90%;
`;

const Login = (props) => {
	const [loading, setloading] = useState(false);

	const signInWithGoogle = () => {};

	const signInWithGithub = () => {};

	return (
		<LoginPage>
			<LoginPageForm elevation={6}>
				<LoginFormHeading variant={"h4"}>Login</LoginFormHeading>
				<LoginFormImage src={"/login.svg"} />
				<GoogleSignInButton disabled={loading} />
				<br />
				<br />
				<GithubSignInButton disabled={loading} />
			</LoginPageForm>
		</LoginPage>
	);
};

export default Login;