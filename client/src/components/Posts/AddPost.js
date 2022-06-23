import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../features/post/postSlice';
import { StyledInput, AddPostButton, AddPostInputWrapper } from './PostStyled';
import EmojiPicker from '../UI/EmojiPicker';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Popper from '@mui/material/Popper';

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const AddPost = ({ user, loading }) => {
	const dispatch = useDispatch();
	const [postInput, setPostInput] = useState("");
	const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);
	const [showEmojiBtn, setShowEmojiBtn] = useState(false);

	const handleOpenEmoji = (e) => {
		setEmojiAnchorEl(emojiAnchorEl ? null : e.currentTarget);
	}

	const handleCloseEmoji = () => {
		setEmojiAnchorEl(null);
	}

	const handleEmojiPick = (e) => {
		setPostInput(currentInput => currentInput + e.native);
	}

	const handlePostInputChange = (e) => {
		setPostInput(e.target.value);
	}

	const handlePostSubmit = () => {
		if (!postInput) {
			return;
		}
		dispatch(createPost({ content: postInput }));
		setPostInput("");
	}

	const isOpenEmoji = Boolean(emojiAnchorEl);
	const emojiId = isOpenEmoji ? "emoji-picker-popper" : undefined;

	return (
		<Card sx={{ marginBottom: 3, width: '100%' }}>
			<CardHeader title={<Typography variant="h5" textAlign="center" sx={{ fontWeight: 500 }}>Creat a post</Typography>} />
			<Divider variant="middle" />
			<ClickAwayListener onClickAway={handleCloseEmoji}>
				<AddPostInputWrapper>
					<StyledInput onFocus={() => setShowEmojiBtn(true)} onChange={handlePostInputChange} value={postInput} placeholder={`What's on your mind, ${user.fullname.split(' ')[0]}?`} rows="2" />
					<IconButton aria-describedby={emojiId} size="large" className={showEmojiBtn ? "emoji show" : "emoji"} type='button' onClick={handleOpenEmoji}>
						{!isOpenEmoji ? <InsertEmoticonIcon /> : <EmojiEmotionsIcon />}
					</IconButton>
					<Popper id={emojiId} open={isOpenEmoji} anchorEl={emojiAnchorEl} placement="bottom-end">
						<EmojiPicker onEmojiSelect={handleEmojiPick} showPreview={false} />
					</Popper>
				</AddPostInputWrapper>
			</ClickAwayListener>
			<CardActions sx={{ padding: 2 }}>
				<AddPostButton disabled={loading} onClick={handlePostSubmit} size="medium" fullWidth variant="contained">Post</AddPostButton>
			</CardActions>
		</Card >
	)
}

export default AddPost