import React from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";

import Image from "../Image";

const StyledButton = styled(Button)`
	padding: 0.875rem 1rem !important;
	border-radius: 0.25rem;
	background: #ffffff !important;
	border: 0.075rem solid #cfcfcf !important;
	cursor: pointer;
`;

const StyledLogoImage = styled(Image)`
	width: 1.125rem;
	height: 1.125rem;
`;

const StyledButtonLabel = styled.label`
	margin-left: 0.75rem;
	font-weight: 500;
	font-size: 0.875rem;
	letter-spacing: 0.075rem;
	cursor: pointer;
`;

const GoogleSignInButton = (props) => {
	return (
		<StyledButton variant={"contained"} disabled={props.disabled}>
			<StyledLogoImage src="/logos/google.png" />
			<StyledButtonLabel>Sign In With Google</StyledButtonLabel>
		</StyledButton>
	);
};

export default GoogleSignInButton;
