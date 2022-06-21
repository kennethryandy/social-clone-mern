import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import SendIcon from '@mui/icons-material/Send';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import SideProfile from '../Profile/SideProfile';

const MobileDrawer = ({ openDrawer, handleCloseDrawer }) => {
	const [isAuth] = useAuth();
	const navigate = useNavigate();

	const handleHistoryChange = (to) => {
		navigate(to);
		handleCloseDrawer();
	}

	return (
		<Drawer
			open={openDrawer}
			onClose={handleCloseDrawer}
			sx={{
				"& .MuiPaper-root": {
					padding: isAuth ? 2 : 0,
					paddingY: isAuth ? 0 : 2,
					minWidth: 160,
					maxWidth: "50%",
					width: "100%"
				}
			}}
		>
			{isAuth ? (<SideProfile />) : (
				<Box sx={{ width: '100%' }}>
					<List>
						<ListItem disablePadding sx={{ marginBottom: 2 }}>
							<ListItemText primary="Social Clone" sx={{ textAlign: "center" }} />
						</ListItem>
						<Divider />
						<ListItem>
							<ListItemButton onClick={() => handleHistoryChange('/login')}>
								<ListItemText primary="Login" />
								<ListItemIcon>
									<SendIcon />
								</ListItemIcon>
							</ListItemButton>
						</ListItem>
						<ListItem>
							<ListItemButton onClick={() => handleHistoryChange('/register')}>
								<ListItemText primary="Register" />
								<ListItemIcon>
									<SendIcon />
								</ListItemIcon>
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			)}
		</Drawer>
	)
}

export default MobileDrawer