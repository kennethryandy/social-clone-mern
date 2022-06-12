import { useState } from 'react'
import { PostPaperStyled, PostCreatorHeaderStyled, StyledPostButton } from './PostStyled';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Divider from '@mui/material/Divider';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

dayjs.extend(relativeTime);

const Post = ({ post }) => {
	const [openComment, setOpenComment] = useState(false);

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
				{post.img ? null : <Typography sx={{ fontWeight: 500 }} variant={post.content.length < 12 ? "h5" : "body1"} component="p">{post.content}</Typography>}
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
					Comment
				</StyledPostButton>
			</CardActions>
			<Divider />
		</PostPaperStyled>
	)
}

export default Post