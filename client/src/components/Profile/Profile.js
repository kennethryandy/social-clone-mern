import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getUserById, updateProfilePicture, setPreviewProfileImage } from '../../features/user/userSlice';
import UserDetailsInput from '../Modal/UserDetailsInput';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import noMan from '../../assets/image/no-man.jpg';
// MUI ICONS
import EditIcon from '@mui/icons-material/Edit';
import FeedIcon from '@mui/icons-material/Feed';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LanguageIcon from '@mui/icons-material/Language';
// Styled Components
import { ProfileImg, UserDetail } from './SideProfStyled';
import AddPost from '../Posts/AddPost';
import Post from '../Posts/Post';

const Profile = () => {
	const [isCurrentUser, setIsCurrentUser] = useState(true);
	const [editUserDetail, setEditUserDetail] = useState(false);
	const [userPost, setUserPost] = useState([]);
	const { loading, posts } = useSelector(store => store.post)
	const { credentials, user, loading: userLoading, loadingProfilePicture, previewProfileImage } = useSelector(store => store.user);
	const [currentUser, setCurrentUser] = useState(credentials);
	const inputFileRef = useRef(null);
	const params = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		let id = credentials.id;
		if (params.id) {
			id = params.id;
			dispatch(getUserById(params.id));
			setCurrentUser(user);
			setIsCurrentUser(false)
		} else {
			setCurrentUser(credentials);
		}
		const findUserPost = posts.filter(post => post.creator._id === id);
		setUserPost(findUserPost);
	}, [setUserPost, credentials, posts, params, dispatch, user]);

	const handleProfileEditButtonClick = () => {
		inputFileRef.current.click();
	};

	const handleProfileImageChange = (e) => {
		if (e.target.files.length > 0) {
			const image = e.target.files[0];
			const formData = new FormData();
			formData.append('file', image, image.name);
			dispatch(setPreviewProfileImage(URL.createObjectURL(image)));
			dispatch(updateProfilePicture(formData));
		}
	};


	return (
		<>
			{isCurrentUser && <input type="file" name="file" ref={inputFileRef} accept="image/png, image/jpeg" hidden onChange={handleProfileImageChange} />}
			<Container maxWidth="md">
				<Paper elevation={3} sx={{ marginBottom: 3 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 3 }}>
						<ProfileImg className={isCurrentUser ? loadingProfilePicture && previewProfileImage ? "edit-profile preview" : "edit-profile" : ""}>
							{loadingProfilePicture && previewProfileImage ? (
								<img className="preview-profile-image" src={previewProfileImage} alt={currentUser.fullname} />
							) : (
								<img src={currentUser.img || noMan} alt={currentUser.fullname} />
							)}
							{isCurrentUser &&
								<IconButton className="edit-profile-icon-button" onClick={handleProfileEditButtonClick}>
									<EditIcon />
								</IconButton>}
						</ProfileImg>
					</Box>
					<List>
						<ListItem>
							<UserDetail primary={currentUser.fullname} />
						</ListItem>
					</List>
					<Divider />
					<List sx={{ maxWidth: "200px", margin: "auto" }}>
						{currentUser.bio && (
							<ListItem>
								<ListItemIcon>
									<FeedIcon />
								</ListItemIcon>
								<UserDetail className="user-details" primary={currentUser.bio} />
							</ListItem>
						)}
						{currentUser.location && (
							<ListItem>
								<ListItemIcon>
									<LocationOnIcon />
								</ListItemIcon>
								<UserDetail className="user-details" primary={currentUser.location} />
							</ListItem>
						)}
						{currentUser.website && (
							<ListItem>
								<ListItemIcon>
									<LanguageIcon />
								</ListItemIcon>
								<UserDetail className="user-details" primary={currentUser.website} />
							</ListItem>
						)}
						{isCurrentUser && (
							<ListItem>
								<ListItemButton onClick={() => setEditUserDetail(true)}>
									<UserDetail primary="Edit" />
								</ListItemButton>
							</ListItem>
						)}
					</List>
				</Paper>
				<Box>
					{credentials.id === currentUser.id &&
						<AddPost user={credentials} loading={loading} />}
					{userPost.length > 0 && !loading ? (
						userPost.map(post => <Post key={post._id} post={post} user={currentUser} />)
					) : (
						<Paper>
							<Typography variant="h6" textAlign="center" gutterBottom>No Posts</Typography>
						</Paper>
					)}
				</Box>
			</Container>
			<UserDetailsInput open={editUserDetail} setOpen={setEditUserDetail} userDetails={currentUser} setCurrentUser={setCurrentUser} />
		</>
	)
}

export default Profile