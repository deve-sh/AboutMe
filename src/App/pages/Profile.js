import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
	Button,
	InputAdornment,
	TextField,
	Typography,
} from "@material-ui/core";
import { AccountCircle, Send } from "@material-ui/icons";
import styled from "styled-components";

import { ChromePicker } from "react-color";
import EmojiPicker from "emoji-picker-react";

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

const CenterAlignContainer = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
	flex-flow: column;
	padding: 1rem;
`;

const Row = styled.div`
	align-items: center;
	display: flex;
	justify-content: center;
	margin-bottom: 1rem;
`;

const Profile = (props) => {
	let state = useSelector((state) => state);

	const [loading, setloading] = useState(false);
	const [userStatus, setuserStatus] = useState(state.user?.status || "");
	const [userStatusEmoji, setuserStatusEmoji] = useState(
		state.user?.statusEmoji || "😁"
	);
	const [userStatusColor, setuserStatusColor] = useState(
		state.user?.statusOptions?.color || "#66ff00"
	);

	const updateProfileStatus = (event) => {
		event.preventDefault();
		setloading(true);
		updateStatus(
			state.user.email || state.user.phoneNumber,
			{
				status: userStatus,
				statusEmoji: userStatusEmoji,
				statusOptions: {
					color: userStatusColor,
				},
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
			<Row>
				<TextField
					id="status-textfield"
					label="Status"
					variant="outlined"
					placeholder="Ex: Out For Lunch"
					onChange={(e) => {
						e.persist();
						if (e.target?.value?.length > 20) return;
						setuserStatus(e.target.value);
					}}
					value={userStatus}
					disabled={loading}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AccountCircle />
							</InputAdornment>
						),
					}}
				/>
				<Typography color="textSecondary" style={{ marginLeft: "1rem" }}>
					{userStatus.length} / 20
				</Typography>
			</Row>
			<Row>
				<CenterAlignContainer>
					<Row>
						<Typography
							gutterBottom
							color="textSecondary"
							style={{ fontWeight: 600 }}
						>
							Selected Emoji:
						</Typography>
						{userStatusEmoji}
					</Row>
					<EmojiPicker
						onEmojiClick={(_, emojiObject) => {
							console.log(emojiObject);
							setuserStatusEmoji(emojiObject.emoji);
						}}
						disableAutoFocus={true}
						groupNames={{ smileys_people: "PEOPLE" }}
						native
					/>
				</CenterAlignContainer>
				<CenterAlignContainer>
					<Typography color="textSecondary">Status Badge Colour</Typography>
					<ChromePicker
						color={userStatusColor}
						onChangeComplete={(color) => setuserStatusColor(color.hex)}
					/>
				</CenterAlignContainer>
			</Row>
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
