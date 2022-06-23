import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';

export const ProfileImgWrapper = styled(Box)(({ theme }) => ({
	position: "relative",
	"& .edit-profile-icon-button": {
		opacity: 0,
		transition: theme.transitions.create(['opacity'], {
			duration: theme.transitions.duration.standard,
		}),
		position: "absolute",
		top: 32,
		right: 32
	},
	"&:hover .edit-profile-icon-button": {
		opacity: 1
	},
}));

export const ProfileImg = styled(Button)(({ theme }) => ({
	borderRadius: "50%",
	overflow: "hidden",
	maxHeight: 240,
	maxWidth: 240,
	width: "100%",
	height: "100%",
	"&.preview": {
		userSelect: "none",
		pointerEvents: "none",
		cursor: "default",
		"& .edit-profile-icon-button": {
			display: "none"
		}
	},
	"& img": {
		width: "100%",
		height: "auto",
		borderRadius: "50%",
		minWidth: 240,
		"&.preview-profile-image": {
			opacity: .6,
			userSelect: "none",
			pointerEvents: "none",
			cursor: "default"
		}
	},
	[theme.breakpoints.down('md')]: {
		maxWidth: 160,
		maxHeight: 160,
		"& img": {
			minWidth: 160
		}
	}
}));

export const UserDetail = styled(ListItemText)(({ theme }) => ({
	textAlign: "center",
	"&.user-details": {
		textAlign: "left",
		"& a": {
			textDecoration: "none",
			color: "inherit",
		}
	},
	"& .MuiTypography-root": {
		fontWeight: 500,
	}
}));