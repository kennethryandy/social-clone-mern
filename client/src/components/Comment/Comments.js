import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../../features/post/postSlice';
import { StyledCommentInput, CommentInputWrapper } from './CommentStyled';
import Comment from './Comment'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';


const Comments = ({ post, openComment }) => {
	const dispatch = useDispatch();
	const [commentInput, setCommentInput] = useState("")

	const commentHandleSubmit = (e) => {
		e.preventDefault();
		if (commentInput) {
			dispatch(addComment({ postId: post._id, content: commentInput }));
			setCommentInput("");
		}
	}

	return (
		<>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1, paddingTop: 3, paddingBottom: 3 }}>
				<Avatar aria-label="profile-picture" src={post.creator.img}>{post.creator.fullname}</Avatar>
				<CommentInputWrapper onSubmit={commentHandleSubmit}>
					<StyledCommentInput placeholder="Write a comment..." value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
					<IconButton type='submit'>
						<SendIcon />
					</IconButton>
				</CommentInputWrapper>
			</Box>
			<Divider />
			<Collapse in={openComment} timeout="auto" unmountOnExit>
				<CardContent sx={{ padding: 0, "&:last-child": { padding: 0 } }}>
					{post.comments.map(comment => <Comment key={comment._id} comment={comment} />)}
				</CardContent>
			</Collapse>
		</>
	)
}

export default Comments