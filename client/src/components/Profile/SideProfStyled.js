import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';

export const ProfileImg = styled(Button)(({ theme }) => ({
	borderRadius: "50%",
	overflow: "hidden",
	maxHeight: "240px",
	maxWidth: "240px",
	width: "100%",
	height: "100%",
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
	"&.edit-profile": {
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
		"&.preview": {
			userSelect: "none",
			pointerEvents: "none",
			cursor: "default",
			"& .edit-profile-icon-button": {
				display: "none"
			}
		}
	}
}));

export const UserDetail = styled(ListItemText)(({ theme }) => ({
	textAlign: "center",
	"&.user-details": {
		textAlign: "left"
	},
	"& .MuiTypography-root": {
		fontWeight: 500,
	}
}));