import { useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../features/post/postSlice';
import { StyledCommentInput, CommentInputWrapper } from './CommentStyled';
import noMan from '../../assets/image/no-man.jpg';
import EmojiPicker from '../UI/EmojiPicker';
import Comment from './Comment'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Popper from '@mui/material/Popper';
import IconButton from '@mui/material/IconButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';


const Comments = ({ post, openComment, setOpenComment }) => {
	const dispatch = useDispatch();
	const { credentials } = useSelector(store => store.user);
	const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);
	const [commentInput, setCommentInput] = useState("");

	const handleOpenEmoji = (e) => {
		setEmojiAnchorEl(emojiAnchorEl ? null : e.currentTarget);
	}

	const handleCloseEmoji = () => {
		setEmojiAnchorEl(null);
	}

	const handleEmojiPick = (e) => {
		setCommentInput(currentInput => currentInput + e.native);
	}

	const commentHandleSubmit = (e) => {
		e.preventDefault();
		if (commentInput) {
			dispatch(addComment({ postId: post._id, content: commentInput }));
			setCommentInput("");
			setOpenComment(true);
		}
	}

	const isOpenEmoji = Boolean(emojiAnchorEl);
	const emojiId = isOpenEmoji ? "emoji-picker-popper" : undefined;

	return (
		<>
			<Box sx={{ display: "flex", alignItems: "center", gap: 1, paddingTop: 3, paddingBottom: 3 }}>
				<Avatar alt={credentials.fullname} aria-label="profile-picture" src={credentials.img || noMan}>{credentials.fullname[0]}</Avatar>
				<ClickAwayListener onClickAway={handleCloseEmoji}>
					<CommentInputWrapper onSubmit={commentHandleSubmit}>
						<StyledCommentInput placeholder="Write a comment..." value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
						<IconButton type='submit'>
							<SendIcon />
						</IconButton>
						<IconButton aria-describedby={emojiId} type='button' className="emoji" onClick={handleOpenEmoji}>
							{!isOpenEmoji ? <InsertEmoticonIcon /> : <EmojiEmotionsIcon />}
						</IconButton>
						<Popper id={emojiId} open={isOpenEmoji} anchorEl={emojiAnchorEl} placement="bottom-end">
							<EmojiPicker onEmojiSelect={handleEmojiPick} showPreview={false} />
						</Popper>
					</CommentInputWrapper>
				</ClickAwayListener>
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

export default memo(Comments);