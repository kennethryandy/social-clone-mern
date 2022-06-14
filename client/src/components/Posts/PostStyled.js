import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

export const PostPaperStyled = styled(Card)(({ theme }) => ({
	width: "100%",
	borderRadius: "max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px",
	boxSizing: "border-box",
	padding: theme.spacing(2),
	marginBottom: theme.spacing(3)
}))

export const PostCreatorHeaderStyled = styled(CardHeader)(({ theme }) => ({
	padding: 0
}));

export const StyledInput = styled('textarea')(({ theme }) => ({
	...theme.typography.h5,
	width: "100%",
	border: 0,
	outline: 0,
	resize: "none"
}));

export const StyledPostButton = styled(Button)(({ theme }) => ({
	// color: theme.palette.primary.light
	color: theme.palette.grey.A700,
	"&.active": {
		color: theme.palette.primary.main
	}
}));