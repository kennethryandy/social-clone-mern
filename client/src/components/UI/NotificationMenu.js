import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import DeleteIcon from '@mui/icons-material/Delete';

import { NotificationMessage, NotificationMenuItem } from './Styled';
import Typography from '@mui/material/Typography';


dayjs.extend(relativeTime);


const NotificationMenu = ({ notifications, open, setOpen, anchorRef, handleClose, handleOpenDeleteModal }) => {

	const handleListKeyDown = (event) => {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		} else if (event.key === 'Escape') {
			setOpen(false);
		}
	}

	return (
		<Popper
			open={open}
			anchorEl={anchorRef.current}
			role={undefined}
			placement="bottom-start"
			transition
			disablePortal
			sx={{ zIndex: 9999, maxWidth: '90vw' }}
		>
			{({ TransitionProps }) => (
				<Grow
					{...TransitionProps}
					style={{
						transformOrigin: 'right top',
					}}
				>
					<Paper>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList
								autoFocusItem={open}
								id="primary-notification-dropdown"
								aria-labelledby="notification-button"
								onKeyDown={handleListKeyDown}
								dense
							>
								{notifications.length > 0 ? (
									notifications.map(notification => (
										<NotificationMenuItem key={notification._id} className={notification.read ? "" : "unread"}>
											<NotificationMessage
												component={Link} to={`/post/${notification.post}`}
												onClick={handleClose}
												avatar={
													<Avatar src={notification.sender.img}>
														{notification.sender.fullname[0]}
													</Avatar>
												}
												title={`${notification.sender.fullname} ${notification.type === "comment" ? notification.type + "ed on your post." : notification.type + "d your post."}`}
												subheader={dayjs(notification.createdAt).fromNow()}
											/>
											<IconButton aria-label="delete" onClick={() => handleOpenDeleteModal(notification._id)}>
												<DeleteIcon />
											</IconButton>
										</NotificationMenuItem>
									))
								) : (
									<MenuItem disabled>
										<Typography textAlign="center" width="100%">No message notification!</Typography>
									</MenuItem>
								)}
							</MenuList>
						</ClickAwayListener>
					</Paper>
				</Grow>
			)}
		</Popper>
	)
}

export default NotificationMenu