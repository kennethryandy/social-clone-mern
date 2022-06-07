import { styled } from '@mui/material/styles';


export const AppBarSpacer = (styled)('div')(({ theme }) => ({
	...theme.mixins.toolbar
}));