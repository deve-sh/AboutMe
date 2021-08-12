import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
	Button,
	InputAdornment,
	TextField,
	Typography,
	Card,
	CardActions,
	Tooltip,
	IconButton,
} from "@material-ui/core";
import {
	AccountCircle,
	Launch,
	Send,
	Image as ImageIcon,
} from "@material-ui/icons";
import styled from "styled-components";

import { ChromePicker } from "react-color";
import EmojiPicker from "emoji-picker-react";

import Image from "../components/Image";

import { updateStatus } from "../API";
import toasts from "../constants/toastConstants";
import { updateUserDetails } from "../store/actionCreators";

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

	&.splitonsmallscreen {
		@media (max-width: 576px) {
			flex-direction: column;
		}
	}
`;

const CodeBlock = styled(Card)`
	font-family: monospace;
	white-space: pre-wrap;
	padding: 1rem;
	margin: 1rem auto;
	max-width: 400px;
	border-radius: 0.5rem;
	text-align: left;
`;

const CodeBlockAction = styled(CardActions)`
	padding: 0 !important;
	margin-top: 0.75rem;
`;

const StatusImage = React.memo(styled(Image)`
	margin-bottom: 1rem;
`);

const Profile = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state);

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
		let updates = {
			status: userStatus,
			statusEmoji: userStatusEmoji,
			statusOptions: {
				color: userStatusColor,
			},
		};
		updateStatus(state.user.email || state.user.phoneNumber, updates, (err) => {
			setloading(false);
			if (err) return toasts.generateError(err);
			dispatch(updateUserDetails(updates));
			return toasts.generateSuccess("Updated Status");
		});
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
			<StatusImage
				src={`/api/getStatus.svg?identifier=${
					state.user?.email || state.user?.phoneNumber
				}`}
			/>
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
			<Row className="splitonsmallscreen">
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
			<CodeBlock
				style={{ background: "#212121", color: "#ffffff" }}
				elevation={10}
			>
				{JSON.stringify(
					{
						identifier: state.user.email || state.user.phoneNumber,
						isStatusPresent: !!userStatus || false,
						status: userStatus || "No Status",
						statusEmoji: userStatusEmoji || "😁",
						statusColor: userStatusColor || "brightgreen",
					},
					null,
					4
				)}
				<CodeBlockAction>
					<Tooltip title="Get Link To Status">
						<a
							href={`/api/getStatus.json?identifier=${
								state.user.email || state.user.phoneNumber
							}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<IconButton
								disableSpacing
								size="small"
								style={{ color: "#ffffff", padding: 0 }}
							>
								<Launch size="small" />
							</IconButton>
						</a>
					</Tooltip>
					<Tooltip title="Get Status Image">
						<a
							href={`/api/getStatus.svg?identifier=${
								state.user.email || state.user.phoneNumber
							}`}
							target="_blank"
							rel="noopener noreferrer"
						>
							<IconButton
								disableSpacing
								size="small"
								style={{ color: "#ffffff", padding: 0 }}
							>
								<ImageIcon size="small" />
							</IconButton>
						</a>
					</Tooltip>
				</CodeBlockAction>
			</CodeBlock>
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

export default React.memo(Profile);
