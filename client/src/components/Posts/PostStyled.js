import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

export const PostPaperStyled = styled(Card)(({ theme }) => ({
	width: "100%",
	borderRadius: "max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px",
	boxSizing: "border-box",
	padding: theme.spacing(2),
	marginBottom: theme.spacing(3),
	overflow: "visible"
}))

export const PostCreatorHeaderStyled = styled(CardHeader)(({ theme }) => ({
	padding: 0,
	"& .MuiTypography-root>a": {
		color: "inherit",
		textDecoration: "none",
		"&:hover": {
			textDecoration: "underline"
		}
	}
}));

export const AddPostInputWrapper = styled(CardContent)`
	position: relative;
	& .emoji,.photo {
		position: absolute;
		top: 50%;
		right: 24px;
		transform: translateY(-50%);
		display: none;
		&.show {
			display: inline-flex;
		}
	}
	& .photo {
		right: 60px;
	}
`;

export const StyledCardMedia = styled(CardMedia)`
	max-width: 420px;
	max-height: 600px;
	height: 100%;
	padding-bottom: 16px;
	margin: auto;
`;

export const StyledInput = styled('textarea')(({ theme }) => ({
	...theme.typography.h5,
	boxSizing: "border-box",
	width: "100%",
	border: 0,
	outline: 0,
	resize: "none",
	padding: theme.spacing(2),
	borderRadius: theme.spacing(2),
	backgroundColor: theme.palette.mode === "dark" ? "#3A3B3C" : "transparent",
	color: theme.palette.text.primary
}));

export const StyledPostButton = styled(Button)(({ theme }) => ({
	color: theme.palette.grey.A700,
	"&.active": {
		color: theme.palette.mode === "dark" ? theme.palette.neutral.light : theme.palette.primary.main
	}
}));

export const AddPostButton = styled(Button)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? theme.palette.neutral.light : theme.palette.primary.main,
	"&:hover": {
		backgroundColor: theme.palette.mode === "dark" ? theme.palette.neutral.main : theme.palette.primary.dark
	}
}));