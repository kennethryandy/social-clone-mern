import { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Post from './Post';
import CreatePost from './AddPost';


const Posts = () => {
	const [openComment, setOpenComment] = useState(false);
	const { credentials } = useSelector(store => store.user);
	const { posts, loading } = useSelector(store => store.post);

	return (
		<Box>
			<CreatePost user={credentials} loading={loading} />
			{posts.length > 0 && !loading ? (
				posts.map(post => <Post key={post._id} post={post} user={credentials} openComment={openComment} setOpenComment={setOpenComment} />)
			) : <p>Nothing</p>}
		</Box>
	)
}

export default Posts