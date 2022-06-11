import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Post from './Post';


const Posts = () => {
	const { posts } = useSelector(store => store.post);
	return (
		<Box>
			{posts.length > 0 ? (
				posts.map(post => <Post key={post.id} post={post} />)
			) : <p>Nothing</p>}
		</Box>
	)
}

export default Posts