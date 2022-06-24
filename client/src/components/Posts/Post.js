import { useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost, setLoadingDeletePostId, deletePost } from '../../features/post/postSlice';
import { PostPaperStyled, PostCreatorHeaderStyled, StyledPostButton, StyledCardMedia } from './PostStyled';
import noMan from '../../assets/image/no-man.jpg';
import Comment from '../Comment/Comments';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ClickAwayListener from '@mui/material/ClickAwayListener';
// MUI ICON
import CommentIcon from '@mui/icons-material/Comment';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import LikeTooltip from '../UI/LikeTooltip';


dayjs.extend(relativeTime);

const Post = ({ post, user, showComment, dialog, handleClosePostDialog, loadingDeletePostId }) => {
	const dispatch = useDispatch();
	const { credentials } = useSelector(store => store.user);
	const [openComment, setOpenComment] = useState(showComment);
	const [openSettings, setOpenSettings] = useState(false);
	const settingsAnchorRef = useRef(null);

	const handleSettingsToggle = () => {
		setOpenSettings(prevOpen => !prevOpen);
	}

	const handleCloseSettingsMenu = (event) => {
		if (settingsAnchorRef.current && settingsAnchorRef.current.contains(event.target)) {
			return;
		}
		setOpenSettings(false);
	};

	const handleDeletePost = () => {
		setOpenSettings(false);
		if (post.creator._id === credentials.id) {
			dispatch(setLoadingDeletePostId(post._id));
			dispatch(deletePost(post._id));
		}
	}


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
			<PostPaperStyled
				elevation={2}
				className={loadingDeletePostId === post._id ? "deleting" : ""}
				sx={{ "&.deleting": { opacity: 0.4, pointerEvents: "none", userSelect: "none" } }}
			>
				<PostCreatorHeaderStyled
					avatar={
						<Avatar aria-label="profile-picture" component={Link} to={`/profile/${post.creator._id}`} src={post.creator.img || noMan} alt={post.creator.fullname}>{post.creator.fullname[0]}</Avatar>
					}
					action={
						<IconButton
							aria-label={dialog ? "close-dialog" : "settings"}
							id={dialog ? "close-dialog-button" : "post-settings-button"}
							aria-controls={openSettings ? "post-settings-menu" : undefined}
							aria-expanded={openSettings ? true : undefined}
							aria-haspopup={dialog ? "false" : "true"}
							onClick={dialog ? handleClosePostDialog : handleSettingsToggle}
							ref={dialog ? null : settingsAnchorRef}
						>
							{dialog ? <CloseIcon /> : <MoreVertIcon />}
						</IconButton>
					}
					title={<Link to={`/profile/${post.creator._id}`}>{post.creator.fullname}</Link>}
					subheader={dayjs(post.createdAt).fromNow()}
				/>
				<Popper
					open={openSettings}
					anchorEl={settingsAnchorRef.current}
					disablePortal
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
				>
					<Paper>
						<ClickAwayListener onClickAway={handleCloseSettingsMenu}>
							<MenuList
								id="post-settings-menu"
								aria-labelledby="post-settings-button"
							>
								<MenuItem onClick={handleDeletePost} disabled={post.creator._id !== credentials.id}>
									<ListItemIcon>
										<DeleteForeverIcon />
									</ListItemIcon>
									<ListItemText>Delete Post</ListItemText>
								</MenuItem>
							</MenuList>
						</ClickAwayListener>
					</Paper>
				</Popper>
				<CardContent>
					{<Typography sx={{ wordBreak: 'break-all', whiteSpace: 'normal' }} variant={post.content.length < 32 ? "h5" : "body1"} component="p">{post.content}</Typography>}
				</CardContent>
				{post.imgUrl && (
					<StyledCardMedia
						component="img"
						image={post.imgUrl}
						alt={post.content}
					/>
				)}
				<Divider />
				<CardActions>
					<LikeTooltip likes={post.likes} userId={credentials.id}>
						<StyledPostButton
							size="small"
							startIcon={<Badge badgeContent={post.likes.length > 0 ? post.likes.length : null}><ThumbUpIcon color="inherit" /></Badge>}
							onClick={likeUnlikePost}
							className={post.likes.findIndex(like => like.creator._id === user.id) !== -1 ? "active" : ""}
						>
							Like
						</StyledPostButton>
					</LikeTooltip>
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

Post.propTypes = {
	post: PropTypes.object,
	user: PropTypes.object,
	showComment: PropTypes.bool,
	dialog: PropTypes.bool,
	handleClosePostDialog: PropTypes.func
}

Post.defaultProps = {
	showComment: false,
	dialog: false
}

export default memo(Post);