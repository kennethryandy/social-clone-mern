import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
// MUI ICONS
import EditIcon from '@mui/icons-material/Edit';
// Styled Components
import { ProfileImg, UserDetail } from './SideProfStyled';
import { Paper } from '@mui/material';

const SideProfile = () => {
	const { credentials } = useSelector(store => store.user);
	console.log(credentials);
	return (
		<Paper elevation={3}>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 3 }}>
				<ProfileImg>
					<img src={credentials.img} alt={credentials.fullname} />
				</ProfileImg>
			</Box>
			<List>
				<ListItem>
					<ListItemButton>
						<UserDetail primary={credentials.fullname} autoCapitalize />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
			<List>
				{credentials.bio ? (<>sds</>) : (
					<ListItem
						secondaryAction={
							<IconButton edge="end" aria-label="edit">
								<EditIcon />
							</IconButton>
						}>
						<ListItemButton>
							<UserDetail primary="Add bio" autoCapitalize />
						</ListItemButton>
					</ListItem>
				)}
			</List>
		</Paper>
	)
}

export default SideProfile