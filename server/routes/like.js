const { Router } = require('express');
const isAuth = require('../middleware/isAuth');
const Like = require('../model/like');
const Post = require('../model/post');
const router = Router();

router.post('/:postId', isAuth, async (req, res, next) => {
	try {
		const isLiked = await Like.findOne({ creator: req.user.id, postId: req.params.postId });
		if (isLiked) {
			return res.status(403).json({ success: 0, message: 'You already liked this post' });
		}
		const newLike = new Like({
			creator: req.user.id,
			postId: req.params.postId,
		});
		await Post.findOneAndUpdate({ _id: req.params.postId }, { $addToSet: { likes: newLike } });
		await newLike.save();
		return res.status(200).json({
			success: 1,
			postId: req.params.postId
		});
	} catch (err) {
		next(err);
	}
});

router.put('/:postId', isAuth, async (req, res, next) => {
	try {
		const isLiked = await Like.findOne({ creator: req.user.id, postId: req.params.postId });
		if (!isLiked) {
			return res.status(403).json({ success: 0, message: 'You already unlike this post' });
		}
		await Post.findOneAndUpdate({ _id: req.params.postId }, { $pull: { likes: isLiked._id } });
		res.json({ success: 0, postId: req.params.postId });
	} catch (err) {
		next(err);
	}
});

module.exports = router;