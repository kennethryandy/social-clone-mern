import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Paper from '@mui/material/Paper';
// MUI ICONS
import EditIcon from '@mui/icons-material/Edit';
// Styled Components
import { ProfileImg, UserDetail } from './SideProfStyled';
import AddPost from '../Posts/AddPost';
import Post from '../Posts/Post';

const Profile = () => {
	const [userPost, setUserPost] = useState([]);
	const { loading, posts } = useSelector(store => store.post)
	const { credentials } = useSelector(store => store.user);

	useEffect(() => {
		const findUserPost = posts.filter(post => post.creator._id === credentials.id);
		setUserPost(findUserPost);
	}, [setUserPost, credentials.id, posts]);

	return (
		<Container maxWidth="md">
			<Paper elevation={3} sx={{ marginBottom: 3 }}>
				<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 3 }}>
					<ProfileImg>
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
			<Box>
				<AddPost user={credentials} loading={loading} />
				{userPost.length > 0 && !loading ? (
					userPost.map(post => <Post key={post._id} post={post} user={credentials} />)
				) : <p>Nothing</p>}
			</Box>
		</Container>
	)
}

export default Profile