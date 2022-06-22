const { Router } = require('express');
const isAuth = require('../middleware/isAuth');
const Post = require('../model/post');
const Comment = require('../model/comment');
const Notification = require('../model/notification');

const router = Router();

// add comment
router.post('/add', isAuth, async (req, res, next) => {
	try {
		// Find the post and add comment to the post
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
		// Add notification to the user
		if (req.user.id !== post.creator.toString()) {
			const notification = new Notification({
				recipient: post.creator._id,
				sender: req.user.id,
				type: "comment",
				post: post.id
			});
			await notification.save();
		}
		return res.status(201).json({
			success: 1,
			comment: {
				...newComment._doc,
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