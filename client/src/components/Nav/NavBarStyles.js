import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export const Offset = styled('div')(({ theme }) => ({
	...theme.mixins.toolbar
}))

export const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: 999,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
	[theme.breakpoints.down('md')]: {
		display: 'none'
	}
}));

export const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

export const Banner = styled(Typography)(() => ({
	"&:hover": {
		cursor: 'pointer'
	},
	fontWeight: 'bold',
	textDecoration: 'none',
	color: '#e9ebee'
}));

export const ProfileBtn = styled(Button)(({ theme }) => ({
	color: theme.palette.primary.contrastText,
	borderRadius: 99,
	border: 'none',
	backgroundColor: 'transparent',
	"&:hover": {
		backgroundColor: theme.palette.primary.light
	},
	[theme.breakpoints.down('md')]: {
		display: 'none'
	}
}));
