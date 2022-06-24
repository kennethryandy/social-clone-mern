import { styled, lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import CardHeader from '@mui/material/CardHeader';

export const StyledEmojiWrapper = styled(Box)`
	zIndex: 9999;
`

export const TooltipList = styled('ul')`
	margin: 0;
	padding: 0;
	list-style-type: none;
`;

export const NotificationMenuItem = styled(MenuItem)(({ theme }) => ({
	"&.unread": {
		backgroundColor: theme.palette.mode === "dark" ? theme.palette.neutral.main : lighten(theme.palette.primary.main, 0.8),
		color: theme.palette.primary.main
	},
	"&:hover": {
		backgroundColor: theme.palette.mode === "dark" ? lighten(theme.palette.neutral.main, 0.2) : lighten(theme.palette.primary.light, 0.6)
	}
}));

export const NotificationMessage = styled(CardHeader)(({ theme }) => ({
	padding: `${theme.spacing(1)} 0px`,
	width: "100%",
	textDecoration: "none",
	color: "inherit",
	"& .MuiCardHeader-title": {
		whiteSpace: "normal",
		wordBreak: "break-all"
	}
}));