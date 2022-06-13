import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../features/post/postSlice';
import { PostPaperStyled, PostCreatorHeaderStyled, StyledPostButton } from './PostStyled';
import Comment from '../Comment/Comments';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Divider from '@mui/material/Divider';
// import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// MUI ICON
import CommentIcon from '@mui/icons-material/Comment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

dayjs.extend(relativeTime);

const Post = ({ post, user }) => {
	const dispatch = useDispatch();
	const [openComment, setOpenComment] = useState(true);

	const commentClickHandler = () => {
		setOpenComment(!openComment);
	}

	const likeUnlikePost = () => {
		const isLiked = post.likes.findIndex(like => like.creator._id === user.id);
		if (isLiked !== -1) {
			dispatch(unlikePost(post._id));
		} else {
			dispatch(likePost(post._id));
		}
	}

	return (
		<PostPaperStyled elevation={3}>
			<PostCreatorHeaderStyled
				avatar={
					<Avatar aria-label="profile-picture" src={post.creator.img}>{post.creator.fullname}</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={post.creator.fullname}
				subheader={dayjs(post.createdAt).fromNow()}
			/>
			<CardContent>
				{post.img ? null : <Typography variant={post.content.length < 32 ? "h5" : "body1"} component="p">{post.content}</Typography>}
			</CardContent>
			<CardContent sx={{ paddingY: 1, display: 'flex', gap: 1 }}>

				{post.likes.length > 0 &&
					<>
						<ThumbUpIcon color="primary" fontSize='small' />
						<Typography variant="caption">{post.likes.length}</Typography>
					</>}
			</CardContent>
			<Divider />
			<CardActions>
				<StyledPostButton
					size="small"
					startIcon={<ThumbUpIcon color="inherit" />}
					onClick={likeUnlikePost}
					className={post.likes.findIndex(like => like.creator._id === user.id) !== -1 ? "active" : ""}
				>
					Like
				</StyledPostButton>
				<StyledPostButton
					size="small"
					startIcon={<CommentIcon color="inherit" />}
					onClick={commentClickHandler}
					className={openComment ? "active" : ""}
				>
					View Comments
				</StyledPostButton>
			</CardActions>
			<Divider />
			<Comment post={post} openComment={openComment} />
		</PostPaperStyled>
	)
}

export default Post