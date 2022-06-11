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
	}
}));

export const UserDetail = styled(ListItemText)(({ theme }) => ({
	textAlign: "center",
	"& .MuiTypography-root": {
		fontWeight: 500,
	}
}));