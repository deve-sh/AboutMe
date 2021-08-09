import React, { useEffect, useState } from "react";
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

import { updateStatus } from "../API";
import toasts from "../constants/toastConstants";

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

	const [loading, setloading] = useState(false);
	const [userStatus, setuserStatus] = useState(state.user?.status || "");
	const [userStatusEmoji, setuserStatusEmoji] = useState(
		state.user?.statusEmoji || "😁"
	);

	const updateProfileStatus = (event) => {
		event.preventDefault();
		setloading(true);
		updateStatus(
			state.user.email || state.user.phoneNumber,
			{
				status: userStatus,
				statusEmoji: userStatusEmoji,
				statusOptions: {},
			},
			(err) => {
				setloading(false);
				if (err) return toasts.generateError(err);
				return toasts.generateSuccess("Updated Status");
			}
		);
	};

	useEffect(() => {
		setuserStatus(state.user?.status || "");
		setuserStatusEmoji(state.user?.statusEmoji || "😁");
	}, [state.user?.status, state.user?.statusEmoji]);

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
				value={userStatus}
				disabled={loading}
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
				disabled={loading}
				onChange={(e) => {
					e.persist();
					setuserStatusEmoji(e.target.value);
				}}
				value={userStatusEmoji}
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
			<Button
				onClick={updateProfileStatus}
				variant={"contained"}
				color="primary"
				endIcon={<Send />}
				disabled={loading}
			>
				Update
			</Button>
		</ProfileContainer>
	);
};

export default Profile;
