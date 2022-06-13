const { Router } = require('express');
const isAuth = require('../middleware/isAuth');
const Like = require('../model/like');
const Post = require('../model/post');
const Notification = require('../model/notification');
const router = Router();

// like post
router.post('/:postId', isAuth, async (req, res, next) => {
	try {
		// Find like and insert and update post
		const isLiked = await Like.findOne({ creator: req.user.id, postId: req.params.postId });
		if (isLiked) {
			return res.status(403).json({ success: 0, message: 'You already liked this post' });
		}
		const newLike = new Like({
			creator: req.user.id,
			postId: req.params.postId,
		});
		const updatedPost = await Post.findOneAndUpdate({ _id: req.params.postId }, { $addToSet: { likes: newLike } });
		await newLike.save();
		await updatedPost.save();
		console.log(updatedPost);
		// Add notification to the user
		if (req.user.id !== updatedPost.creator.toString()) {
			const notification = new Notification({
				recipient: updatedPost.creator._id,
				sender: req.user.id,
				type: "like",
				post: updatedPost._id
			});
			await notification.save();
		}
		return res.status(200).json({
			success: 1,
			postId: req.params.postId,
			like: newLike
		});
	} catch (err) {
		next(err);
	}
});

// unlike post
router.delete('/:postId', isAuth, async (req, res, next) => {
	try {
		// Check if like exist and delete like and update post
		const isLiked = await Like.findOne({ creator: req.user.id, postId: req.params.postId });
		if (!isLiked) {
			return res.status(403).json({ success: 0, message: 'You already unlike this post' });
		}
		const updatedPost = await Post.findOneAndUpdate({ _id: req.params.postId }, { $pull: { likes: isLiked._id } });
		const likeId = isLiked._id;
		await Like.findByIdAndDelete(likeId);
		// Delete Notification
		if (req.user.id !== updatedPost.creator.toString()) {
			await Notification.findOneAndDelete({ post: req.params.postId, type: "like", sender: req.user.id, recipient: updatedPost.creator._id });
		}
		res.json({ success: 1, postId: req.params.postId, likeId: likeId });
	} catch (err) {
		next(err);
	}
});

module.exports = router;