import { useState, useEffect, useRef } from 'react';
import useFecthData from '../../hooks/useFecthData';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfilePicture, setPreviewProfileImage, setUser } from '../../features/user/userSlice';
import { setUserPosts } from '../../features/post/postSlice';
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
// Components
import { ProfileImg, ProfileImgWrapper, UserDetail } from './SideProfStyled';
import { ProfileSkeleton, PostSkeleton } from '../Skeletons'
import AddPost from '../Posts/AddPost';
import Post from '../Posts/Post';


const Profile = () => {
	const params = useParams();
	const dispatch = useDispatch();
	const [editUserDetail, setEditUserDetail] = useState(false);
	const { loading: postLoading, userPosts } = useSelector(store => store.post)
	const { credentials, user, loadingProfilePicture, previewProfileImage } = useSelector(store => store.user);
	const inputFileRef = useRef(null);
	const [isCurrentUser, setIsCurrentUser] = useState(true);

	const { data, loading: loadingData } = useFecthData(`https://social-clone-api-v2.herokuapp.com/api/user/${params?.id || credentials.id}`);

	useEffect(() => {
		if (data && data?.success) {
			dispatch(setUser({ ...data.user, posts: null }));
			dispatch(setUserPosts(data.user.posts));
		}
		if (params.id && (credentials.id !== params.id)) {
			setIsCurrentUser(false);
		}
		return () => {
			dispatch(setUser({}));
			dispatch(setUserPosts([]));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);


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
				{!loadingData ? (
					<Paper elevation={3} sx={{ marginBottom: 3 }}>
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 3, paddingTop: 2 }}>
							<ProfileImgWrapper>
								<ProfileImg className={isCurrentUser ? loadingProfilePicture && previewProfileImage ? "preview" : "" : ""}>
									{loadingProfilePicture && previewProfileImage ? (
										<img className="preview-profile-image" src={previewProfileImage} alt={user.fullname} />
									) : (
										<img src={user.img || noMan} alt={user.fullname} />
									)}
								</ProfileImg>
								{isCurrentUser &&
									<IconButton className="edit-profile-icon-button" onClick={handleProfileEditButtonClick}>
										<EditIcon />
									</IconButton>}
							</ProfileImgWrapper>
						</Box>
						<List>
							<ListItem>
								<UserDetail primary={user.fullname} />
							</ListItem>
						</List>
						{user.bio && user.location && user.website && <Divider />}
						<List sx={{ maxWidth: "200px", margin: "auto" }}>
							{user.bio && (
								<ListItem>
									<ListItemIcon>
										<FeedIcon />
									</ListItemIcon>
									<UserDetail className="user-details" primary={user.bio} />
								</ListItem>
							)}
							{user.location && (
								<ListItem>
									<ListItemIcon>
										<LocationOnIcon />
									</ListItemIcon>
									<UserDetail className="user-details" primary={user.location} />
								</ListItem>
							)}
							{user.website && (
								<ListItem>
									<ListItemIcon>
										<LanguageIcon />
									</ListItemIcon>
									<UserDetail className="user-details" primary={user.website} />
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
				) : <ProfileSkeleton />}
				{!loadingData ? (
					<Box>
						{credentials.id === user.id &&
							<AddPost user={credentials} loading={postLoading} />}
						{userPosts.length > 0 ? (
							userPosts.map(post => <Post key={post._id} post={post} user={credentials} />)
						) : (
							<Paper>
								<Typography variant="h6" textAlign="center" gutterBottom>No Posts</Typography>
							</Paper>
						)}
					</Box>
				) : <PostSkeleton />}
			</Container>

			<UserDetailsInput open={editUserDetail} setOpen={setEditUserDetail} userDetails={user} />
		</>
	)
}

export default Profile