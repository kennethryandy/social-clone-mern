import { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Post from './Post';
import CreatePost from './AddPost';
import { Paper, Typography } from '@mui/material';


const Posts = () => {
	const [openComment, setOpenComment] = useState(false);
	const { credentials } = useSelector(store => store.user);
	const { posts, loading } = useSelector(store => store.post);

	return (
		<Box>
			<CreatePost user={credentials} loading={loading} />
			{posts.length > 0 && !loading ? (
				posts.map(post => <Post key={post._id} post={post} user={credentials} openComment={openComment} setOpenComment={setOpenComment} />)
			) : (
				<Paper>
					<Typography variant="h6" textAlign="center" gutterBottom>No Posts</Typography>
				</Paper>
			)}
		</Box>
	)
}

export default Posts