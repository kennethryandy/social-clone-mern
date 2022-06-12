const { Router } = require('express');
const isAuth = require('../middleware/isAuth');
const Post = require('../model/post');
const Comment = require('../model/comment');

const router = Router();

// add comment
router.post('/add', isAuth, async (req, res, next) => {
	try {
		const post = await Post.findById(req.body.postId);
		if (!post) {
			return res.status(404).json({
				success: 0,
				message: "Post not found"
			})
		}
		const newComment = new Comment({
			content: req.body.content,
			creator: req.user.id,
			postId: req.body.postId,
		});
		post.comments.push(newComment._id);
		await post.save();
		await newComment.save();
		return res.status(201).json({
			success: 1,
			comment: {
				...newComment,
				creator: {
					...req.user,
					iat: null,
					exp: null
				}
			}
		});
	} catch (err) {
		next(err);
	}
});

// Get all comments by post id
router.get('/:postId', isAuth, async (req, res, next) => {
	try {
		const comments = await Comment.find({ postId: req.params.postId }).sort('-createdAt').populate('creator');
		return res.json({
			success: 1,
			comments
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;