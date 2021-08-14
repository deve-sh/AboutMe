import React from "react";
import styled from "styled-components";

import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { MeetingRoom as LoginIcon } from "@material-ui/icons";

const HomePageHeader = styled.header`
	text-align: right;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 0.875rem;
	border-bottom: 0.075rem solid #cfcfcf;
	text-decoration: none;
`;
const HomePageFirstSection = styled.section``;
const HomePageSecondSection = styled.section``;

const Home = (props) => {
	return (
		<>
			<HomePageHeader>
				<Link to="/login" title="Login">
					<Button color="primary" variant="contained" startIcon={<LoginIcon />}>
						Login
					</Button>
				</Link>
			</HomePageHeader>
			<HomePageFirstSection />
			<HomePageSecondSection />
		</>
	);
};

export default Home;
