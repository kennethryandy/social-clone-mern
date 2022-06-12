import { useState } from 'react'
import { PostPaperStyled, PostCreatorHeaderStyled, StyledPostButton, StyledCommentInput, CommentInputWrapper } from './PostStyled';
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

const Post = ({ post }) => {
	const [openComment, setOpenComment] = useState(true);

	const commentClickHandler = () => {
		setOpenComment(!openComment);
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
			<Divider />
			<CardActions>
				<StyledPostButton
					size="small"
					startIcon={<ThumbUpIcon color="inherit" />}
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