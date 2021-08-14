import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";
import {
	MeetingRoom as LoginIcon,
	AccountCircle as ProfileIcon,
} from "@material-ui/icons";

import Image from "../components/Image";

const HomePageHeader = styled.header`
	text-align: right;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 0.625rem;
	text-decoration: none;
`;
const HomePageFirstSection = styled.section`
	max-width: 1100px;
	margin: 0 auto;
	text-align: center;
`;
const HomePageImageSection = styled.div`
	padding: 1rem;
	img {
		max-width: 350px;
	}
`;
const HomePageTextSection = styled(HomePageImageSection)``;

const Heading = styled.h1`
	margin-bottom: 0.5rem;
`;
const Description = styled.div`
	color: #606060;
	max-width: 650px;
	margin: 0 auto;
`;

// Second section styling.
const HomePageSecondSection = styled(HomePageFirstSection)``;

const Home = () => {
	const user = useSelector((state) => state.user);

	return (
		<>
			<Helmet>
				<title>AboutMe</title>
			</Helmet>
			<HomePageHeader>
				<Link
					to={user ? "/profile" : "/login"}
					title={user ? "Profile" : "Login"}
				>
					<Button
						color="primary"
						variant="contained"
						startIcon={user ? <ProfileIcon /> : <LoginIcon />}
					>
						{user ? "Profile" : "Login"}
					</Button>
				</Link>
			</HomePageHeader>
			<HomePageFirstSection>
				<HomePageImageSection>
					<Image src="/status.svg" alt="Status" />
				</HomePageImageSection>
				<HomePageTextSection>
					<Heading>
						Tired Of Status Updates? Or Profile Picture Updates?
					</Heading>
					<Description>
						What if there was a service that would allow you to update your
						status at one place, and have it update everywhere. Magically!
					</Description>
				</HomePageTextSection>
			</HomePageFirstSection>
			<HomePageSecondSection></HomePageSecondSection>
		</>
	);
};

export default Home;
