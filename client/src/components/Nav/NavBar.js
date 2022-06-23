import { useState, memo, useRef } from 'react'
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
import LogoutIcon from '@mui/icons-material/Logout';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import SearchIcon from '@mui/icons-material/Search';

import { useSelector, useDispatch } from 'react-redux';
import { deleteNotification, logoutUser, readNotifications } from '../../features/user/userSlice'

// Styles
import { Search, SearchIconWrapper, StyledInputBase, Banner, ProfileBtn, Offset } from './NavBarStyles';
import DeleteNotif from '../Modal/DeleteNotif';
import MobileDrawer from '../Drawer/MobileDrawer';
import NotificationMenu from '../UI/NotificationMenu';

dayjs.extend(relativeTime);

const NavBar = ({ handleThemeChange, mode }) => {
	const dispatch = useDispatch();
	const [openDrawer, setOpenDrawer] = useState(false);
	const [openDeleteModal, setDeleteModal] = useState(false);
	const [notifId, setNotifId] = useState("");
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const [openNotif, setOpenNotif] = useState(false);
	const notificationAnchorEl = useRef(null);
	const { authenticated, notifications, credentials } = useSelector(store => store.user);

	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

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

	const handleNotificationToggle = () => {
		setOpenNotif(prevOpen => !prevOpen);
	}

	const handleCloseNotification = (event) => {
		const unredNotifications = notifications.filter(notification => !notification.read).map(notification => notification._id);
		if (unredNotifications.length > 0) {
			dispatch(readNotifications({ ids: unredNotifications }));
		}

		if (notificationAnchorEl.current && notificationAnchorEl.current.contains(event.target)) {
			return;
		}

		setOpenNotif(false);
	};


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
			<MenuItem sx={{ display: { sm: 'inline-flex', md: 'none' } }} onClick={handleThemeChange}>
				<IconButton
					size="large"
					onClick={handleThemeChange}
					color="inherit">
					{mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
				</IconButton>
				{mode === 'light' ? <p>Dark mode</p> : <p>Light mode</p>}
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

	const handleOpenDrawer = () => {
		setOpenDrawer(true);
	}

	const handleCloseDrawer = () => {
		setOpenDrawer(false);
	}

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="fixed">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							color="inherit"
							aria-label="menu"
							sx={{ mr: 2, display: { sm: "inline-flex", md: "none" } }}
							onClick={handleOpenDrawer}
						>
							<MenuIcon />
						</IconButton>

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
									<Avatar component={Link} to="/profile" sx={{ width: 24, height: 24, display: { sm: 'flex', md: 'none' }, textDecoration: 'none', marginX: 1 }} src={credentials.img || noMan}>{credentials.fullname[0]}</Avatar>
									<IconButton
										size="large"
										color="inherit"
										onClick={handleThemeChange}
									>
										{mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
									</IconButton>
								</Box>
								<Box>
									<IconButton
										size="large"
										aria-label="notifications"
										color="inherit"
										aria-haspopup="true"
										id="notification-button"
										aria-expanded={openNotif ? "true" : undefined}
										aria-controls={openNotif ? "primary-notification-dropdown" : undefined}
										ref={notificationAnchorEl}
										onClick={handleNotificationToggle}
									>
										{notifications.length > 0 ?
											<Badge badgeContent={notifications.filter(notif => !notif.read).length} color="error">
												<NotificationsIcon />
											</Badge>
											: <NotificationsIcon />
										}
									</IconButton>
								</Box>
								<Box>
									<IconButton
										size="large"
										aria-label="show more"
										aria-controls='primary-search-account-menu-mobile'
										aria-haspopup="true"
										onClick={handleMobileMenuOpen}
										color="inherit"
									>
										<ArrowDropDownIcon />
									</IconButton>
								</Box>
							</>
						) : (
							<>
								<Box sx={{ flexGrow: 1 }} />
								<Box>
									<IconButton
										size="large"
										color="inherit"
										onClick={handleThemeChange}
										sx={{ display: { sm: 'none', md: 'inline-flex' } }}
									>
										{mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
									</IconButton>
								</Box>
							</>
						)}
					</Toolbar>
				</AppBar>
				<NotificationMenu notifications={notifications} anchorRef={notificationAnchorEl} open={openNotif} setOpen={setOpenNotif} handleClose={handleCloseNotification} />
				{/* {renderNotificationDropdown} */}
				{renderDropdownOption}
				<DeleteNotif open={openDeleteModal} handleOpenDeleteModal={handleOpenDeleteModal} handleClose={handleCloseDeleteModal} id={notifId} deleteNotif={deleteNotif} />
				<MobileDrawer openDrawer={openDrawer} handleCloseDrawer={handleCloseDrawer} />
			</Box>
			<Offset />
		</>
	)
}

export default memo(NavBar);