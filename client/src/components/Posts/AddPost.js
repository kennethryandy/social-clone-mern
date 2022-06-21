import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../features/post/postSlice';
import { StyledInput, AddPostButton } from './PostStyled';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

const AddPost = ({ user, loading }) => {
	const dispatch = useDispatch();
	const [postInput, setPostInput] = useState("");

	const handlePostSubmit = () => {
		if (!postInput) {
			return;
		}
		dispatch(createPost({ content: postInput }));
		setPostInput("");
	}

	return (
		<Card sx={{ marginBottom: 3, width: '100%' }}>
			<CardHeader title={<Typography variant="h5" textAlign="center" sx={{ fontWeight: 500 }}>Creat a post</Typography>} />
			<Divider variant="middle" />
			<CardContent>
				<StyledInput onChange={(e) => setPostInput(e.target.value)} value={postInput} placeholder={`What's on your mind, ${user.fullname.split(' ')[0]}?`} rows="2" />
			</CardContent>
			<CardActions>
				<AddPostButton disabled={loading} onClick={handlePostSubmit} size="medium" fullWidth variant="contained">Post</AddPostButton>
			</CardActions>
		</Card >
	)
}

export default AddPost