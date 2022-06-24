import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import noMan from '../../assets/image/no-man.jpg';
// MUI ICONS
import EditIcon from '@mui/icons-material/Edit';
import FeedIcon from '@mui/icons-material/Feed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
// Styled Components
import { ProfileImg, UserDetail, UserDetailList } from './SideProfStyled';

const SideProfile = () => {
	const { credentials } = useSelector(store => store.user);
	return (
		<>
			<Box sx={{
				display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 3,
				paddingTop: 2
			}}>
				<ProfileImg component={Link} to="/profile">
					<img loading="lazy" src={credentials.img || noMan} alt={credentials.fullname} />
				</ProfileImg>
			</Box>
			<List>
				<ListItem>
					<ListItemButton component={Link} to="/profile">
						<UserDetail primary={credentials.fullname} />
					</ListItemButton>
				</ListItem>
			</List>
			<Divider />
			<UserDetailList>
				{credentials.bio && (
					<ListItem>
						<ListItemIcon>
							<FeedIcon />
						</ListItemIcon>
						<UserDetail className="user-details" primary={credentials.bio} />
					</ListItem>
				)}
				{credentials.location && (
					<ListItem>
						<ListItemIcon>
							<LocationOnIcon />
						</ListItemIcon>
						<UserDetail className="user-details" primary={credentials.location} />
					</ListItem>
				)}
				{credentials.website && (
					<ListItem>
						<ListItemIcon>
							<LanguageIcon />
						</ListItemIcon>
						<UserDetail className="user-details" primary={<Typography variant="body1" component="a" href={credentials.website} target="_blank">{credentials.website}</Typography>} />
					</ListItem>
				)}
				{(!credentials.bio && !credentials.location && !credentials.website) && (
					<ListItem>
						<ListItemButton component={Link} to="/profile">
							<UserDetail primary="Add bio" />
							<IconButton edge="end" aria-label="edit">
								<EditIcon />
							</IconButton>
						</ListItemButton>
					</ListItem>
				)}
			</UserDetailList>
		</>
	)
}

export default SideProfile