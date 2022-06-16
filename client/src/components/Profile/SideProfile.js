import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
// MUI ICONS
import EditIcon from '@mui/icons-material/Edit';
// Styled Components
import { ProfileImg, UserDetail } from './SideProfStyled';

const SideProfile = () => {
	const { credentials } = useSelector(store => store.user);

	return (
		<Paper elevation={3}>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 3 }}>
				<ProfileImg component={Link} to="/profile">
					<img src={credentials.img} alt={credentials.fullname} />
				</ProfileImg>
			</Box>
			<List>
				<ListItem>
					<ListItemButton>
						<UserDetail primary={credentials.fullname} />
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
							<UserDetail primary="Add bio" />
						</ListItemButton>
					</ListItem>
				)}
			</List>
		</Paper>
	)
}

export default SideProfile