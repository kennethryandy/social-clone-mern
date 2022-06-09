import { useState, memo } from 'react'
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useSelector } from 'react-redux';

// Styles
import { Search, SearchIconWrapper, StyledInputBase, Banner, ProfileBtn, MobileMenu } from './NavBarStyles';

const NavBar = ({ darkMode }) => {
	// const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const { authenticated } = useSelector(store => store.user);

	// const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	// const handleProfileMenuOpen = (event) => {
	// 	setAnchorEl(event.currentTarget);
	// };

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	// const handleMenuClose = () => {
	// 	setAnchorEl(null);
	// 	handleMobileMenuClose();
	// };

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const menuId = 'primary-search-account-menu';

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<MobileMenu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={17} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem
			// onClick={handleProfileMenuOpen}
			>
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
		</MobileMenu>
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
							<Box sx={{ display: 'flex' }}>
								<ProfileBtn variant="contained" disableElevation color="info" startIcon={<Avatar sx={{ width: 24, height: 24 }}>K</Avatar>}>
									Kenneth
								</ProfileBtn>
								<IconButton
									size="large"
									color="inherit"
								>
									{!darkMode ? <DarkModeIcon /> : <LightModeIcon />}
								</IconButton>
							</Box>
							<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
								<IconButton
									size="large"
									aria-label="show 17 new notifications"
									color="inherit"
								>
									<Badge badgeContent={17} color="error">
										<NotificationsIcon />
									</Badge>
								</IconButton>
								<IconButton
									size="large"
									edge="end"
									aria-label="options"
									aria-controls={menuId}
									aria-haspopup="true"
									// onClick={handleProfileMenuOpen}
									color="inherit"
								>
									<ArrowDropDownIcon />
								</IconButton>
							</Box>
							<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
								<IconButton
									size="large"
									aria-label="show more"
									aria-controls={mobileMenuId}
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
			{renderMobileMenu}
		</Box>
	)
}

export default memo(NavBar);