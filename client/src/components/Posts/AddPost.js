import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CardMedia from '@mui/material/CardMedia';
import { PostSkeleton } from '../Skeletons';

const AddPost = ({ user, loading }) => {
	const dispatch = useDispatch();
	const { addPostLoading } = useSelector(store => store.post);
	const [postInput, setPostInput] = useState("");
	const [postImg, setPostImg] = useState({
		previewImage: null,
		file: null
	})
	const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);
	const [showEmojiBtn, setShowEmojiBtn] = useState(false);
	const inputFileRef = useRef(null);

	const handleOpenEmoji = (e) => {
		setEmojiAnchorEl(emojiAnchorEl ? null : e.currentTarget);
	}

	const handleCloseEmoji = () => {
		setEmojiAnchorEl(null);
	}

	const handleEmojiPick = (e) => {
		setPostInput(currentInput => currentInput + e.native);
	}

	const handlePhotoClick = () => {
		inputFileRef.current.click();
	}

	const handlePostImageChange = (e) => {
		if (e.target.files.length > 0) {
			const img = e.target.files[0];
			setPostImg({
				previewImage: URL.createObjectURL(img),
				file: e.target.files[0],
			});
		}
	}

	const handlePostInputChange = (e) => {
		setPostInput(e.target.value);
	}

	const handlePostSubmit = () => {
		if (!postInput && !postImg.file) {
			return;
		}
		if (postImg.file) {
			const formData = new FormData();
			formData.append('file', postImg.file, postImg.file.name);
			formData.append('content', postInput);
			dispatch(createPost(formData))
		} else {
			dispatch(createPost({ content: postInput }));
		}
		setPostInput("");
		setPostImg({ file: null, previewImage: null });
	}

	const isOpenEmoji = Boolean(emojiAnchorEl);
	const emojiId = isOpenEmoji ? "emoji-picker-popper" : undefined;

	return (
		<>
			<input type="file" name="file" ref={inputFileRef} accept="image/png, image/jpeg" hidden onChange={handlePostImageChange} />
			<Card sx={{ marginBottom: 3, width: '100%' }}>
				<CardHeader title={<Typography variant="h5" textAlign="center" sx={{ fontWeight: 500 }}>Creat a post</Typography>} />
				<Divider variant="middle" />
				<ClickAwayListener onClickAway={handleCloseEmoji}>
					<AddPostInputWrapper>
						<StyledInput onFocus={() => setShowEmojiBtn(true)} onChange={handlePostInputChange} value={postInput} placeholder={`What's on your mind, ${user.fullname.split(' ')[0]}?`} rows="2" />
						<IconButton aria-describedby={emojiId} size="large" className={showEmojiBtn ? "emoji show" : "emoji"} type='button' onClick={handleOpenEmoji}>
							{!isOpenEmoji ? <InsertEmoticonIcon /> : <EmojiEmotionsIcon />}
						</IconButton>
						<IconButton size="large" className={showEmojiBtn ? "show photo" : "photo"} type='button' onClick={handlePhotoClick} >
							<InsertPhotoOutlinedIcon />
						</IconButton>
						<Popper id={emojiId} open={isOpenEmoji} anchorEl={emojiAnchorEl} placement="bottom-end">
							<EmojiPicker onEmojiSelect={handleEmojiPick} showPreview={false} />
						</Popper>
					</AddPostInputWrapper>
				</ClickAwayListener>
				{postImg.previewImage && (
					<CardMedia
						component="img"
						image={postImg.previewImage}
						alt={postImg.file.name}
						sx={{
							maxWidth: 320,
							maxHeight: 400,
							height: "100%",
							margin: 'auto'
						}}
					/>
				)}
				<CardActions sx={{ padding: 2 }}>
					<AddPostButton disabled={loading} onClick={handlePostSubmit} size="medium" fullWidth variant="contained">Post</AddPostButton>
				</CardActions>
			</Card >
			{addPostLoading && (
				<PostSkeleton withImage={Boolean(postImg.file)} />
			)}
		</>
	)
}

export default AddPost