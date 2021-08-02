import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import GitHubIcon from "@material-ui/icons/GitHub";

const StyledButton = styled(Button)`
	padding: 0.875rem 1rem !important;
	border-radius: 0.25rem;
	background: #191919 !important;
    color: #ffffff !important;
	border: 0.075rem solid #191919;
`;

const StyledButtonLabel = styled.label`
	margin-left: 0.75rem;
	font-weight: 500;
	font-size: 0.875rem;
	letter-spacing: 0.075rem;
`;

const GithubSignInButton = (props) => {
	return (
		<StyledButton variant={"contained"}>
			<GitHubIcon />
			<StyledButtonLabel>Sign In With Github</StyledButtonLabel>
		</StyledButton>
	);
};

export default GithubSignInButton;
