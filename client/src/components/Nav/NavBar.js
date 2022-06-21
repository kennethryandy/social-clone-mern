import { useState, memo } from 'react'
import { Link } from 'react-router-dom';
import noMan from '../../assets/image/no-man.jpg';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';

import { useSelector, useDispatch } from 'react-redux';
import { deleteNotification, logoutUser, readNotifications } from '../../features/user/userSlice'

// Styles
import { Search, SearchIconWrapper, StyledInputBase, Banner, ProfileBtn, NotificationMessage, NotificationMenu, NotificationMenuContainer } from './NavBarStyles';
import DeleteNotif from '../Modal/DeleteNotif';

dayjs.extend(relativeTime);

const NavBar = ({ handleThemeChange, mode }) => {
	const dispatch = useDispatch();
	const [openDeleteModal, setDeleteModal] = useState(false);
	const [notifId, setNotifId] = useState("");
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const [notificationAnchorEl, setNotificationAnchorEl] = useState(null)
	const { authenticated, notifications, credentials } = useSelector(store => store.user);

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const isNotificationsOpen = Boolean(notificationAnchorEl);

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleNotificationOpen = e => {
		setNotificationAnchorEl(e.currentTarget);
	}

	const handleNotificationClose = () => {
		setNotificationAnchorEl(null);
		const unredNotifications = notifications.filter(notification => !notification.read).map(notification => notification._id);
		if (unredNotifications.length > 0) {
			dispatch(readNotifications({ ids: unredNotifications }));
		}
	}

	const deleteNotif = () => {
		dispatch(deleteNotification(notifId));
		setNotifId("");
		setDeleteModal(false);
	};

	const handleOpenDeleteModal = (id) => {
		setDeleteModal(true);
		setNotifId(id)
	}

	const handleCloseDeleteModal = () => {
		setNotifId("");
		setDeleteModal(false);
	}

	const renderDropdownOption = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			id='primary-search-account-menu-mobile'
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem component={Link} to="/profile">
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
			<MenuItem sx={{ display: { sm: 'inline-flex', md: 'none' } }}>
				<IconButton
					size="large"
					onClick={handleThemeChange}
					color="inherit">
					{mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
				</IconButton>
				{mode === 'light' ? <p>Light mode</p> : <p>Dark mode</p>}
			</MenuItem>
			<MenuItem
				onClick={() => {
					handleMobileMenuClose();
					dispatch(logoutUser());
				}}
			>
				<IconButton
					size="large"
					aria-label="logout current user"
					aria-controls="logout-current-user"
					aria-haspopup="true"
					color="inherit"
				>
					<LogoutIcon />
				</IconButton>
				<p>Logout</p>
			</MenuItem>
		</Menu>
	);

	const renderNotificationDropdown = (
		<NotificationMenuContainer
			anchorEl={notificationAnchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			id="primary-notification-dropdown"
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isNotificationsOpen}
			onClose={handleNotificationClose}
		>
			{notifications.length > 0 ? (
				notifications.map(notification => (
					<NotificationMenu component={Link} to={`/post/${notification.post}`} key={notification._id} className={notification.read ? "" : "unread"}>
						<NotificationMessage
							avatar={
								<Avatar src={notification.sender.img}>
									{notification.sender.fullname[0]}
								</Avatar>
							}
							action={
								<IconButton aria-label="delete" onClick={() => handleOpenDeleteModal(notification._id)}>
									<DeleteIcon />
								</IconButton>
							}
							title={`${notification.sender.fullname} ${notification.type === "comment" ? notification.type + "e" : notification.type}d your post.`}
							subheader={dayjs(notification.createdAt).fromNow()}
						/>
					</NotificationMenu>
				))
			) : (
				<MenuItem disabled>
					<MenuItem>No message notification!</MenuItem>
				</MenuItem>
			)}
		</NotificationMenuContainer>
	);


	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Banner
						variant="h6"
						noWrap
						component={Link}
						to="/"
					>
						SC
					</Banner>
					{authenticated ? (
						<Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{ 'aria-label': 'search' }}
							/>
						</Search>
					) : null}
					{authenticated ? (
						<>
							<Box sx={{ flexGrow: 1 }} />
							<Box sx={{ display: 'flex', alignItems: 'center' }}>
								<ProfileBtn component={Link} to="/profile" variant="contained" disableElevation color="info" startIcon={<Avatar sx={{ width: 24, height: 24 }} src={credentials?.img || noMan}>{credentials.fullname[0]}</Avatar>}>
									{credentials.fullname}
								</ProfileBtn>
								<Avatar component={Link} to="/profile" sx={{ width: 24, height: 24, display: { sm: 'flex', md: 'none' } }}>{credentials.fullname[0]}</Avatar>
								<IconButton
									size="large"
									color="inherit"
									onClick={handleThemeChange}
									sx={{ display: { sm: 'none', md: 'inline-flex' } }}
								>
									{mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
								</IconButton>
							</Box>
							<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
								<IconButton
									size="large"
									aria-label="notifications"
									color="inherit"
									onClick={handleNotificationOpen}
									aria-haspopup="true"
									aria-controls="primary-notification-dropdown"
								>
									{notifications.length > 0 ?
										<Badge badgeContent={notifications.filter(notif => !notif.read).length} color="error">
											<NotificationsIcon />
										</Badge>
										: <NotificationsIcon />
									}
								</IconButton>
								<IconButton
									size="large"
									edge="end"
									aria-label="options"
									aria-controls='primary-search-account-menu'
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="inherit"
								>
									<ArrowDropDownIcon />
								</IconButton>
							</Box>
							<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
								<IconButton
									size="large"
									aria-label="show more"
									aria-controls='primary-search-account-menu-mobile'
									aria-haspopup="true"
									onClick={handleMobileMenuOpen}
									color="inherit"
								>
									<MoreIcon />
								</IconButton>
							</Box>
						</>
					) : null}
				</Toolbar>
			</AppBar>
			{renderNotificationDropdown}
			{renderDropdownOption}
			<DeleteNotif open={openDeleteModal} handleClose={handleCloseDeleteModal} id={notifId} deleteNotif={deleteNotif} />
		</Box>
	)
}

export default memo(NavBar);