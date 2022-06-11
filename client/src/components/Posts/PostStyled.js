import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

export const PostPaperStyled = styled(Card)(({ theme }) => ({
	width: "100%",
	borderRadius: "max(0px, min(8px, calc((100vw - 4px - 100%) * 9999))) / 8px",
	padding: theme.spacing(2),
	marginBottom: theme.spacing(3)
}))

export const PostCreatorHeaderStyled = styled(CardHeader)(({ theme }) => ({
	padding: 0
}));