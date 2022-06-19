import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../features/post/postSlice';
import { PostPaperStyled, PostCreatorHeaderStyled, StyledPostButton } from './PostStyled';
import noMan from '../../assets/image/no-man.jpg';
import Comment from '../Comment/Comments';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
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

const Post = ({ post, user, showComment = false }) => {
	const dispatch = useDispatch();
	const [openComment, setOpenComment] = useState(showComment);

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
		Object.keys(post).length !== 0 ? (
			<PostPaperStyled elevation={3}>
				<PostCreatorHeaderStyled
					avatar={
						<Avatar aria-label="profile-picture" component={Link} to={`/profile/${post.creator._id}`} src={post.creator.img || noMan}>{post.creator.fullname[0]}</Avatar>
					}
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title={<Link to={`/profile/${post.creator._id}`}>{post.creator.fullname}</Link>}
					subheader={dayjs(post.createdAt).fromNow()}
				/>
				<CardContent>
					{post.img ? null : <Typography variant={post.content.length < 32 ? "h5" : "body1"} component="p">{post.content}</Typography>}
				</CardContent>
				<CardContent sx={{ paddingY: 1, display: 'flex', gap: 1 }}>
				</CardContent>
				<Divider />
				<CardActions>
					<StyledPostButton
						size="small"
						startIcon={<Badge badgeContent={post.likes.length > 0 ? post.likes.length : null}><ThumbUpIcon color="inherit" /></Badge>}
						onClick={likeUnlikePost}
						className={post.likes.findIndex(like => like.creator._id === user.id) !== -1 ? "active" : ""}
					>
						Like
					</StyledPostButton>
					<StyledPostButton
						size="small"
						startIcon={<Badge badgeContent={post.comments.length > 0 ? post.comments.length : null}><CommentIcon color="inherit" /></Badge>}
						onClick={commentClickHandler}
						className={openComment ? "active" : ""}
					>
						View Comments
					</StyledPostButton>
				</CardActions>
				<Divider />
				<Comment post={post} openComment={openComment} setOpenComment={setOpenComment} />
			</PostPaperStyled>
		) : <p>nothing...</p>
	)
}

export default Post