import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
	Button,
	InputAdornment,
	TextField,
	Typography,
} from "@material-ui/core";
import {
	AccountCircle,
	Send,
	SentimentVerySatisfied,
} from "@material-ui/icons";
import styled from "styled-components";

import Image from "../components/Image";

const ProfileContainer = styled.div`
	text-align: center;
	max-width: 576px;
	margin: 0 auto;
	padding: 0.75rem;
`;

const ProfilePictureContainer = styled.div`
	text-align: center;
	justify-content: center;
	align-items: center;
	padding: 0.75rem;
	margin: 3.5rem auto 1.5rem auto;
	min-width: 150px;
	max-width: 450px;
`;

const ProfilePicture = styled(Image)`
	border-radius: 50%;
	width: 10.5rem;
	height: 10.5rem;
	border: 0.1rem solid #efefef;
`;

const ProfileNameHeading = styled(Typography)`
	text-transform: uppercase;
	font-weight: 600 !important;
	margin-bottom: 1.5rem !important;
`;

const Profile = (props) => {
	let state = useSelector((state) => state);

	const [userStatus, setuserStatus] = useState(state.user?.status || "");
	const [userStatusEmoji, setuserStatusEmoji] = useState(
		state.user?.statusEmoji || "😁"
	);

	return (
		<ProfileContainer>
			<ProfilePictureContainer>
				<ProfilePicture
					src={state.user?.photoURL || "/defaultprofilephoto.jpeg"}
					alt="Profile Photo"
				/>
			</ProfilePictureContainer>
			<ProfileNameHeading variant="h5">
				{state.user?.displayName || "Anonymous User"}
			</ProfileNameHeading>
			<TextField
				id="status-textfield"
				label="Status"
				variant="outlined"
				placeholder="Ex: Out For Lunch"
				onChange={(e) => {
					e.persist();
					setuserStatus(e.target.value);
				}}
				fullWidth={true}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<AccountCircle color="primary" />
						</InputAdornment>
					),
					maxLength: 20,
					minLength: 0,
				}}
			/>
			<br />
			<br />
			<TextField
				id="status-textfield"
				label="Status Emoji"
				variant="outlined"
				color="secondary"
				placeholder="Ex: 😁"
				onChange={(e) => {
					e.persist();
					setuserStatusEmoji(e.target.value);
				}}
				fullWidth={true}
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SentimentVerySatisfied color="secondary" />
						</InputAdornment>
					),
				}}
			/>
			<br />
			<br />
			<Button variant={"contained"} color="primary" endIcon={<Send />}>
				Update
			</Button>
		</ProfileContainer>
	);
};

export default Profile;
