import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Post from './Post';
import Dialog from '@mui/material/Dialog';

const SinglePostDialog = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { credentials } = useSelector(store => store.user);
	const { posts } = useSelector(store => store.post)
	const [open, setOpen] = useState(false);
	const [post, setPost] = useState({});
	const params = useParams();

	useEffect(() => {
		if (params?.postId && posts.length > 0) {
			const postQuery = posts.find(post => post._id === params.postId);
			if (postQuery) {
				setPost(postQuery);
				setOpen(true);
			}
		}

	}, [params, posts]);

	const handleClosePostDialog = () => {
		setOpen(false);
		setPost({});
		navigate("/", { state: { from: location }, replace: true });
	}

	return (
		<Dialog open={open} onClose={handleClosePostDialog} maxWidth="md" fullWidth PaperComponent="div">
			{Object.keys(post).length !== 0 && <Post post={post} user={credentials} showComment={true} dialog={true} handleClosePostDialog={handleClosePostDialog} />}
		</Dialog>
	)
}

export default SinglePostDialog