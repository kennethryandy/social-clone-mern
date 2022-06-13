import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Post from './Post';
import CreatePost from './AddPost';


const Posts = () => {
	const { credentials } = useSelector(store => store.user);
	const { posts, loading } = useSelector(store => store.post);

	return (
		<Box>
			<CreatePost user={credentials} loading={loading} />
			{posts.length > 0 ? (
				posts.map(post => <Post key={post._id} post={post} user={credentials} />)
			) : <p>Nothing</p>}
		</Box>
	)
}

export default Posts