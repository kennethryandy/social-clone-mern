import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledCommentInput = styled('input')(({ theme }) => ({
	...theme.typography.body1,
	boxSizing: "border-box",
	width: "-webkit-fill-available",
	borderRadius: "18px",
	padding: "8px 12px",
	margin: "0 12px",
	outline: "none",
	border: "none",
	backgroundColor: theme.palette.mode === "dark" ? "#3A3B3C" : theme.palette.grey.A100,
	color: theme.palette.text.primary
}));

export const CommentInputWrapper = styled('form')(({ theme }) => ({
	flexGrow: 1,
	width: "100%",
	position: "relative",
	"& .MuiButtonBase-root": {
		position: "absolute",
		right: 12,
		top: 0,
		"&:hover": {
			backgroundColor: "transparent",
		}
	}
}));

export const CommentWrapper = styled(Box)(({ theme }) => ({
	paddingTop: theme.spacing(2),
	paddingBottom: theme.spacing(2),
	display: 'flex',
	gap: theme.spacing(2)
}));

export const CommentMessage = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#3A3B3C" : theme.palette.grey.A100,
	padding: `${theme.spacing(1)} 12px`,
	borderRadius: 18,
	"& .comment_creator": {
		color: "inherit",
		fontWeight: 600,
		textDecoration: "none"
	}
}));