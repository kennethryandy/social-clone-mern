import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserDetails, resetUserDetailsUpdated } from '../../features/user/userSlice';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import CheckIcon from '@mui/icons-material/Check';
import CircularProgress from '@mui/material/CircularProgress';

const UpdatedButton = styled(Button)(({ theme }) => ({
	"&.Mui-disabled": {
		color: theme.palette.success.main
	}
}));

const UserDetailsInput = ({ open, setOpen, userDetails, setCurrentUser }) => {
	const dispatch = useDispatch();
	const { loading, userDetailsUpdated } = useSelector(store => store.user);
	const [input, setInput] = useState({
		bio: userDetails.bio || "",
		location: userDetails.location || "",
		website: userDetails.website || ""
	});


	const handleInputChange = (e) => {
		setInput((currentInput) => ({
			...currentInput,
			[e.target.name]: e.target.value
		}));
		if (userDetailsUpdated) {
			dispatch(resetUserDetailsUpdated());
		}
	};

	const handleClose = () => {
		setInput({
			bio: userDetails.bio || "",
			location: userDetails.location || "",
			website: userDetails.website || ""
		});
		setOpen(false);
		if (userDetailsUpdated) {
			dispatch(resetUserDetailsUpdated());
		}
	};

	const saveUserDetails = () => {
		setCurrentUser({
			...userDetails,
			...input
		});
		dispatch(updateUserDetails(input));
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
				<DialogTitle>Update Profile
					<IconButton
						aria-label="close"
						onClick={handleClose}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="normal"
						id="bio"
						label="Bio"
						type="text"
						name="bio"
						fullWidth
						variant="standard"
						value={input.bio}
						onChange={handleInputChange}
						multiline

					/>
					<TextField
						margin="normal"
						id="location"
						label="Location"
						type="text"
						name="location"
						fullWidth
						variant="standard"
						value={input.location}
						onChange={handleInputChange}
					/>
					<TextField
						margin="normal"
						id="website"
						label="Website"
						type="text"
						name="website"
						fullWidth
						variant="standard"
						value={input.website}
						onChange={handleInputChange}
					/>
				</DialogContent>
				<DialogActions>
					{userDetailsUpdated ? (
						<UpdatedButton disabled variant="text" endIcon={<CheckIcon />}>Saved</UpdatedButton>
					) : (
						<Button
							onClick={saveUserDetails}
							endIcon={loading ? <CircularProgress size={24} /> : null}
							disabled={loading || (input.bio === userDetails.bio && input.location === userDetails.location && input.website === userDetails.website)}>
							Save
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default UserDetailsInput