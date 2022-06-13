const { Router } = require('express');
const isAuth = require('../middleware/isAuth');
const Like = require('../model/like');
const Post = require('../model/post');
const router = Router();

router.post('/:postId', isAuth, async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.postId);
		if (!post) {
			return res.status(404).json({
				success: 0,
				message: "Post not found"
			})
		}

		const newLike = new Like({
			creator: req.user.id,
			postId: req.params.postId,
		});
		post.likes.push(newLike._id);
		await post.save();
		await newLike.save();
		return res.status(200).json({
			success: 1,
			postId: req.params.postId
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;